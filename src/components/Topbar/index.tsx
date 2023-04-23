import { FC, useState, useEffect } from 'react'
import { Logo } from './logo'
import * as S from './styles'
import { useTries } from 'contexts/TriesContext'
import { Key } from 'components/Key'
import { useTheme } from 'styled-components'
import { Space } from 'components/InputStep/styles'
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
      <S.LogoContainer>
        <Logo />
      </S.LogoContainer>
      <S.Text>Guess the prompt that generated the image</S.Text>
      <S.Buttons>
        <S.ButtonContainer onClick={() => setIsOpen(true)}>?</S.ButtonContainer>
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
            <Key content={'P'} color={theme.colors.bgLight} />
            <Key content={'E'} color={theme.colors.bgLight} />
            <Key content={'N'} color={theme.colors.bgLight} />
            <Key content={'G'} color={theme.colors.bgLight} />
            <Key content={'U'} color={theme.colors.bgLight} />
            <Key content={'I'} color={theme.colors.bgLight} />
            <Key content={'N'} color={theme.colors.bgLight} />
            <Key content={'S'} color={theme.colors.bgLight} />
            <Space>-</Space>
            <Key
              content={'F'}
              color={isContrast ? theme.colors.blue : theme.colors.green}
            />
            <Key content={'R'} color={theme.colors.bgLight} />
            <Key content={'I'} color={theme.colors.bgLight} />
            <Key content={'E'} color={theme.colors.bgLight} />
            <Key content={'N'} color={theme.colors.bgLight} />
            <Key content={'D'} color={theme.colors.bgLight} />
            <Key content={'S'} color={theme.colors.bgLight} />
          </S.TutorialExamples>

          <S.TutorialExamplesText>
            <Key
              content={'F'}
              color={isContrast ? theme.colors.blue : theme.colors.green}
            />
            <S.TutorialText>
              It means that the letter belongs to the sentence and is in the
              correct position
            </S.TutorialText>
          </S.TutorialExamplesText>

          <S.TutorialExamples>
            <Key content={'K'} color={theme.colors.bgLight} />
            <Key content={'A'} color={theme.colors.bgLight} />
            <Key
              content={'R'}
              color={isContrast ? theme.colors.blue : theme.colors.green}
            />
            <Key content={'T'} color={theme.colors.bgLight} />
            <Key content={'S'} color={theme.colors.bgLight} />
            <Space>-</Space>
            <Key content={'R'} color={theme.colors.bgLight} />
            <Key content={'A'} color={theme.colors.bgLight} />
            <Key content={'C'} color={theme.colors.bgLight} />
            <Key content={'I'} color={theme.colors.bgLight} />
            <Key content={'N'} color={theme.colors.bgLight} />
            <Key content={'G'} color={theme.colors.bgLight} />
          </S.TutorialExamples>

          <S.TutorialExamplesText>
            <Key
              content={'R'}
              color={isContrast ? theme.colors.orange : theme.colors.yellow}
            />
            <S.TutorialText>
              It means that letter belongs to the sentence, but in another
              position
            </S.TutorialText>
          </S.TutorialExamplesText>

          <S.TutorialExamples>
            <Key content={'V'} color={theme.colors.bgLight} />
            <Key content={'A'} color={theme.colors.bgLight} />
            <Key content={'S'} color={theme.colors.bgLight} />
            <Key content={'C'} color={'opacity'} />
            <Key content={'O'} color={theme.colors.bgLight} />
            <Space>-</Space>
            <Key content={'O'} color={theme.colors.bgLight} />
            <Key content={'F'} color={theme.colors.bgLight} />
            <Space>-</Space>
            <Key content={'G'} color={theme.colors.bgLight} />
            <Key content={'A'} color={theme.colors.bgLight} />
            <Key content={'M'} color={theme.colors.bgLight} />
            <Key content={'A'} color={theme.colors.bgLight} />
          </S.TutorialExamples>

          <S.TutorialExamplesText>
            <Key content={'C'} color={'opacity'} />
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
            <a
              href="https://term.ooo/"
              target="_blank"
              rel="noreferrer"
              style={{ color: '#fff' }}
            >
              Termo
            </a>
          </S.Termo>
        </S.ConfigContainer>
      </S.ConfigModal>
    </S.Container>
  )
}
