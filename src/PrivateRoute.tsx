import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const decodeToken = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload).user;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

interface PrivateRouteProps {
  children: ReactNode;
  role: 'superadmin' | 'coach';
}

const PrivateRoute = ({ children, role }: PrivateRouteProps) => {
  const token = Cookies.get('token');
  let userRole = 'user';

  if (token) {
    const user = decodeToken(token);
    if (user) userRole = user.role;
  }

  if (userRole === role) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
