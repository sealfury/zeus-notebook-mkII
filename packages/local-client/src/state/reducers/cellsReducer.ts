import produce from 'immer'

import { ActionType } from '../action-types'
import { Action } from '../actions'
import { Cell, randomId } from '../cell'

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
      // error posting to '/cells'
      case ActionType.SAVE_CELLS_ERROR:
        state.error = action.payload

        return state
      // set loading to true
      case ActionType.FETCH_CELLS:
        state.loading = true
        state.error = null

        return state
      // define order/data props on CellState with API res
      case ActionType.FETCH_CELLS_COMPLETE:
        state.order = action.payload.map(cell => cell.id)
        state.data = action.payload.reduce((acc, cell) => {
          acc[cell.id] = cell
          return acc
        }, {} as CellState['data'])

        return state
      // error during loading process
      case ActionType.FETCH_CELLS_ERROR:
        state.loading = false
        state.error = action.payload

        return state
      // move current cell up or down
      case ActionType.MOVE_CELL:
        const { direction } = action.payload
        const index = state.order.findIndex(id => id === action.payload.id)
        const targetIndex = direction === 'up' ? index - 1 : index + 1

        if (targetIndex < 0 || targetIndex > state.order.length - 1) {
          return state
        }

        state.order[index] = state.order[targetIndex]
        state.order[targetIndex] = action.payload.id

        return state
      // delete current cell
      case ActionType.DELETE_CELL:
        delete state.data[action.payload]
        state.order = state.order.filter(id => id !== action.payload)

        return state
      // Insert cell after current cell
      case ActionType.INSERT_CELL_AFTER:
        const cell: Cell = {
          id: randomId(),
          type: action.payload.type,
          content: '',
        }

        state.data[cell.id] = cell

        const foundIndex = state.order.findIndex(id => id === action.payload.id)

        if (foundIndex < 0) {
          // add cell id to beginning of array
          state.order.unshift(cell.id)
        } else {
          // insert cell by id after
          state.order.splice(foundIndex + 1, 0, cell.id)
        }

        return state
      // update content of current cell
      case ActionType.UPDATE_CELL:
        const { id, content } = action.payload

        state.data[id].content = content

        return state
      // fall-thru
      default:
        return state
    }
  },
  initialState
)

export default reducer
