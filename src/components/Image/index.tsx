import { useTries } from 'contexts/TriesContext'
import { FC } from 'react'
import * as S from './styles'

interface ImageT {
  url1: string
  url2: string
}

export const Image: FC<ImageT> = () => {
  const { prompts, level } = useTries()

  return (
    <S.Container>
      {prompts.length !== 0 && (
        <>
          <S.Image src={`data:image/png;base64, ${prompts[level].image}`} />
        </>
      )}
    </S.Container>
  )
}
