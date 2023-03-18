import { FC } from 'react'
import * as S from './styles'

interface KeyT {
  content: string
  color?: string
  disabled?: boolean
}

export const Key: FC<KeyT> = ({ content, color, disabled = false }) => {
  return (
    <S.Button disabled={disabled} special={content.length > 1} color={color}>
      {content}
    </S.Button>
  )
}
