import { Fragment } from 'react';
import { useAppSelector } from '../store';
import AddCell from './AddCell';
import CellListItem from './CellListItem';
import './styles/CellList.css';

const CellList: React.FC = () => {
  const cellOrder = useAppSelector(({ order, data }) =>
    order.map(id => data[id])
  );
  const renderedCell = cellOrder.map(cell => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div className='cell-list'>
      <AddCell previousCellId={null} forcedVisible={cellOrder.length === 0} />
      {renderedCell}
    </div>
  );
};
export default CellList;
