import InputStep from 'components/InputStep'
import { useState } from 'react'

interface userTriesTypes {
  currRow: number
  currTry: Array<string | null>
  solution: string
  tries: Array<Array<string> | null>
}

export const Tries = () => {
  const [userInfo, setUserInfo] = useState<userTriesTypes>(() => {
    if (!localStorage.getItem('prompt'))
      return {
        currRow: 0,
        currTry: [...Array(16)].map(() => ''),
        solution: 'casa nova',
        tries: [[], [], [], [], []]
      }

    const currentUser: userTriesTypes = JSON.parse(
      localStorage.getItem('prompt') || '{}'
    )

    return currentUser
  })

  const createSolutionLengthArray = () => {
    const solutionArray = userInfo?.solution.split(' ')
    const lengthArray = solutionArray.map((solution) => solution.length)

    return lengthArray
  }

  // const createSolutionArray = () => {
  //   const solutionArray = userInfo?.solution.split(' ')

  // }

  const onComplete = (currTry: string[]) => {
    console.log(currTry)
    setUserInfo(userInfo)
  }

  return (
    <>
      {[...new Array(5)].map((item) => {
        return (
          <InputStep
            key={item}
            length={createSolutionLengthArray()}
            onComplete={onComplete}
          />
        )
      })}
    </>
  )
}
