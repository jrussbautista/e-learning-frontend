import { useEffect } from 'react';
import useAuthStore from './store/useAuthStore';
import authUtils, { removeAuth } from './utils/authUtils';
import AppRouting from './router';

function App() {
  const { getCurrentUser, logOut } = useAuthStore((state) => state);

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
      logOut();
    }
  }, []);

  return <AppRouting />;
}

export default App;
