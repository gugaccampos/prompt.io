import { FC, useState } from 'react'
import { Logo } from './logo'
import * as S from './styles'
import { useTries } from 'contexts/TriesContext'
import { Key } from 'components/Key'
import { useTheme } from 'styled-components'
import { Space } from 'components/InputStep/styles'
import { Gear } from '@phosphor-icons/react'

export const Topbar: FC = () => {
  const { prompts, level, setLevel, isContrast, onSetIsContrast } = useTries()
  const [isOpen, setIsOpen] = useState(true)
  const [configOpen, setConfigOpen] = useState(false)
  const theme = useTheme()

  const nextLevel = () => {
    const index = prompts.findIndex((object) => {
      return object.key === level
    })

    if (prompts.at(index + 1)) {
      setLevel(prompts[index + 1].key)
    } else setLevel(prompts[0].key)
  }

  return (
    <S.Container>
      <S.LogoContainer>
        <Logo />
      </S.LogoContainer>
      <S.Text>Adivinhe o prompt que gerou a imagem</S.Text>
      <S.Buttons>
        <S.ButtonContainer onClick={() => setIsOpen(true)}>?</S.ButtonContainer>
        <S.ButtonContainer onClick={() => setConfigOpen(true)}>
          {' '}
          <Gear color="white" weight="bold" />
        </S.ButtonContainer>

        <S.NextButton
          // disabled={!hasNewPrompt}
          onClick={nextLevel}
        >
          PRÓXIMO
        </S.NextButton>
      </S.Buttons>
      <S.Modal isOpen={isOpen} aria-label="modal" aria-hidden={!isOpen}>
        <S.Close
          role="button"
          aria-label="close modal"
          onClick={() => setIsOpen(false)}
        ></S.Close>
        <S.TutorialContainer>
          <S.TutorialText>
            Descubra o script que gerou a imagem em 5 tentantivas. Depois de
            cada tentativa as peças mostram o quão perto você está da resposta
            correta.
          </S.TutorialText>

          <S.TutorialExamples>
            <Key content={'P'} color={theme.colors.bgLight} />
            <Key content={'I'} color={theme.colors.bgLight} />
            <Key content={'N'} color={theme.colors.bgLight} />
            <Key content={'G'} color={theme.colors.bgLight} />
            <Key content={'U'} color={theme.colors.bgLight} />
            <Key content={'I'} color={theme.colors.bgLight} />
            <Key content={'N'} color={theme.colors.bgLight} />
            <Key content={'S'} color={theme.colors.bgLight} />
            <Space>-</Space>
            <Key
              content={'A'}
              color={isContrast ? theme.colors.green : theme.colors.blue}
            />
            <Key content={'M'} color={theme.colors.bgLight} />
            <Key content={'I'} color={theme.colors.bgLight} />
            <Key content={'G'} color={theme.colors.bgLight} />
            <Key content={'O'} color={theme.colors.bgLight} />
            <Key content={'S'} color={theme.colors.bgLight} />
          </S.TutorialExamples>

          <S.TutorialExamplesText>
            <Key
              content={'A'}
              color={isContrast ? theme.colors.green : theme.colors.blue}
            />
            <S.TutorialText>
              Significa que essa letra pertence à palavra e está na posição
              correta
            </S.TutorialText>
          </S.TutorialExamplesText>

          <S.TutorialExamples>
            <Key content={'C'} color={theme.colors.bgLight} />
            <Key content={'A'} color={theme.colors.bgLight} />
            <Key
              content={'R'}
              color={isContrast ? theme.colors.yellow : theme.colors.orange}
            />
            <Key content={'R'} color={theme.colors.bgLight} />
            <Key content={'O'} color={theme.colors.bgLight} />
            <Space>-</Space>
            <Key content={'A'} color={theme.colors.bgLight} />
            <Key content={'N'} color={theme.colors.bgLight} />
            <Key content={'T'} color={theme.colors.bgLight} />
            <Key content={'I'} color={theme.colors.bgLight} />
            <Key content={'G'} color={theme.colors.bgLight} />
            <Key content={'O'} color={theme.colors.bgLight} />
          </S.TutorialExamples>

          <S.TutorialExamplesText>
            <Key
              content={'R'}
              color={isContrast ? theme.colors.yellow : theme.colors.orange}
            />
            <S.TutorialText>
              Significa que essa letra pertence à palavra mas em outra posição
            </S.TutorialText>
          </S.TutorialExamplesText>

          <S.TutorialExamples>
            <Key content={'V'} color={theme.colors.bgLight} />
            <Key content={'A'} color={theme.colors.bgLight} />
            <Key content={'S'} color={theme.colors.bgLight} />
            <Key content={'C'} color={'opacity'} />
            <Key content={'O'} color={theme.colors.bgLight} />
            <Space>-</Space>
            <Key content={'D'} color={theme.colors.bgLight} />
            <Key content={'A'} color={theme.colors.bgLight} />
            <Space>-</Space>
            <Key content={'G'} color={theme.colors.bgLight} />
            <Key content={'A'} color={theme.colors.bgLight} />
            <Key content={'M'} color={theme.colors.bgLight} />
            <Key content={'A'} color={theme.colors.bgLight} />
          </S.TutorialExamples>

          <S.TutorialExamplesText>
            <Key content={'C'} color={'opacity'} />
            <S.TutorialText>
              Significa que essa letra não pertence à palavra
            </S.TutorialText>
          </S.TutorialExamplesText>

          <S.TutorialText>
            As palavras podem ter letras repetidas
          </S.TutorialText>

          <S.TutorialExamplesText>
            <S.NextButton>PRÓXIMO</S.NextButton>
            <S.TutorialText>
              Este botão gera uma nova imagem e um novo script para ser acertado
            </S.TutorialText>
          </S.TutorialExamplesText>
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
            <S.ConfigText>Ativar o modo de alto contraste</S.ConfigText>
            {/* <Toggle
              onChange={() => onSetIsContrast()}
              name={''}
              disabled={false}
              value={''}
              checked={!isContrast}
              labelRight={''}
              labelLeft={''}
            /> */}
            <input type="checkbox" onChange={() => onSetIsContrast()}></input>
          </S.ConfigDaltonico>

          <S.Devs>
            <S.ConfigText>Desenvolvedores:</S.ConfigText>
            <a
              href="https://github.com/gugaccampos"
              target="_blank"
              rel="noreferrer"
              style={{ color: '#fff' }}
            >
              Gustavo Campos
            </a>
            <a
              href="https://github.com/lucasacioly"
              target="_blank"
              rel="noreferrer"
              style={{ color: '#fff' }}
            >
              Lucas Acioly
            </a>
            <a
              href="https://github.com/lucasgmelo"
              target="_blank"
              rel="noreferrer"
              style={{ color: '#fff' }}
            >
              Lucas Melo
            </a>
            <a
              href="https://github.com/Matheusfrej"
              target="_blank"
              rel="noreferrer"
              style={{ color: '#fff' }}
            >
              Matheus Frej
            </a>
            <a
              href="https://github.com/RodrigoMesel"
              target="_blank"
              rel="noreferrer"
              style={{ color: '#fff' }}
            >
              Rodrigo Mesel
            </a>
          </S.Devs>

          <S.Termo>
            <S.ConfigText>Inspirado no </S.ConfigText>
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
