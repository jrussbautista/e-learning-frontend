import { useEffect } from 'react';
import useAuthStore from './store/useAuthStore';
import authUtils, { removeAuth } from './utils/authUtils';
import AppRouting from './AppRouting';

function App() {
  const { getCurrentUser, isLoading, setIsLoading } = useAuthStore(
    (state) => state
  );

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        await getCurrentUser();
      } catch (error) {
        removeAuth();
      }
    };
    const accessToken = authUtils.getAccessTokenLocalStorage();
    if (accessToken) {
      fetchCurrentUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return null; // TODO: add app skeleton
  }

  return <AppRouting />;
}

export default App;
