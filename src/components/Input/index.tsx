import { FC } from 'react'
import * as S from './styles'
import { useTheme } from 'styled-components'

interface InputT {
  space?: boolean
  disabled?: boolean
  rightPlace?: boolean
  rightKey?: boolean
}

export const Input: FC<InputT> = ({
  rightKey,
  rightPlace,
  disabled = false,
  space = false
}) => {
  const tema = useTheme()

  const renderInputColor = () => {
    if (rightPlace) return tema.colors.green
    if (rightKey) return tema.colors.yellow

    return undefined
  }

  if (disabled) return <S.Disabled />
  if (space) return <S.Space>-</S.Space>
  return <S.Input color={renderInputColor()} />
}
