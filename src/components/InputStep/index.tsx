import { ChangeEvent, FC, KeyboardEvent, useRef, useState } from 'react'
import { ContainerInputs, Input, Space } from './styles'

interface InputStepT {
  length: Array<number>
  onComplete: (code: Array<string>) => void
}

const InputStep: FC<InputStepT> = ({ length, onComplete }) => {
  const allLength = length.reduce((acc, number) => acc + number, 0)
  const formatedAllInputsLength = length.map((curr, idx) => {
    if (idx === 0) return curr

    return curr + length[idx]
  })

  const [code, setCode] = useState([...Array(allLength)].map(() => ''))
  const inputs = useRef<HTMLInputElement[]>([])

  const processInput = (e: ChangeEvent<HTMLInputElement>, slot: number) => {
    const key = e.target.value

    const newCode = [...code]
    newCode[slot] = key
    setCode(newCode)

    if (slot !== allLength - 1) {
      inputs.current[slot + 1].focus()
    }

    if (newCode.every((key) => key !== '')) {
      onComplete(newCode)
    }
  }

  const onKeyUp = (e: KeyboardEvent<HTMLInputElement>, slot: number) => {
    if (e.code === 'Backspace' && !code[slot] && slot !== 0) {
      const newCode = [...code]
      newCode[slot - 1] = ''
      setCode(newCode)
      inputs.current[slot - 1].focus()
    }
  }

  return (
    <ContainerInputs>
      {code.map((num, idx) => {
        if (formatedAllInputsLength.find((curr) => curr === idx))
          return (
            <>
              <Space>-</Space>
              <Input
                key={idx}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={num}
                autoFocus={!code[0].length && idx === 0}
                onChange={(e) => processInput(e, idx)}
                onKeyUp={(e) => onKeyUp(e, idx)}
                // eslint-disable-next-line
                ref={(ref) => inputs.current.push(ref!)}
              />
            </>
          )
        return (
          <Input
            key={idx}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={num}
            autoFocus={!code[0].length && idx === 0}
            onChange={(e) => processInput(e, idx)}
            onKeyUp={(e) => onKeyUp(e, idx)}
            // eslint-disable-next-line
            ref={(ref) => inputs.current.push(ref!)}
          />
        )
      })}
    </ContainerInputs>
  )
}

export default InputStep
