// import CodeEditor from './CodeEditor';
import { Cell } from '../store';
import TextEditor from './TextEditor';
interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  return (
    <div>
      {cell.id}
      {/* <CodeEditor initialValue='// Write Code Here' onChange={}/> */}
    </div>
  );
};
export default CellListItem;
