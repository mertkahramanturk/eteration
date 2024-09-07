import { useCallback } from 'react';

const useSlugify = () => {
  const slugify = useCallback((text) => {
    return text
      .toLowerCase() 
      .replace(/[^a-z0-9]+/g, '-') 
      .replace(/^-+|-+$/g, '');
  }, []);

  return slugify;
};

export default useSlugify;
