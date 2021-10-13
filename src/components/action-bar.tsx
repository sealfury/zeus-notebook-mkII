import { useActions } from '../hooks'
import { ActionButton } from './'

interface ActionBarProps {
  id: string
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions()

  return (
    <div>
      <ActionButton
        onClick={() => moveCell(id, 'up')}
        className='fas fa-arrow-up'
      />
      <ActionButton
        onClick={() => moveCell(id, 'down')}
        className='fas fa-arrow-down'
      />
      <ActionButton
        onClick={() => deleteCell(id)}
        className='far fa-trash-alt'
      />
    </div>
  )
}

export default ActionBar
