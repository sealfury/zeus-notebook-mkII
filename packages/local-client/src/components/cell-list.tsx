import './cell-list.css'
import { Fragment, useEffect } from 'react'

import { CellListItem, AddCell } from './'
import { useTypedSelector, useActions } from '../hooks'

const CellList: React.FC = () => {
  // refactoring this to implicit returns seemed to break something
  // but it's always worth another try after 1st stable deploy
  const cells = useTypedSelector(({ cells: { order, data } }) => {
    return order.map(id => {
      return data[id]
    })
  })

  const { fetchCells } = useActions()

  useEffect(() => {
    fetchCells()
    // eslint-disable-next-line
  }, [])

  const renderedCells = cells.map(cell => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell prevCellId={cell.id} />
    </Fragment>
  ))

  return (
    <div className='cell-list'>
      <AddCell forceVisible={cells.length === 0} prevCellId={null} />
      {renderedCells}
    </div>
  )
}

export default CellList
