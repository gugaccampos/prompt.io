import { FC, useState, useEffect } from 'react'
import { Logo } from './logo'
import * as S from './styles'
import { useTries } from 'contexts/TriesContext'
import { useTheme } from 'styled-components'
import { Input, Space } from 'components/InputStep/styles'
import { Gear } from '@phosphor-icons/react'
import Toggle from 'components/Toggle'

export const Topbar: FC = () => {
  const { isContrast, onSetIsContrast } = useTries()
  const [isOpen, setIsOpen] = useState(false)
  const [configOpen, setConfigOpen] = useState(false)
  const theme = useTheme()

  useEffect(() => {
    if (!localStorage.getItem('tutorial')) setIsOpen(true)
  }, [])

  return (
    <S.Container>
      <S.MobileButton>
        <S.ButtonContainer onClick={() => setIsOpen(true)}>?</S.ButtonContainer>
      </S.MobileButton>

      <S.LogoAndTexts>
        <S.LogoContainer>
          <Logo />
        </S.LogoContainer>
        <S.Text>Guess the prompt that generated the image</S.Text>
      </S.LogoAndTexts>

      <S.BigDevicesButtons>
        <S.ButtonContainer onClick={() => setIsOpen(true)}>?</S.ButtonContainer>
      </S.BigDevicesButtons>

      <S.Buttons>
        <S.ButtonContainer onClick={() => setConfigOpen(true)}>
          {' '}
          <Gear color="white" weight="bold" />
        </S.ButtonContainer>
      </S.Buttons>

      <S.Modal isOpen={isOpen} aria-label="modal" aria-hidden={!isOpen}>
        <S.Close
          role="button"
          aria-label="close modal"
          onClick={() => {
            localStorage.setItem('tutorial', 'true')
            setIsOpen(false)
          }}
        ></S.Close>
        <S.TutorialContainer>
          <S.TutorialText>
            Discover the prompt that generated the image in 5 tries. After each
            attempt, the tiles show how close you are to the correct answer.
          </S.TutorialText>

          <S.TutorialExamples>
            <Input
              value={'P'}
              readOnly
              color={theme.colors.bgLight}
              style={{ width: '1.25em', height: '1.67em' }}
            />
            <Input
              value={'E'}
              readOnly
              color={theme.colors.bgLight}
              style={{ width: '1.25em', height: '1.67em' }}
            />
            <Input
              value={'N'}
              readOnly
              color={theme.colors.bgLight}
              style={{ width: '1.25em', height: '1.67em' }}
            />
            <Input
              value={'G'}
              readOnly
              color={theme.colors.bgLight}
              style={{ width: '1.25em', height: '1.67em' }}
            />
            <Input
              value={'U'}
              readOnly
              color={theme.colors.bgLight}
              style={{ width: '1.25em', height: '1.67em' }}
            />
            <Input
              value={'I'}
              readOnly
              color={theme.colors.bgLight}
              style={{ width: '1.25em', height: '1.67em' }}
            />
            <Input
              value={'N'}
              readOnly
              color={theme.colors.bgLight}
              style={{ width: '1.25em', height: '1.67em' }}
            />
            <Input
              value={'S'}
              readOnly
              color={theme.colors.bgLight}
              style={{ width: '1.25em', height: '1.67em' }}
            />
            <Space>-</Space>
            <Input
              value={'F'}
              readOnly
              color={isContrast ? theme.colors.blue : theme.colors.green}
              style={{ width: '1.25em', height: '1.67em' }}
            />
            <Input
              value={'R'}
              readOnly
              color={theme.colors.bgLight}
              style={{ width: '1.25em', height: '1.67em' }}
            />
            <Input
              value={'I'}
              readOnly
              color={theme.colors.bgLight}
              style={{ width: '1.25em', height: '1.67em' }}
            />
            <Input
              value={'E'}
              readOnly
              color={theme.colors.bgLight}
              style={{ width: '1.25em', height: '1.67em' }}
            />
            <Input
              value={'N'}
              readOnly
              color={theme.colors.bgLight}
              style={{ width: '1.25em', height: '1.67em' }}
            />
            <Input
              value={'D'}
              readOnly
              color={theme.colors.bgLight}
              style={{ width: '1.25em', height: '1.67em' }}
            />
            <Input
              value={'S'}
              readOnly
              color={theme.colors.bgLight}
              style={{ width: '1.25em', height: '1.67em' }}
            />
          </S.TutorialExamples>

          <S.TutorialExamplesText>
            <Input
              value={'F'}
              readOnly
              color={isContrast ? theme.colors.blue : theme.colors.green}
              style={{ width: '1.25em', height: '1.67em' }}
            />
            <S.TutorialText>
              It means that the letter belongs to the sentence and is in the
              correct position
            </S.TutorialText>
          </S.TutorialExamplesText>

          <S.TutorialExamples>
            <Input
              value={'K'}
              readOnly
              color={theme.colors.bgLight}
              style={{ width: '1.25em', height: '1.67em' }}
            />
            <Input
              value={'A'}
              readOnly
              color={theme.colors.bgLight}
              style={{ width: '1.25em', height: '1.67em' }}
            />
            <Input
              value={'R'}
              readOnly
              color={isContrast ? theme.colors.orange : theme.colors.yellow}
              style={{ width: '1.25em', height: '1.67em' }}
            />
            <Input
              value={'T'}
              readOnly
              color={theme.colors.bgLight}
              style={{ width: '1.25em', height: '1.67em' }}
            />
            <Input
              value={'S'}
              readOnly
              color={theme.colors.bgLight}
              style={{ width: '1.25em', height: '1.67em' }}
            />
            <Space>-</Space>
            <Input
              value={'R'}
              readOnly
              color={theme.colors.bgLight}
              style={{ width: '1.25em', height: '1.67em' }}
            />
            <Input
              value={'A'}
              readOnly
              color={theme.colors.bgLight}
              style={{ width: '1.25em', height: '1.67em' }}
            />
            <Input
              value={'C'}
              readOnly
              color={theme.colors.bgLight}
              style={{ width: '1.25em', height: '1.67em' }}
            />
            <Input
              value={'I'}
              readOnly
              color={theme.colors.bgLight}
              style={{ width: '1.25em', height: '1.67em' }}
            />
            <Input
              value={'N'}
              readOnly
              color={theme.colors.bgLight}
              style={{ width: '1.25em', height: '1.67em' }}
            />
            <Input
              value={'G'}
              readOnly
              color={theme.colors.bgLight}
              style={{ width: '1.25em', height: '1.67em' }}
            />
          </S.TutorialExamples>

          <S.TutorialExamplesText>
            <Input
              value={'R'}
              readOnly
              color={isContrast ? theme.colors.orange : theme.colors.yellow}
              style={{ width: '1.25em', height: '1.67em' }}
            />
            <S.TutorialText>
              It means that letter belongs to the sentence, but in another
              position
            </S.TutorialText>
          </S.TutorialExamplesText>

          <S.TutorialExamples>
            <Input
              value={'V'}
              readOnly
              color={theme.colors.bgLight}
              style={{ width: '1.25em', height: '1.67em' }}
            />
            <Input
              value={'A'}
              readOnly
              color={theme.colors.bgLight}
              style={{ width: '1.25em', height: '1.67em' }}
            />
            <Input
              value={'S'}
              readOnly
              color={theme.colors.bgLight}
              style={{ width: '1.25em', height: '1.67em' }}
            />
            <Input
              value={'C'}
              readOnly
              color={'opacity'}
              style={{ width: '1.25em', height: '1.67em' }}
            />
            <Input
              value={'O'}
              readOnly
              color={theme.colors.bgLight}
              style={{ width: '1.25em', height: '1.67em' }}
            />
            <Space>-</Space>
            <Input
              value={'O'}
              readOnly
              color={theme.colors.bgLight}
              style={{ width: '1.25em', height: '1.67em' }}
            />
            <Input
              value={'F'}
              readOnly
              color={theme.colors.bgLight}
              style={{ width: '1.25em', height: '1.67em' }}
            />
            <Space>-</Space>
            <Input
              value={'G'}
              readOnly
              color={theme.colors.bgLight}
              style={{ width: '1.25em', height: '1.67em' }}
            />
            <Input
              value={'A'}
              readOnly
              color={theme.colors.bgLight}
              style={{ width: '1.25em', height: '1.67em' }}
            />
            <Input
              value={'M'}
              readOnly
              color={theme.colors.bgLight}
              style={{ width: '1.25em', height: '1.67em' }}
            />
            <Input
              value={'A'}
              readOnly
              color={theme.colors.bgLight}
              style={{ width: '1.25em', height: '1.67em' }}
            />
          </S.TutorialExamples>

          <S.TutorialExamplesText>
            <Input
              value={'C'}
              readOnly
              color={'opacity'}
              style={{ width: '1.25em', height: '1.67em' }}
            />
            <S.TutorialText>
              It means that letter does not belong to the sentence
            </S.TutorialText>
          </S.TutorialExamplesText>

          <S.TutorialText>Phrases can have repeated letters</S.TutorialText>
        </S.TutorialContainer>
      </S.Modal>

      <S.ConfigModal
        isOpen={configOpen}
        aria-label="modal"
        aria-hidden={!configOpen}
      >
        <S.ConfigContainer>
          <S.ConfigClose
            role="button"
            aria-label="close modal"
            onClick={() => setConfigOpen(false)}
          >
            X
          </S.ConfigClose>
          <S.ConfigDaltonico>
            <S.ConfigText>High contrast:</S.ConfigText>
            {/* <Toggle
              onChange={() => onSetIsContrast()}
              name={''}
              disabled={false}
              value={''}
              checked={!isContrast}
              labelRight={''}
              labelLeft={''}
            /> */}
            <Toggle isOn={isContrast} handleToggle={onSetIsContrast} />
          </S.ConfigDaltonico>

          <S.Devs>
            <S.ConfigText>Developers:</S.ConfigText>
            <a
              href="https://github.com/gugaccampos"
              target="_blank"
              rel="noreferrer"
            >
              Gustavo Campos
            </a>
            <a
              href="https://github.com/lucasacioly"
              target="_blank"
              rel="noreferrer"
            >
              Lucas Acioly
            </a>
            <a
              href="https://github.com/lucasgmelo"
              target="_blank"
              rel="noreferrer"
            >
              Lucas Melo
            </a>
            <a
              href="https://github.com/Matheusfrej"
              target="_blank"
              rel="noreferrer"
            >
              Matheus Frej
            </a>
            <a
              href="https://github.com/RodrigoMesel"
              target="_blank"
              rel="noreferrer"
            >
              Rodrigo Mesel
            </a>
          </S.Devs>

          <S.Termo>
            <S.ConfigText>Inspired by: </S.ConfigText>
            <a href="https://term.ooo/" target="_blank" rel="noreferrer">
              Termo
            </a>
          </S.Termo>
        </S.ConfigContainer>
      </S.ConfigModal>
    </S.Container>
  )
}
