import { useTries } from 'contexts/TriesContext'
import * as S from './styles'
import { useEffect, useState } from 'react'

export function EndGame() {
  const { userInfo } = useTries()
  const [endGameModal, setEndGameModal] = useState(false)

  useEffect(() => {
    setEndGameModal(userInfo?.won !== null && userInfo !== undefined)
  }, [userInfo])

  return (
    <S.Modal
      isOpen={endGameModal}
      aria-label="modal"
      aria-hidden={endGameModal}
    >
      <S.Close
        role="button"
        aria-label="close modal"
        onClick={() => setEndGameModal(false)}
      ></S.Close>
      <S.EndGameContainer>
        {userInfo?.won ? (
          <>
            <h1>You Won! 🥳</h1>
          </>
        ) : (
          <>
            <h1>You Lost 😢</h1>
            <div>
              <h3>The correct sentence was: </h3>
              <h3>{userInfo?.solution}</h3>
            </div>
          </>
        )}
        <h3>Come back tomorrow for another challenge!</h3>
      </S.EndGameContainer>
    </S.Modal>
  )
}
