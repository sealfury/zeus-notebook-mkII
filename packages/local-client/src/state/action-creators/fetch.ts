import { Dispatch } from 'redux'
import axios from 'axios'

import { ActionType } from '../action-types'
import { Action } from '../actions'
import { Cell, CellTypes } from '../'

export const fetchCells = () => {
  return async (dispatch: Dispatch<Action>) => {
    // flip 'loading' flag to 'true'
    dispatch({ type: ActionType.FETCH_CELLS })

    try {
      const { data }: { data: Cell[] } = await axios.get('/cells')

      dispatch({
        type: ActionType.FETCH_CELLS_COMPLETE,
        payload: data,
      })
    } catch (err: any) {
      dispatch({
        type: ActionType.FETCH_CELLS_ERROR,
        payload: err.message,
      })
    }
  }
}
