import React from 'react';
import debounce from 'lodash.debounce';

function useWindowSize() {

const [widthWindow, setWidthWindow] = React.useState(window.innerWidth);

const handleResize = debounce(() => {
    setWidthWindow(window.innerWidth);
  }, 100);

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);
return widthWindow;
}

export default useWindowSize;