export enum charStatus {
  CORRECT, // 0
  WRONG_POSITION, // 1
  NOT_IN_WORD // 2
}

export interface userTriesTypes {
  currRow: number
  currTry: Array<string | null>
  solution: string
  solutionArray: string[]
  won: boolean | null
  tries: Array<Array<string> | null>
  triesFeedback: Array<Array<charStatus>>
}
