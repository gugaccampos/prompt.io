import { charStatus } from 'components/Tries/types'
import { useTries } from 'contexts/TriesContext'
import {
  ChangeEvent,
  FC,
  KeyboardEvent,
  useEffect,
  useRef,
  useState
} from 'react'
import { ContainerInputs, Input, Space } from './styles'

interface InputStepT {
  isRowActive: boolean
  // onComplete: (code: Array<string>) => void
  rowIndex: number
  // blur: boolean
}

const InputStep: FC<InputStepT> = ({ isRowActive, rowIndex }) => {
  const { currentLetter, wasKeyPressed, userInfo, onComplete } = useTries()

  const [code, setCode] = useState(
    [...Array(userInfo?.promptLength)].map(() => '')
  )
  const inputs = useRef<HTMLInputElement[]>([])
  const [inputFocused, setInputFocused] = useState(0)

  useEffect(() => {
    if (inputs.current.length) inputs.current[0].focus()
  }, [onComplete])

  useEffect(() => {
    if (isRowActive && currentLetter !== '') {
      // console.log(inputFocused)

      processInput(currentLetter, inputFocused)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wasKeyPressed])

  const processInput = (
    e: ChangeEvent<HTMLInputElement> | string,
    slot: number
  ) => {
    let key = ''
    if (typeof e === 'string') {
      key = e
    } else {
      key = e.target.value
    }

    // console.log(code)

    if (userInfo !== undefined && rowIndex === userInfo.currRow) {
      const newCode = [...code]
      userInfo.tries[userInfo.currRow][slot] = key
      // console.log('aaaa', userInfo.tries[userInfo?.currRow + 2][slot])

      newCode[slot] = key
      setCode(newCode)
      // console.log(newCode)

      // console.log(rowIndex, code)

      if (slot !== userInfo?.promptLength - 1) {
        // console.log('entrou no processInput')

        inputs.current[slot + 1].focus()
      }
    }
  }

  const renderInputColor = (idx: number) => {
    // console.log('entrou')

    if (userInfo !== undefined) {
      if (userInfo.currRow > 0) {
        if (userInfo.currRow > 0 && userInfo.triesFeedback[rowIndex] !== null) {
          if (userInfo.triesFeedback[rowIndex][idx] === charStatus.CORRECT) {
            return '#3AA394'
          }

          if (
            userInfo.triesFeedback[rowIndex][idx] === charStatus.WRONG_POSITION
          )
            return '#EEC272'

          if (userInfo.triesFeedback[rowIndex][idx] === charStatus.NOT_IN_WORD)
            return undefined
        }
      }
    }

    return undefined
  }

  const onKeyUp = (e: KeyboardEvent<HTMLInputElement>, slot: number) => {
    if (e.code === 'Backspace' && !code[slot] && slot !== 0) {
      const newCode = [...code]
      newCode[slot - 1] = ''
      if (userInfo !== undefined) userInfo.tries[rowIndex][slot - 1] = ''
      setCode(newCode)
      inputs.current[slot - 1].focus()
    }

    if (e.code === 'Enter' && code.every((key) => key !== '')) {
      onComplete(code)
    }
  }

  return (
    <ContainerInputs>
      {userInfo &&
        userInfo.tries[rowIndex].map((num, idx) => {
          if (userInfo.arrayPromptLength.find((curr) => curr === idx))
            return (
              <>
                <Space>-</Space>
                <Input
                  key={idx}
                  disabled={!isRowActive}
                  blur={
                    userInfo.won === null
                      ? rowIndex > userInfo?.currRow
                      : rowIndex >= userInfo?.currRow
                  }
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={num}
                  autoFocus={!code[0].length && idx === 0}
                  onChange={(e) => processInput(e, idx)}
                  onKeyUp={(e) => onKeyUp(e, idx)}
                  color={renderInputColor(idx)}
                  onFocus={() => setInputFocused(idx)}
                  // eslint-disable-next-line
                  ref={(ref) => inputs.current.push(ref!)}
                />
              </>
            )
          return (
            <Input
              key={idx}
              disabled={!isRowActive}
              blur={
                userInfo.won === null
                  ? rowIndex > userInfo?.currRow
                  : rowIndex >= userInfo?.currRow
              }
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={num}
              autoFocus={!code[0].length && idx === 0}
              onChange={(e) => processInput(e, idx)}
              onKeyUp={(e) => onKeyUp(e, idx)}
              color={renderInputColor(idx)}
              onFocus={() => setInputFocused(idx)}
              // eslint-disable-next-line
              ref={(ref) => inputs.current.push(ref!)}
            />
          )
        })}
    </ContainerInputs>
  )
}

export default InputStep
