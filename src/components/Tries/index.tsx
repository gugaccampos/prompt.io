import InputStep from 'components/InputStep'
import { TriesContext } from 'contexts/TriesContext'
import { useContext } from 'react'

export const Tries = () => {
  const { userInfo, onComplete } = useContext(TriesContext)

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
            isRowActive={idx === userInfo?.currRow && userInfo.won === null}
            blur={
              userInfo.won === null
                ? idx > userInfo?.currRow
                : idx >= userInfo?.currRow
            }
            rowIndex={idx}
          />
        )
      })}
    </div>
  )
}
