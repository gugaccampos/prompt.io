import InputStep from 'components/InputStep'
import { TriesContext } from 'contexts/TriesContext'
import { useContext } from 'react'

export const Tries = () => {
  const { userInfo } = useContext(TriesContext)

  // useEffect(() => {
  //   console.log(userInfo)
  // }, [userInfo])

  return (
    <div>
      {[...new Array(5)].map((item, idx) => {
        // se o index do array !== currRow, coloca q ta inativo
        return (
          <InputStep
            key={item}
            isRowActive={idx === userInfo?.currRow && userInfo.won === null}
            rowIndex={idx}
          />
        )
      })}
    </div>
  )
}
