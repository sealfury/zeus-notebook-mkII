import produce from 'immer'

import { ActionType } from '../action-types'
import { Action } from '../actions'
import { Cell } from '../cell'

interface CellState {
  loading: boolean
  error: string | null
  order: string[]
  data: {
    [key: string]: Cell
  }
}

const initialState: CellState = {
  loading: false,
  error: null,
  order: [],
  data: {},
}

const reducer = produce(
  (state: CellState = initialState, action: Action): CellState | void => {
    switch (action.type) {
      case ActionType.MOVE_CELL:
        return state
      case ActionType.DELETE_CELL:
        return state
      case ActionType.INSERT_CELL_BEFORE:
        return state
      case ActionType.UPDATE_CELL:
        const { id, content } = action.payload

        state.data[id].content = content
        return
      default:
        return state
    }
  }
)

export default reducer
