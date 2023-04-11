import { Key } from 'components/Key'
import { charStatus } from 'components/Tries/types'
import { TriesContext } from 'contexts/TriesContext'
import { FC, useContext } from 'react'
import * as S from './styles'
import { useTheme } from 'styled-components'

const rows = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['ok', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'del']
]

export const Keyboard: FC = () => {
  const theme = useTheme()
  const { userInfo, isContrast } = useContext(TriesContext)

  const keyColor = (letter: string) => {
    if (userInfo !== undefined && userInfo.currRow > 0) {
      for (let i = 0; i < userInfo.tries.length; i++) {
        if (
          !userInfo.solutionArray.includes(letter) &&
          userInfo.tries[i].includes(letter) &&
          userInfo.triesFeedback[i].length !== 0
        ) {
          return 'opacity'
        } else if (
          userInfo.tries[i].includes(letter) &&
          userInfo.solutionArray.includes(letter) &&
          userInfo.triesFeedback[i].length !== 0
        ) {
          for (let j = 0; j < userInfo.solutionArray.length; j++) {
            if (
              userInfo.solutionArray[j] == letter &&
              userInfo.triesFeedback[i][j] == charStatus.CORRECT
            ) {
              return isContrast ? theme.colors.green : theme.colors.blue
            }
          }
        }
      }
      for (let i = 0; i < userInfo.tries.length; i++) {
        if (
          userInfo.tries[i].includes(letter) &&
          userInfo.triesFeedback[i].length !== 0
        ) {
          return isContrast ? theme.colors.yellow : theme.colors.orange
        }
      }
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
