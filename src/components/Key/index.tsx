import { TriesContext } from 'contexts/TriesContext'
import { FC, useContext } from 'react'
import * as S from './styles'

interface KeyT {
  content: string
  color?: string
  disabled?: boolean
}

export const Key: FC<KeyT> = ({ content, color, disabled = false }) => {
  const { onKeyPressed } = useContext(TriesContext)

  return (
    <S.Button
      disabled={disabled}
      special={content.length > 1}
      color={color}
      onClick={() => onKeyPressed(content)}
    >
      {content}
    </S.Button>
  )
}
