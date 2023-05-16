import { FaPlus } from 'react-icons/fa';
import { insertAfterCell, useAppDispatch } from '../store';
import './styles/AddCell.css';

interface AddCellProps {
  previousCellId: string | null;
  forcedVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ previousCellId, forcedVisible }) => {
  const dispatch = useAppDispatch();
  // const isVisibleClass = forcedVisible ? 'visible' : '';
  return (
    <div className={`add-cell ${forcedVisible && 'visible'}`}>
      <div className='add-buttons'>
        <button
          className='button is-primary is-rounded is-small'
          onClick={() =>
            dispatch(insertAfterCell({ id: previousCellId, type: 'code' }))
          }
        >
          <span className='icon is-small'>
            <FaPlus />
          </span>
          <span>Code</span>
        </button>
        <button
          className='button is-primary is-rounded is-small'
          onClick={() =>
            dispatch(insertAfterCell({ id: previousCellId, type: 'markdown' }))
          }
        >
          <span className='icon is-small'>
            <FaPlus />
          </span>
          <span>Text</span>
        </button>
      </div>
      <div className='divider'></div>
    </div>
  );
};
export default AddCell;
