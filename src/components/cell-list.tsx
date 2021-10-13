import { CellListItem } from './'
import { useTypedSelector } from '../hooks'

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) => {
    return order.map(id => data[id])
  })

  const renderedCells = cells.map(cell => (
    <CellListItem key={cell.id} cell={cell} />
  ))

  return <div>{renderedCells}</div>
}

export default CellList
