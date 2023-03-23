import { charStatus, userTriesTypes } from 'components/Tries/types'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from 'services/api'

interface TriesContextProviderProps {
  children: ReactNode
}

interface TriesContextType {
  userInfo: userTriesTypes
  currentLetter: string
  wasKeyPressed: boolean
  onComplete: (currTry: string[]) => void
  onKeyPressed: (letter: string) => void
  arePromptsLoading: boolean
  prompts: { image: string; prompt: string }[]
  level: number
  getPrompts: () => Promise<void>
}

export const TriesContext = createContext({} as TriesContextType)

export function TriesContextProvider({ children }: TriesContextProviderProps) {
  const [userInfo, setUserInfo] = useState<userTriesTypes>({
    currRow: 0,
    won: null,
    currTry: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    solution: 'pinguins dancando',
    solutionArray: [
      'p',
      'i',
      'n',
      'g',
      'u',
      'i',
      'n',
      's',
      'd',
      'a',
      'n',
      'c',
      'a',
      'n',
      'd',
      'o'
    ],
    tries: [
      ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
    ],
    triesFeedback: [[], [], [], [], []]
  })

  const [currentLetter, setCurrentLetter] = useState('')
  const [wasKeyPressed, setWasKeyPressed] = useState(false)

  // isso aqui embaixo comentado provavelmente não vai ser usado
  // const createSolutionLengthArray = () => {
  //   const solutionArray = userInfo?.solution.split(' ')
  //   const lengthArray = solutionArray.map((solution) => solution.length)

  //   return lengthArray
  // }

  // const createSolutionArray = () => {
  //   const solutionArray = userInfo?.solution.split(' ')

  // }

  // Pega do localStorage se já tiver informação lá
  useEffect(() => {
    if (localStorage.getItem('prompt') !== null) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setUserInfo(JSON.parse(localStorage.getItem('prompt')!))
    }
  }, [])

  useEffect(() => {
    // chamada ao back
    // passando o nivel atual
    if (localStorage.getItem('prompt') === null) {
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < userInfo.solutionArray.length; j++) {
          userInfo.triesFeedback[i][j] = charStatus.NOT_IN_WORD
          userInfo.tries[i][j] = ''
        }
      }
    }
  }, [userInfo.solutionArray.length, userInfo.triesFeedback, userInfo.tries])

  // atualiza o localStorage a cada atualização de userInfo
  useEffect(() => {
    localStorage.setItem('prompt', JSON.stringify(userInfo))
  }, [userInfo])

  // Panguins dincando
  // Pinguins Felizes

  const subtractOccurrence = (
    letter: string,
    letterAndCount: Pair[],
    status: charStatus,
    index: number
  ) => {
    for (let i = 0; i < letterAndCount.length; i++) {
      if (letterAndCount[i][0] == letter) {
        if (letterAndCount[i][1] > 0) {
          console.log(userInfo.triesFeedback[userInfo.currRow])
          userInfo.triesFeedback[userInfo.currRow][index] = status
          letterAndCount[i][1] -= 1
          return letterAndCount
        }
      }
    }

    return letterAndCount
  }

  const countOccurrences = (letter: string) => {
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

  type Pair = [string, number]

  const charEvaluation = (currTry: string[]) => {
    let letterAndCount: Pair[] = []
    letterAndCount[0] = [currTry[0], countOccurrences(currTry[0])]
    // console.log(letterAndCount)

    // começa colocando todas como not in word
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

  const didUserWin = () => {
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

  const onComplete = (currTry: string[]) => {
    for (let i = 0; i < currTry.length; i++) {
      currTry[i] = currTry[i].toLowerCase()
    }

    charEvaluation(currTry)
    const userWin = didUserWin()
    // console.log(userInfo.won)

    // confere se acertou
    // se nao, aumenta a row

    setUserInfo((state) => {
      let newState = state

      const newTries = [...state.tries]
      newTries[state.currRow] = currTry

      newState = {
        ...state,
        currRow: state.currRow + 1,
        tries: newTries
      }

      if (userWin) {
        newState.won = true
        alert('ganhou')
      } else if (state.currRow == 4) {
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

  const [arePromptsLoading, setArePromptsLoading] = useState(true)
  const [prompts, setPrompts] = useState<{ image: string; prompt: string }[]>(
    []
  )

  const [level, setLevel] = useState(() => {
    let currLevel = 0

    if (typeof window !== 'undefined') {
      currLevel = Number(localStorage.getItem('level'))
    }
    return currLevel
  })

  const getPrompts = async () => {
    try {
      setArePromptsLoading(true)
      const response = await api.get('/prompt')

      setPrompts(response.data)
      setLevel(0)
    } catch (error) {
      console.error(error)
    } finally {
      setArePromptsLoading(false)
    }
  }

  useEffect(() => {
    getPrompts()
  }, [])

  return (
    <TriesContext.Provider
      value={{
        userInfo,
        currentLetter,
        wasKeyPressed,
        arePromptsLoading,
        prompts,
        level,
        getPrompts,
        onComplete,
        onKeyPressed
      }}
    >
      {children}
    </TriesContext.Provider>
  )
}
