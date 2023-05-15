import { deleteCell, moveCell, useAppDispatch } from '../store';
import { FaChevronUp, FaChevronDown, FaTimes } from 'react-icons/fa';
import './styles/ActionBar.css';

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  return (
    <div className='action-bar'>
      <button
        className='button is-primary is-small'
        onClick={() => dispatch(moveCell({ id, direction: 'up' }))}
      >
        <span className='icon'>
          <FaChevronUp />
        </span>
      </button>
      <button
        className='button is-primary is-small'
        onClick={() => dispatch(moveCell({ id, direction: 'down' }))}
      >
        <span className='icon'>
          <FaChevronDown />
        </span>
      </button>
      <button
        className='button is-primary is-small'
        onClick={() => dispatch(deleteCell({ id }))}
      >
        <span className='icon'>
          <FaTimes />
        </span>
      </button>
    </div>
  );
};
export default ActionBar;
