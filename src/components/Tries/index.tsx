import InputStep from 'components/InputStep'
import { useEffect, useState } from 'react'

enum charStatus {
  CORRECT,
  WRONG_POSITION,
  NOT_IN_WORD
}

interface userTriesTypes {
  currRow: number
  currTry: Array<string | null>
  solution: string
  solutionArray: string[]
  finished: boolean
  won: boolean
  feedbackArray: Array<charStatus | null>
  tries: Array<Array<string> | null>
}

export const Tries = () => {
  const [userInfo, setUserInfo] = useState<userTriesTypes>({
    currRow: 0,
    finished: false,
    won: false,
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
    tries: [[], [], [], [], []],
    feedbackArray: [null]
  })

  // isso aqui embaixo comentado provavelmente não vai ser usado
  // const createSolutionLengthArray = () => {
  //   const solutionArray = userInfo?.solution.split(' ')
  //   const lengthArray = solutionArray.map((solution) => solution.length)

  //   return lengthArray
  // }

  // const createSolutionArray = () => {
  //   const solutionArray = userInfo?.solution.split(' ')

  // }

  useEffect(() => {
    // chamada ao back
    // passando o nivel atual

    if (localStorage.getItem('prompt') !== null) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setUserInfo(JSON.parse(localStorage.getItem('prompt')!))
    }
  }, [])

  // atualiza o localStorage a cada atualização de userInfo
  useEffect(() => {
    localStorage.setItem('prompt', JSON.stringify(userInfo))
  }, [userInfo])

  const charEvaluation = (currTry: string[]) => {
    currTry = []
    console.log(currTry)

    return [
      charStatus.CORRECT,
      charStatus.CORRECT,
      charStatus.CORRECT,
      charStatus.CORRECT,
      charStatus.CORRECT,
      charStatus.CORRECT,
      charStatus.CORRECT,
      charStatus.CORRECT,
      charStatus.CORRECT,
      charStatus.CORRECT,
      charStatus.CORRECT,
      charStatus.CORRECT,
      charStatus.CORRECT,
      charStatus.CORRECT,
      charStatus.CORRECT,
      charStatus.CORRECT
    ]
  }

  const didUserWin = (array: charStatus[]) => {
    const charsRight = array.reduce((accumulator, currentValue) => {
      if (currentValue == charStatus.CORRECT) {
        return accumulator + 1
      }
      return accumulator
    }, 0)

    return charsRight == userInfo.solutionArray.length
  }

  const onComplete = (currTry: string[]) => {
    console.log(currTry)

    // confere se acertou
    // se nao, aumenta a row
    const newFeedbackArray: charStatus[] = charEvaluation(currTry)

    const userWin = didUserWin(newFeedbackArray)

    setUserInfo((state) => {
      let newState = state

      const newTries = [...state.tries]
      newTries[state.currRow] = currTry
      newState = {
        ...state,
        currRow: state.currRow + 1,
        tries: newTries
      }
      if (state.currRow == 4) {
        newState.finished = true
      }
      if (userWin) {
        newState.won = true
      }
      return newState
    })
  }

  return (
    <div>
      {[...new Array(5)].map((item, idx) => {
        // se o index do array !== currRow, coloca q ta inativo
        return (
          <InputStep
            key={item}
            length={[8, 8]}
            onComplete={onComplete}
            isRowActive={idx === userInfo?.currRow}
          />
        )
      })}
    </div>
  )
}
