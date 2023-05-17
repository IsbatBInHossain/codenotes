import React, { useEffect, useState } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import './styles/Resizable.css';

interface ResizableComponentProps {
  direction: 'horizontal' | 'vertical';
  children: React.ReactNode;
}

const ResizableComponent: React.FC<ResizableComponentProps> = ({
  direction,
  children,
}) => {
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(window.innerWidth * 0.75);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const handleResize = () => {
      if (timer) {
        clearInterval(timer);
      }
      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        if (window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.75);
        }
      }, 100);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [width]);

  let resizableProps: ResizableBoxProps;

  if (direction === 'vertical') {
    resizableProps = {
      minConstraints: [Infinity, 30],
      maxConstraints: [Infinity, innerHeight * 0.9],
      height: 300,
      width: Infinity,
      resizeHandles: ['s'],
    };
  } else {
    resizableProps = {
      className: 'resizable-horizontal',
      minConstraints: [innerWidth * 0.2, Infinity],
      maxConstraints: [innerWidth * 0.75, Infinity],
      height: Infinity,
      width: width,
      resizeHandles: ['e'],
      onResizeStop: (_event, data) => {
        setWidth(data.size.width);
      },
    };
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default ResizableComponent;
