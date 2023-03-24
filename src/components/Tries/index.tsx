import InputStep from 'components/InputStep'
import { TriesContext } from 'contexts/TriesContext'
import { useContext } from 'react'

export const Tries = () => {
  const { userInfo } = useContext(TriesContext)

  return (
    <div>
      {[...new Array(5)].map((item, idx) => {
        // se o index do array !== currRow, coloca q ta inativo
        return (
          <InputStep
            key={idx}
            isRowActive={idx === userInfo?.currRow && userInfo.won === null}
            rowIndex={idx}
          />
        )
      })}
    </div>
  )
}
