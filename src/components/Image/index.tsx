import { useTries } from 'contexts/TriesContext'
import { FC } from 'react'
import * as S from './styles'

interface ImageT {
  url1: string
  url2: string
}

export const Image: FC<ImageT> = () => {
  const { currentPrompt } = useTries()

  return (
    <S.Container>
      {!!currentPrompt && (
        <>
          <S.Image src={`data:image/png;base64, ${currentPrompt?.image}`} />
        </>
      )}
    </S.Container>
  )
}
