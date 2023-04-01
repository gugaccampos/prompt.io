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
import { ContainerInputs, Input, InputDiv, Space } from './styles'

interface InputStepT {
  isRowActive: boolean
  // onComplete: (code: Array<string>) => void
  rowIndex: number
  // blur: boolean
}

const InputStep: FC<InputStepT> = ({ isRowActive, rowIndex }) => {
  const { currentLetter, wasKeyPressed, userInfo, onComplete, setNewLetter } =
    useTries()

  const [code, setCode] = useState(
    [...Array(userInfo?.promptLength)].map(() => '')
  )
  const inputs = useRef<HTMLInputElement[]>([])
  const [inputFocused, setInputFocused] = useState(0)
  console.log(inputFocused)

  useEffect(() => {
    if (
      inputs.current.length &&
      userInfo !== undefined &&
      userInfo.tries[userInfo.currRow] !== undefined &&
      userInfo.tries[userInfo.currRow].every((key) => key === '')
    ) {
      console.log('entrou')

      inputs.current[0].focus()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onComplete])

  useEffect(() => {
    if (isRowActive && currentLetter !== '') {
      if (currentLetter === 'del' && inputFocused > 0) {
        console.log('entrou no 1')
        const newCode = [...code]

        if (newCode[inputFocused] !== '') {
          newCode[inputFocused] = ''
          if (userInfo !== undefined) {
            userInfo.tries[rowIndex][inputFocused] = ''
          }
          setCode(newCode)
          inputs.current[inputFocused].focus()
        } else {
          newCode[inputFocused - 1] = ''
          if (userInfo !== undefined) {
            userInfo.tries[rowIndex][inputFocused - 1] = ''
          }
          setCode(newCode)
          inputs.current[inputFocused - 1].focus()
        }
      } else if (
        currentLetter === 'ok' &&
        code.every((key) => key !== '') &&
        code.length === userInfo?.solutionArray.length
      ) {
        console.log('entrou no 2')
        console.log(code)

        onComplete(code)
      } else if (currentLetter !== 'del' && currentLetter !== 'ok') {
        console.log('entrou no 3')

        processInput(currentLetter, inputFocused)
      } else if (currentLetter === 'ok' && userInfo !== undefined) {
        inputs.current[inputFocused].focus()
      }
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

    if (userInfo !== undefined && rowIndex === userInfo.currRow) {
      const newCode = [...code]
      setNewLetter(slot, key)

      newCode[slot] = key
      setCode(newCode)

      if (slot !== userInfo?.promptLength - 1) {
        inputs.current[slot + 1].focus()
      }
    }
  }

  const renderInputColor = (idx: number) => {
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
      if (newCode[inputFocused] !== '') {
        newCode[inputFocused] = ''
        if (userInfo !== undefined) {
          userInfo.tries[rowIndex][inputFocused] = ''
        }
        setCode(newCode)
        inputs.current[inputFocused].focus()
      } else {
        newCode[slot - 1] = ''
        if (userInfo !== undefined) userInfo.tries[rowIndex][slot - 1] = ''
        setCode(newCode)
        inputs.current[slot - 1].focus()
      }
    }

    if (e.code === 'Enter' && code.every((key) => key !== '')) {
      onComplete(code)
    }

    if (
      e.code === 'ArrowRight' &&
      userInfo !== undefined &&
      inputFocused < userInfo?.promptLength - 1
    ) {
      inputs.current[inputFocused + 1].focus()
    }

    if (e.code === 'ArrowLeft' && userInfo !== undefined && inputFocused > 0) {
      inputs.current[inputFocused - 1].focus()
    }
  }

  return (
    <ContainerInputs>
      {userInfo &&
        userInfo.tries[rowIndex].map((num, idx) => {
          if (userInfo.arrayPromptLength.find((curr) => curr === idx))
            return (
              <InputDiv key={`input-${idx}`}>
                <Space key={`space-${idx}`}>-</Space>
                <Input
                  key={`col-${idx}-row-${rowIndex}`}
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
              </InputDiv>
            )
          return (
            <Input
              key={`col-${idx}-row-${rowIndex}`}
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
