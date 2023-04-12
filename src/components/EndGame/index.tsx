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
            <h1>Você ganhou! 🥳</h1>
          </>
        ) : (
          <>
            <h1>Você Perdeu</h1>
            <div>
              <h3>A frase certa era: </h3>
              <h3>{userInfo?.solution}</h3>
            </div>
          </>
        )}
      </S.EndGameContainer>
    </S.Modal>
  )
}
