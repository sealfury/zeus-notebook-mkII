import { useTypedSelector } from './use-typed-selector'

export const useCumulativeCode = (cellId: string) => {
  // get code from current cell and all previous cells
  return useTypedSelector(state => {
    const { data, order } = state.cells
    const orderedCells = order.map(id => data[id])

    /*
     * checks to show complex objects -> jsx elements -> React Components
     * prevents import name collisions b/w show() & user imports
     * 'var' to allow for multiple calls to fn or no-op
     */
    const showFn = `
      import _React from 'react'
      import _ReactDOM from 'react-dom'

      var show = (value) => {
        const root = document.querySelector('#root')

        if (typeof  value === 'object') {
          if (value.$$typeof && value.props) {
            _ReactDOM.render(value, root)
          } else {
            root.innerHTML = JSON.stringify(value)
          }
        } else {
          root.innerHTML = value
        }
      }
    `
    const showFnNoOp = 'var show = () => {}'
    /*
     * create array of code cells excluding current cell
     * with functionality to render user code in preview window
     */
    const cumulative = []
    for (let c of orderedCells) {
      if (c.type === 'code') {
        // only execute show() in cell it was invoked
        if (c.id === cellId) {
          cumulative.push(showFn)
        } else {
          cumulative.push(showFnNoOp)
        }
        cumulative.push(c.content)
      }
      if (c.id === cellId) {
        break
      }
    }
    return cumulative
  }).join('\n')
}
