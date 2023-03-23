import { charStatus, userTriesTypes } from 'components/Tries/types'
import {
  createContext,
  ReactNode,
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
  onComplete: (currTry: string[]) => void
  onKeyPressed: (letter: string) => void
  arePromptsLoading: boolean
  prompts: { image: string; prompt: string }[]
}

export const TriesContext = createContext({} as TriesContextType)

export function TriesContextProvider({ children }: TriesContextProviderProps) {
  const [userInfo, setUserInfo] = useState<userTriesTypes>()

  const [arePromptsLoading, setArePromptsLoading] = useState(true)
  const [prompts, setPrompts] = useState<{ image: string; prompt: string }[]>(
    []
  )

  // Pega do localStorage se já tiver informação lá
  // useEffect(() => {
  //   if (localStorage.getItem('prompt') !== null) {
  //     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  //     setUserInfo(JSON.parse(localStorage.getItem('prompt')!))
  //   }
  // }, [])

  // useEffect(() => {
  //   // chamada ao back
  //   // passando o nivel atual
  //   if (localStorage.getItem('prompt') === null) {
  //     for (let i = 0; i < 5; i++) {
  //       for (let j = 0; j < userInfo.solutionArray.length; j++) {
  //         userInfo.triesFeedback[i][j] = charStatus.NOT_IN_WORD
  //         userInfo.tries[i][j] = ''
  //       }
  //     }
  //   }
  // }, [userInfo.solutionArray.length, userInfo.triesFeedback, userInfo.tries])

  // atualiza o localStorage a cada atualização de userInfo
  // useEffect(() => {
  //   localStorage.setItem('prompt', JSON.stringify(userInfo))
  // }, [userInfo])

  // Panguins dincando
  // Pinguins Felizes

  const [currentLetter, setCurrentLetter] = useState('')
  const [wasKeyPressed, setWasKeyPressed] = useState(false)

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
    // console.log(letterAndCount)

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
      // console.log(letterAndCount)

      // console.log(userInfo.triesFeedback[userInfo.currRow])

      // coloca todas na posição certa como correct
      for (let i = 0; i < currTry.length; i++) {
        if (currTry[i] == userInfo.solutionArray[i]) {
          // userInfo.triesFeedback[userInfo.currRow][i] = charStatus.CORRECT
          letterAndCount = subtractOccurrence(
            currTry[i],
            letterAndCount,
            charStatus.CORRECT,
            i
          )
        }
      }

      // console.log(userInfo.triesFeedback[userInfo.currRow])

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

              // userInfo.triesFeedback[userInfo.currRow][i] = charStatus.WRONG_POSITION
            }
          }
        }
      }
      console.log(userInfo.triesFeedback[userInfo.currRow])
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
    // console.log(currTry, userInfo)
    for (let i = 0; i < currTry.length; i++) {
      currTry[i] = currTry[i].toLowerCase()
    }

    charEvaluation(currTry)
    const userWin = didUserWin()
    // console.log(userInfo.won)

    // confere se acertou
    // se nao, aumenta a row

    setUserInfo((state) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      let newState = state!
      const newTries = newState?.tries

      newTries[newState.currRow] = currTry
      console.log(newTries)

      newState = {
        ...newState,
        currRow: newState.currRow + 1,
        tries: newTries
      }

      if (userWin) {
        newState.won = true
        alert('ganhou')
      } else if (newState.currRow == 4) {
        newState.won = false
        alert('perdeu')
      }

      return newState
    })
  }

  const onKeyPressed = (letter: string) => {
    setCurrentLetter(letter)
    setWasKeyPressed((state) => !state)
  }

  // API CALLS

  const initializeUserInfo = (prompt: { image: string; prompt: string }) => {
    // if (!level) return

    const localStoragePrompt = localStorage.getItem('prompt')

    if (localStoragePrompt) return setUserInfo(JSON.parse(localStoragePrompt))

    // currRow: number
    // currTry: Array<string | null>
    // solution: string
    // solutionArray: string[]
    // won: boolean | null
    // tries: Array<Array<string>>
    // triesFeedback: Array<Array<charStatus>>

    const myPrompt = prompt.prompt
    const solutionArray = prompt.prompt.split('').filter((curr) => curr !== ' ')
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

    console.log(newInfo)

    return setUserInfo(newInfo)
  }

  // useEffect(() => {
  //   console.log(userInfo)
  // }, [userInfo])

  useEffect(() => {
    const getPrompts = async () => {
      try {
        setArePromptsLoading(true)
        const { data } = await api.get<
          {
            image: string
            prompt: string
          }[]
        >('/prompt')

        setPrompts(data)
        console.log(data[0])
        initializeUserInfo(data[0])
      } catch (error) {
        console.error(error)
      } finally {
        setArePromptsLoading(false)
      }
    }

    if (!userInfo) getPrompts()
  }, [userInfo])

  return (
    <TriesContext.Provider
      value={{
        userInfo,
        currentLetter,
        wasKeyPressed,
        arePromptsLoading,
        prompts,
        onComplete,
        onKeyPressed
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
