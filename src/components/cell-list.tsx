import { Fragment } from 'react'
import { CellListItem, AddCell } from './'
import { useTypedSelector } from '../hooks'

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) => {
    return order.map(id => {
      return data[id]
    })
  })

  const renderedCells = cells.map(cell => (
    <Fragment key={cell.id}>
      <AddCell nextCellId={cell.id} />
      <CellListItem cell={cell} />
    </Fragment>
  ))

  return (
    <div>
      {renderedCells}
      <AddCell nextCellId={null} />
    </div>
  )
}

export default CellList
