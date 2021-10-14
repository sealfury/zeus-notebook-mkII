interface AddCellButtonProps {
  onClick: () => void
  type: string
}

const AddCellButton: React.FC<AddCellButtonProps> = ({ onClick, type }) => {
  return (
    <button className='button is-rounded is-primary is-small' onClick={onClick}>
      <span className='icon is-small'>
        <i className='fas fa-plus' />
      </span>
      <span>{type}</span>
    </button>
  )
}

export default AddCellButton
