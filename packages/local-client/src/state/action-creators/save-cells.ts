import { Dispatch } from 'redux'
import axios from 'axios'

import { RootState } from '../reducers'
import { Action } from '../actions'
import { ActionType } from '../action-types'

export const saveCells = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const {
      cells: { data, order },
    } = getState()

    // combine data & order props into Cell[]
    const cells = order.map(id => data[id])

    try {
      await axios.post('/cells', { cells })
    } catch (err: any) {
      dispatch({
        type: ActionType.SAVE_CELLS_ERROR,
        payload: err.message,
      })
    }
  }
}
