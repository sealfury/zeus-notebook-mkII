import produce from 'immer'

import { ActionType } from '../action-types'
import { Action } from '../actions'

interface BundleState {
  [key: string]:
    | {
        loading: boolean // aka bundling/processing
        code: string
        err: string
      }
    | undefined // prevent type errors during page load
}

const initialState: BundleState = {}

const reducer = produce(
  (state: BundleState = initialState, action: Action): BundleState => {
    switch (action.type) {
      case ActionType.BUNDLE_START:
        // remove bundle data when processing a new bundle
        state[action.payload.cellId] = {
          loading: true,
          code: '',
          err: '',
        }
        return state
      case ActionType.BUNDLE_COMPLETE:
        state[action.payload.cellId] = {
          loading: false,
          code: action.payload.bundle.code,
          err: action.payload.bundle.err,
        }
        return state
      default:
        return state
    }
  },
  initialState
)

export default reducer
