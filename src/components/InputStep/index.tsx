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
import { useTheme } from 'styled-components'

interface InputStepT {
  isRowActive: boolean
  // onComplete: (code: Array<string>) => void
  rowIndex: number
  // blur: boolean
}

const InputStep: FC<InputStepT> = ({ isRowActive, rowIndex }) => {
  const theme = useTheme()
  const {
    currentLetter,
    wasKeyPressed,
    userInfo,
    isContrast,
    onComplete,
    setNewLetter
  } = useTries()
  const [OSName, setOSName] = useState('')

  const [code, setCode] = useState(
    [...Array(userInfo?.promptLength)].map(() => '')
  )
  const inputs = useRef<HTMLInputElement[]>([])
  const [inputFocused, setInputFocused] = useState(0)

  useEffect(() => {
    if (OSName == '') {
      if (
        navigator.platform.indexOf('iPhone') != -1 ||
        navigator.platform.indexOf('iPad') != -1 ||
        navigator.platform.indexOf('iPod') != -1
      ) {
        setOSName('iOS')
      }
    }
  }, [OSName])

  useEffect(() => {
    if (
      inputs.current.length &&
      userInfo !== undefined &&
      userInfo.tries[userInfo.currRow] !== undefined &&
      userInfo.tries[userInfo.currRow].every((key) => key === '')
    ) {
      inputs.current[inputFocused].focus()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onComplete])

  // useEffect que trata as entradas do teclado virtual
  useEffect(() => {
    if (isRowActive && currentLetter !== '') {
      if (currentLetter === 'del' && inputFocused >= 0) {
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
          if (inputFocused > 0) {
            inputs.current[inputFocused - 1].focus()
          }
        }
      } else if (
        currentLetter === 'ok' &&
        code.every((key) => key !== '') &&
        code.length === userInfo?.solutionArray.length
      ) {
        onComplete(code)
      } else if (currentLetter !== 'del' && currentLetter !== 'ok') {
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

      let counter = slot
      while (
        counter !== userInfo?.promptLength - 1 &&
        userInfo.tries[userInfo.currRow][counter + 1] !== ''
      ) {
        counter += 1
      }

      if (counter !== userInfo?.promptLength - 1) {
        inputs.current[counter + 1].focus()
      }
    }
  }

  const renderInputColor = (idx: number) => {
    if (userInfo !== undefined) {
      if (userInfo.currRow > 0) {
        if (userInfo.currRow > 0 && userInfo.triesFeedback[rowIndex] !== null) {
          if (userInfo.triesFeedback[rowIndex][idx] === charStatus.CORRECT) {
            return isContrast ? theme.colors.blue : theme.colors.green
          }

          if (
            userInfo.triesFeedback[rowIndex][idx] === charStatus.WRONG_POSITION
          )
            return isContrast ? theme.colors.orange : theme.colors.yellow

          if (userInfo.triesFeedback[rowIndex][idx] === charStatus.NOT_IN_WORD)
            return 'opacity'
        }
      }
    }

    return undefined
  }

  const onKeyUp = (e: KeyboardEvent<HTMLInputElement>, slot: number) => {
    if (e.code === 'Backspace' && slot >= 0) {
      const newCode = [...code]
      // se o input atual tiver conteudo
      if (
        userInfo !== undefined &&
        userInfo.tries[rowIndex][inputFocused] !== ''
      ) {
        newCode[inputFocused] = ''
        if (userInfo !== undefined) {
          userInfo.tries[rowIndex][inputFocused] = ''
        }
        setCode(newCode)

        if (slot > 0) {
          inputs.current[inputFocused].focus()
        }
      } else {
        newCode[slot - 1] = ''
        if (userInfo !== undefined) userInfo.tries[rowIndex][slot - 1] = ''
        setCode(newCode)
        if (slot > 0) {
          inputs.current[slot - 1].focus()
        }
      }
    } else if (
      (e.code === 'Enter' || e.code === 'NumpadEnter') &&
      code.every((key) => key !== '')
    ) {
      onComplete(code)
    } else if (
      e.code === 'ArrowRight' &&
      userInfo !== undefined &&
      inputFocused < userInfo?.promptLength - 1
    ) {
      inputs.current[inputFocused + 1].focus()
    } else if (
      e.code === 'ArrowLeft' &&
      userInfo !== undefined &&
      inputFocused > 0
    ) {
      inputs.current[inputFocused - 1].focus()
    } else if (e.keyCode >= 65 && e.keyCode <= 90) {
      processInput(String(e.key), inputFocused)
    }
  }

  // const handleBlur = (slot: number) => {
  //   setTimeout(() => {
  //     const hasFocus = inputs.current.some(
  //       (el) => el === document.activeElement
  //     )
  //     if (inputFocused !== slot || (inputFocused === slot && !hasFocus)) {
  //       inputs.current[slot].focus()
  //     }
  //   }, 0)
  // }

  const handleFocus = (slot: number) => {
    setInputFocused(slot)
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
                  maxLength={1}
                  value={num}
                  readOnly
                  autoFocus={!code[0].length && idx === 0}
                  // onChange={(e) => processInput(e, idx)}
                  onKeyUp={(e) => onKeyUp(e, idx)}
                  color={renderInputColor(idx)}
                  onFocus={() => handleFocus(idx)}
                  // onBlur={() => handleBlur(idx)}
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
              maxLength={1}
              value={num}
              readOnly
              autoFocus={!code[0].length && idx === 0}
              // onChange={(e) => processInput(e, idx)}
              onKeyUp={(e) => onKeyUp(e, idx)}
              color={renderInputColor(idx)}
              onFocus={() => handleFocus(idx)}
              // onBlur={() => handleBlur(idx)}
              // eslint-disable-next-line
              ref={(ref) => inputs.current.push(ref!)}
            />
          )
        })}
    </ContainerInputs>
  )
}

export default InputStep
