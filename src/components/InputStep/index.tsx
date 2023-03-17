import { charStatus, userTriesTypes } from 'components/Tries/types'
import { ChangeEvent, FC, KeyboardEvent, useRef, useState } from 'react'
import { ContainerInputs, Input, Space } from './styles'

interface InputStepT {
  isRowActive: boolean
  length: Array<number>
  onComplete: (code: Array<string>) => void
  userInfo: userTriesTypes
  rowIndex: number
  blur: boolean
}

const InputStep: FC<InputStepT> = ({
  length,
  isRowActive,
  userInfo,
  blur,
  rowIndex,
  onComplete
}) => {
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
    userInfo.tries[rowIndex][slot] = key
    newCode[slot] = key
    console.log(newCode)

    setCode(newCode)

    if (slot !== allLength - 1) {
      inputs.current[slot + 1].focus()
    }
  }

  const renderInputColor = (idx: number) => {
    if (userInfo.currRow > 0) {
      if (userInfo.currRow > 0 && userInfo.triesFeedback[rowIndex] !== null) {
        if (userInfo.triesFeedback[rowIndex][idx] === charStatus.CORRECT) {
          return '#3AA394'
        }

        if (userInfo.triesFeedback[rowIndex][idx] === charStatus.WRONG_POSITION)
          return '#EEC272'

        if (userInfo.triesFeedback[rowIndex][idx] === charStatus.NOT_IN_WORD)
          return undefined
      }
    }

    return undefined
  }

  const onKeyUp = (e: KeyboardEvent<HTMLInputElement>, slot: number) => {
    if (e.code === 'Backspace' && !code[slot] && slot !== 0) {
      const newCode = [...code]
      newCode[slot - 1] = ''
      userInfo.tries[rowIndex][slot - 1] = ''
      setCode(newCode)
      inputs.current[slot - 1].focus()
    }

    if (e.code === 'Enter' && code.every((key) => key !== '')) {
      onComplete(code)
    }
  }

  return (
    <ContainerInputs>
      {userInfo.tries[rowIndex].map((num, idx) => {
        if (formatedAllInputsLength.find((curr) => curr === idx))
          return (
            <>
              <Space>-</Space>
              <Input
                key={idx}
                disabled={!isRowActive}
                blur={blur}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={num}
                autoFocus={!code[0].length && idx === 0}
                onChange={(e) => processInput(e, idx)}
                onKeyUp={(e) => onKeyUp(e, idx)}
                color={renderInputColor(idx)}
                // eslint-disable-next-line
                ref={(ref) => inputs.current.push(ref!)}
              />
            </>
          )
        return (
          <Input
            key={idx}
            disabled={!isRowActive}
            blur={blur}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={num}
            autoFocus={!code[0].length && idx === 0}
            onChange={(e) => processInput(e, idx)}
            onKeyUp={(e) => onKeyUp(e, idx)}
            color={renderInputColor(idx)}
            // eslint-disable-next-line
            ref={(ref) => inputs.current.push(ref!)}
          />
        )
      })}
    </ContainerInputs>
  )
}

export default InputStep
