export type CellTypes = 'code' | 'text'

export interface Cell {
  id: string
  type: CellTypes
  content: string
}

export const randomId = () => {
  return Math.random().toString(36).substring(2, 7)
}
