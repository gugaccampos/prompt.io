import InputStep from 'components/InputStep'
import { useEffect, useState } from 'react'
import { charStatus, userTriesTypes } from './types'

export const Tries = () => {
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

  // const setLetterStatus = (status: charStatus, index: number) => {
  //   setUserInfo((state) => {
  //     const newTriesFeedback
  //     return { ...state, triesFeedback[state.currRow][index]: status}
  //   })
  // }

  // Panguins dincando
  // Pinguins Felizes

  const charEvaluation = (currTry: string[]) => {
    const aux: charStatus[] = []

    for (let i = 0; i < currTry.length; i++) {
      userInfo.triesFeedback[userInfo.currRow][i] = charStatus.NOT_IN_WORD
      aux[i] = charStatus.NOT_IN_WORD
    }

    console.log(userInfo.triesFeedback[userInfo.currRow])

    for (let i = 0; i < currTry.length; i++) {
      if (currTry[i] == userInfo.solutionArray[i]) {
        userInfo.triesFeedback[userInfo.currRow][i] = charStatus.CORRECT
        aux[i] = charStatus.CORRECT
      }
    }

    console.log(userInfo.triesFeedback[userInfo.currRow])

    for (let i = 0; i < currTry.length; i++) {
      if (
        userInfo.solutionArray.includes(currTry[i]) &&
        aux[i] !== charStatus.CORRECT
      ) {
        for (let j = 0; j < userInfo.solutionArray.length; j++) {
          if (
            userInfo.solutionArray[j] == currTry[i] &&
            aux[j] !== charStatus.WRONG_POSITION &&
            aux[j] !== charStatus.CORRECT
          ) {
            userInfo.triesFeedback[userInfo.currRow][i] =
              charStatus.WRONG_POSITION
            aux[j] = charStatus.WRONG_POSITION
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
    // confere se acertou
    // se nao, aumenta a row

    setUserInfo((state) => {
      let newState = state

      const newTries = [...state.tries]
      newTries[state.currRow] = currTry

      if (userWin) {
        newState.won = true
      } else if (state.currRow == 4) {
        newState.won = false
      } else {
        newState = {
          ...state,
          currRow: state.currRow + 1,
          tries: newTries
        }
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
            userInfo={userInfo}
            onComplete={onComplete}
            isRowActive={idx === userInfo?.currRow}
            blur={idx > userInfo?.currRow}
            rowIndex={idx}
          />
        )
      })}
    </div>
  )
}
