import { useContext } from 'react';
import { AuthContext } from 'src/contexts/auth/firebase/auth-context';

export const useAuth = () => useContext(AuthContext);
