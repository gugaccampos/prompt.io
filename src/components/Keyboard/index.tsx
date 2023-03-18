import { Key } from 'components/Key'
import { charStatus } from 'components/Tries/types'
import { TriesContext } from 'contexts/TriesContext'
import { FC, useContext } from 'react'
import * as S from './styles'

const rows = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['ok', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'del']
]

export const Keyboard: FC = () => {
  const { userInfo } = useContext(TriesContext)

  const keyColor = (letter: string) => {
    // falta fazer funcionar pra todas as tentativas
    if (
      userInfo.currRow > 0 &&
      userInfo.solutionArray.includes(letter) &&
      userInfo.tries[userInfo.currRow - 1].includes(letter)
    ) {
      for (let i = 0; i < userInfo.solutionArray.length; i++) {
        if (
          userInfo.solutionArray[i] == letter &&
          userInfo.triesFeedback[userInfo.currRow - 1][i] == charStatus.CORRECT
        ) {
          return '#3AA394'
        }
      }
      return '#EEC272'
    } else if (
      userInfo.currRow > 0 &&
      userInfo.tries[userInfo.currRow - 1].includes(letter) &&
      !userInfo.solutionArray.includes(letter)
    ) {
      return 'opacity'
    }
  }

  return (
    <S.Container>
      {rows.map((row) => (
        <div key={row.toString()}>
          {row.map((keyContent) => (
            <Key
              key={keyContent}
              content={keyContent}
              color={keyColor(keyContent)}
            />
          ))}
        </div>
      ))}
    </S.Container>
  )
}
