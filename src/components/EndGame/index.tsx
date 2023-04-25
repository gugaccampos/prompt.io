import { useTries } from 'contexts/TriesContext'
import * as S from './styles'
import { useEffect, useState } from 'react'
import { ShareNetwork } from '@phosphor-icons/react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function EndGame() {
  const { userInfo, winStreak } = useTries()
  const [endGameModal, setEndGameModal] = useState(false)
  const toastId = () => {
    toast.dismiss()
    toast('Copied to clipboard!', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored'
    })
  }
  useEffect(() => {
    setEndGameModal(userInfo?.won !== null && userInfo !== undefined)
  }, [userInfo])

  const handleCopyClip = async () => {
    try {
      if (userInfo?.won) {
        await navigator.clipboard.writeText(
          `Played prompt! ${userInfo.currRow}/5 🔥${winStreak}\nTry it here https://prompt-ia.vercel.app/`
        )
      } else {
        await navigator.clipboard.writeText(
          `Played prompt! 5/5 ❌❌ \nTry it here https://prompt-ia.vercel.app/`
        )
      }
      toastId()
    } catch (err) {
      console.error(err)
    }
  }

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
        <ToastContainer className="my-toast-container" />
        {userInfo?.won ? (
          <>
            <h1>You Won! 🥳</h1>
            <h3>Current win streak: {winStreak}🔥</h3>
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
        <S.ShareButton onClick={handleCopyClip}>
          <ShareNetwork color="#fff" weight="bold" />
          Share
        </S.ShareButton>
      </S.EndGameContainer>
    </S.Modal>
  )
}
