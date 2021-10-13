import { useTypedSelector } from '../hooks'

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) => {
    return order.map(id => data[id])
  })

  return <div>Cell List</div>
}

export default CellList
