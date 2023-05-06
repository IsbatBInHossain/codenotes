import React from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import './Resizable.css';

interface ResizableComponentProps {
  direction: 'horizontal' | 'vertical';
}
type CombinedProps = ResizableBoxProps & ResizableComponentProps;

const ResizableComponent: React.FC<CombinedProps> = ({
  direction,
  children,
}) => {
  return (
    <ResizableBox height={300} width={Infinity} resizeHandles={['s']}>
      {children}
    </ResizableBox>
  );
};

export default ResizableComponent;
