interface ActionButtonProps {
  onClick: () => void
  className: string
}

const ActionButton: React.FC<ActionButtonProps> = ({ onClick, className }) => {
  return (
    <button className='button is-primary is-small' onClick={onClick}>
      <span className='icon'>
        <i className={className}></i>
      </span>
    </button>
  )
}

export default ActionButton
