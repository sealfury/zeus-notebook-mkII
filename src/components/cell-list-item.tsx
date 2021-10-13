import { Cell } from '../state'
import { CodeCell, TextEditor } from './'

interface CellListItemProps {
  cell: Cell
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let child: JSX.Element
  if (cell.type === 'code') {
    child = <CodeCell cell={cell} />
  } else {
    child = <TextEditor cell={cell} />
  }

  return <div>{child}</div>
}

export default CellListItem
