import { EndGame } from 'components/EndGame'
import { Image } from 'components/Image'
import { Keyboard } from 'components/Keyboard'
import { Topbar } from 'components/Topbar'
import { Tries } from 'components/Tries'
import { useTries } from 'contexts/TriesContext'
import * as S from './styles'

export const Default = () => {
  const { arePromptsLoading, promptError } = useTries()

  if (promptError)
    return (
      <S.LoaderContainer>
        <h1>😢</h1>
        <p>
          An error has occurred. Next time we will ask the AI not to confuse the
          instructions.
        </p>
        <button>Reload page</button>
      </S.LoaderContainer>
    )

  if (arePromptsLoading)
    return (
      <S.LoaderContainer>
        <S.Loader className="loader" />
        <p>One moment. AI is creating the game for us.</p>
      </S.LoaderContainer>
    )

  return (
    <>
      <Topbar />
      <Image
        url1="http://cbissn.ibict.br/images/phocagallery/galeria2/thumbs/phoca_thumb_l_image03_grd.png"
        url2="https://assets.americancinematheque.com/wp-content/uploads/2022/07/24132229/ac-opt-HAPPY-FEET_2.jpg"
      />
      <Tries />
      <Keyboard />
      <EndGame />
    </>
  )
}
