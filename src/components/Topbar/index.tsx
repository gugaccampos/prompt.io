import { FC, useState } from 'react'
import { Logo } from './logo'
import * as S from './styles'
import { useTries } from 'contexts/TriesContext'
import { Key } from 'components/Key'

export const Topbar: FC = () => {
  const { prompts, level, setLevel } = useTries()
  const [isOpen, setIsOpen] = useState(false)
  // const hasNewPrompt = prompts[level + 1] !== undefined

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
      <S.TutorialButton onClick={() => setIsOpen(true)}>?</S.TutorialButton>
      <S.NextButton
        // disabled={!hasNewPrompt}
        onClick={nextLevel}
      >
        PRÓXIMO
      </S.NextButton>
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
            <Key content={'A'} color={'#3AA394'} />
            <Key content={'M'} color={'#817C99'} />
            <Key content={'I'} color={'#817C99'} />
            <Key content={'G'} color={'#817C99'} />
            <Key content={'O'} color={'#817C99'} />
          </S.TutorialExamples>

          <S.TutorialExamplesText>
            <Key content={'A'} color={'#3AA394'} />
            <S.TutorialText>
              Significa que essa letra pertence à palavra e está na posição
              correta
            </S.TutorialText>
          </S.TutorialExamplesText>

          <S.TutorialExamples>
            <Key content={'C'} color={'#817C99'} />
            <Key content={'A'} color={'#817C99'} />
            <Key content={'R'} color={'#EEC272'} />
            <Key content={'R'} color={'#817C99'} />
            <Key content={'O'} color={'#817C99'} />
          </S.TutorialExamples>

          <S.TutorialExamplesText>
            <Key content={'R'} color={'#EEC272'} />
            <S.TutorialText>
              Significa que essa letra pertence à palavra mas em outra posição
            </S.TutorialText>
          </S.TutorialExamplesText>

          <S.TutorialExamples>
            <Key content={'V'} color={'#817C99'} />
            <Key content={'A'} color={'#817C99'} />
            <Key content={'S'} color={'#817C99'} />
            <Key content={'C'} color={'opacity'} />
            <Key content={'O'} color={'#817C99'} />
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
    </S.Container>
  )
}
