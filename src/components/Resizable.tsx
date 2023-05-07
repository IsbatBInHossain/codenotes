import React from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import './Resizable.css';

interface ResizableComponentProps {
  direction: 'horizontal' | 'vertical';
  children: React.ReactNode;
  // width: number;
  // height: number;
}
// type CombinedProps = ResizableBoxProps & ResizableComponentProps;

const ResizableComponent: React.FC<ResizableComponentProps> = ({
  direction,
  children,
}) => {
  let resizableProps: ResizableBoxProps;
  if (direction === 'vertical') {
    resizableProps = {
      minConstraints: [Infinity, 30],
      maxConstraints: [Infinity, window.innerHeight * 0.9],
      height: 300,
      width: Infinity,
      resizeHandles: ['s'],
    };
  } else {
    resizableProps = {
      className: 'resizable-horizontal',
      minConstraints: [window.innerWidth * 0.2, Infinity],
      maxConstraints: [window.innerWidth * 0.75, Infinity],
      height: Infinity,
      width: window.innerWidth * 0.75,
      resizeHandles: ['e'],
    };
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default ResizableComponent;
