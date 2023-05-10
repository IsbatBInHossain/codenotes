import { useAppSelector } from '../store';
import CellListItem from './CellListItem';

const CellList: React.FC = () => {
  const cellOrder = useAppSelector(({ order, data }) =>
    order.map(id => data[id])
  );
  const renderedCell = cellOrder.map(cell => (
    <CellListItem key={cell.id} cell={cell} />
  ));

  return <div>{renderedCell}</div>;
};
export default CellList;
