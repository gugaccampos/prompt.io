import { charStatus, userTriesTypes } from 'components/Tries/types'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'
import { api } from 'services/api'

type Pair = [string, number]
interface TriesContextProviderProps {
  children: ReactNode
}

interface TriesContextType {
  userInfo: userTriesTypes | undefined
  currentLetter: string
  wasKeyPressed: boolean
  isContrast: boolean
  promptError: boolean
  onSetIsContrast: () => void
  onComplete: (currTry: string[]) => void
  onKeyPressed: (letter: string) => void
  setNewLetter: (column: number, letter: string) => void
  arePromptsLoading: boolean
  currentPrompt?: { image: string; prompt: string }
}

export const TriesContext = createContext({} as TriesContextType)

export function TriesContextProvider({ children }: TriesContextProviderProps) {
  const [userInfo, setUserInfo] = useState<userTriesTypes>()
  const [arePromptsLoading, setArePromptsLoading] = useState(true)
  const [promptError, setPromptError] = useState(false)
  const [currentPrompt, setCurrentPrompt] =
    useState<{ image: string; prompt: string }>()
  const [isContrast, setIsContrast] = useState(true)

  // Pega do localStorage se já tiver informação lá
  useEffect(() => {
    if (localStorage.getItem('prompt') !== null) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setUserInfo(JSON.parse(localStorage.getItem('prompt')!))
    }
  }, [])

  useEffect(() => {
    if (userInfo !== undefined)
      localStorage.setItem('prompt', JSON.stringify(userInfo))
  }, [userInfo])

  // Panguins dincando
  // Pinguins Felizes

  const [currentLetter, setCurrentLetter] = useState('')
  const [wasKeyPressed, setWasKeyPressed] = useState(false)

  const onSetIsContrast = () => {
    setIsContrast((state) => {
      return !state
    })
  }

  const subtractOccurrence = (
    letter: string,
    letterAndCount: Pair[],
    status: charStatus,
    index: number
  ) => {
    for (let i = 0; i < letterAndCount.length; i++) {
      if (letterAndCount[i][0] == letter) {
        if (letterAndCount[i][1] > 0) {
          if (userInfo !== undefined) {
            userInfo.triesFeedback[userInfo.currRow][index] = status
          }
          letterAndCount[i][1] -= 1
          return letterAndCount
        }
      }
    }

    return letterAndCount
  }

  const countOccurrences = (letter: string) => {
    if (userInfo !== undefined) {
      const occurrences = userInfo.solutionArray.reduce(
        (accumulator, currentValue) => {
          if (currentValue == letter) {
            return accumulator + 1
          }
          return accumulator
        },
        0
      )

      return occurrences
    }

    return 0
  }

  const charEvaluation = (currTry: string[]) => {
    let letterAndCount: Pair[] = []
    letterAndCount[0] = [currTry[0], countOccurrences(currTry[0])]

    // começa colocando todas como not in word
    if (userInfo !== undefined) {
      for (let i = 0; i < currTry.length; i++) {
        userInfo.triesFeedback[userInfo.currRow][i] = charStatus.NOT_IN_WORD
        let achou = false
        for (let j = 0; j < letterAndCount.length; j++) {
          if (letterAndCount[j][0] == currTry[i]) {
            achou = true
          }
        }
        if (!achou) {
          letterAndCount.push([currTry[i], countOccurrences(currTry[i])])
        }
      }

      // coloca todas na posição certa como correct
      for (let i = 0; i < currTry.length; i++) {
        if (currTry[i] == userInfo.solutionArray[i]) {
          letterAndCount = subtractOccurrence(
            currTry[i],
            letterAndCount,
            charStatus.CORRECT,
            i
          )
        }
      }

      for (let i = 0; i < currTry.length; i++) {
        if (
          userInfo.solutionArray.includes(currTry[i]) &&
          userInfo.triesFeedback[userInfo.currRow][i] !== charStatus.CORRECT
        ) {
          for (let j = 0; j < userInfo.solutionArray.length; j++) {
            if (
              userInfo.solutionArray[j] == currTry[i] &&
              userInfo.triesFeedback[userInfo.currRow][i] ===
                charStatus.NOT_IN_WORD
            ) {
              letterAndCount = subtractOccurrence(
                currTry[i],
                letterAndCount,
                charStatus.WRONG_POSITION,
                i
              )
            }
          }
        }
      }
    }
  }

  const setNewLetter = (column: number, letter: string) => {
    if (userInfo !== undefined) {
      const newTries = [...userInfo.tries]
      const newNewTries = newTries.map((row, rowIndex) => {
        if (rowIndex === userInfo.currRow) {
          return row.map((value, columnIndex) => {
            if (columnIndex === column) {
              return letter
            } else {
              return value
            }
          })
        } else {
          return row
        }
      })

      setUserInfo({ ...userInfo, tries: [...newNewTries] })
    }
  }

  const didUserWin = () => {
    if (userInfo !== undefined) {
      const charsRight = userInfo.triesFeedback[userInfo.currRow].reduce(
        (accumulator, currentValue) => {
          if (currentValue == charStatus.CORRECT) {
            return accumulator + 1
          }
          return accumulator
        },
        0
      )

      return charsRight == userInfo.solutionArray.length
    }
  }

  const onComplete = (currTry: string[]) => {
    if (currTry.length === userInfo?.solutionArray.length) {
      for (let i = 0; i < currTry.length; i++) {
        currTry[i] = currTry[i].toLowerCase()
      }

      charEvaluation(currTry)
      const userWin = didUserWin()

      if (userInfo !== undefined) {
        for (let i = userInfo?.currRow + 1; i < 5; i++) {
          for (let j = 0; j < userInfo.solutionArray.length; j++) {
            userInfo.tries[i][j] = ''
          }
        }
      }

      // confere se acertou
      // se nao, aumenta a row

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      let newState = userInfo!
      const newTries = newState?.tries

      newTries[newState.currRow] = currTry

      newState = {
        ...newState,
        currRow: newState.currRow + 1,
        tries: newTries
      }

      if (userWin) {
        newState.won = true
      } else if (newState.currRow == 5) {
        newState.won = false
      }

      setUserInfo(newState)
    }
  }

  const onKeyPressed = (letter: string) => {
    setCurrentLetter(letter)
    setWasKeyPressed((state) => !state)
  }

  // API CALLS

  const initializeUserInfo = (prompt: { image: string; prompt: string }) => {
    // if (!level) return

    const localStoragePrompt = localStorage.getItem('prompt') || '{}'
    const parsedLocalStorage = JSON.parse(localStoragePrompt)

    if (parsedLocalStorage.solution === prompt.prompt.toLowerCase())
      return setUserInfo(parsedLocalStorage)

    // currRow: number
    // currTry: Array<string | null>
    // solution: string
    // solutionArray: string[]
    // won: boolean | null
    // tries: Array<Array<string>>
    // triesFeedback: Array<Array<charStatus>>
    if (prompt) {
      const myPrompt = prompt.prompt.toLowerCase()

      const solutionArray = prompt.prompt
        .toLowerCase()
        .split('')
        .filter((curr) => curr !== ' ')
      const emptySolutionArray = prompt.prompt
        .split('')
        .filter((curr) => curr !== ' ')
        .map(() => '')

      let contador = 0

      const arrayLengths = prompt.prompt.split(' ').map((curr) => curr.length)
      const formatedAllInputsLength = arrayLengths.map((curr, idx) => {
        if (idx === 0) {
          contador = curr
          return curr
        }
        contador += curr

        return contador
      })

      const newInfo = {
        currRow: 0,
        won: null,
        solution: myPrompt,
        solutionArray,
        triesFeedback: [[], [], [], [], []],
        currTry: emptySolutionArray,
        tries: [...new Array(5)].map(() => emptySolutionArray),
        arrayPromptLength: formatedAllInputsLength,
        promptLength: formatedAllInputsLength.at(-1) || 0
      }

      return setUserInfo(newInfo)
    }
  }

  useEffect(() => {
    const getPrompt = async () => {
      try {
        setArePromptsLoading(true)
        setPromptError(false)
        const { data } = await api.get<{ prompt: string; image: string }>(
          `/prompt`
        )

        initializeUserInfo(data)
        return setCurrentPrompt(data)
      } catch (error) {
        setPromptError(true)
      } finally {
        setArePromptsLoading(false)
      }
    }

    if (!userInfo) getPrompt()
  }, [userInfo])

  return (
    <TriesContext.Provider
      value={{
        userInfo,
        currentLetter,
        wasKeyPressed,
        arePromptsLoading,
        currentPrompt,
        isContrast,
        promptError,
        onSetIsContrast,
        onComplete,
        onKeyPressed,
        setNewLetter
      }}
    >
      {children}
    </TriesContext.Provider>
  )
}

export function useTries(): TriesContextType {
  const context = useContext(TriesContext)

  return context
}
