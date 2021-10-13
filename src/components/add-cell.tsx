import './add-cell.css'
import { useActions } from '../hooks'
import { AddCellButton } from './'

interface AddCellProps {
  nextCellId: string | null
  forceVisible?: boolean
}

const AddCell: React.FC<AddCellProps> = ({ nextCellId, forceVisible }) => {
  const { insertCellBefore } = useActions()

  return (
    <div className={`add-cell ${forceVisible && 'force-visible'}`}>
      <div className='add-buttons'>
        <AddCellButton
          onClick={() => insertCellBefore(nextCellId, 'code')}
          type='Code'
        />
        <AddCellButton
          onClick={() => insertCellBefore(nextCellId, 'text')}
          type='Text'
        />
      </div>
      <div className='divider'></div>
    </div>
  )
}

export default AddCell
