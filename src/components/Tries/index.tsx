import InputStep from 'components/InputStep'
import { useEffect, useState } from 'react'

interface userTriesTypes {
  currRow: number
  currTry: Array<string | null>
  solution: string
  solutionArray: string[]
  finished: boolean
  // feedbackArray: default, ok, certo
  tries: Array<Array<string> | null>
}

export const Tries = () => {
  const [userInfo, setUserInfo] = useState<userTriesTypes>()

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

    // if(!localStorage.getItem('prompt')) lalala

    // pego do localstorage o 'prompt'
    // se tiver algo no localstorage, usa ele setUserInfo(oq veio do ls)
    // se nao, inicializa com essa aqui de baixo

    setUserInfo({
      currRow: 0,
      finished: false,
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
      tries: [[], [], [], [], []]
    })
  }, [])

  const onComplete = (currTry: string[]) => {
    console.log(currTry)

    // confere se acertou
    // se nao, aumenta a row

    localStorage.setItem('prompt', JSON.stringify(userInfo))

    setUserInfo(userInfo)
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
            isRowActive={idx === 0}
          />
        )
      })}
    </div>
  )
}
