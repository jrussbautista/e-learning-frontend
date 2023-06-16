import { useEffect } from 'react';

function Prompt() {
  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = '';
      return '';
    };

    window.addEventListener('beforeunload', unloadCallback);
    return () => {
      window.addEventListener('popstate', () => console.log('hello'));
      window.removeEventListener('beforeunload', unloadCallback);
    };
  }, []);
  return null;
}

export default Prompt;
