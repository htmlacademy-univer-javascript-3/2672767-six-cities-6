import {FC, ReactElement} from 'react';
import {Navigate} from 'react-router-dom';

type PrivateRouteProps = {
  children: ReactElement;
};

const PrivateRoute: FC<PrivateRouteProps> = ({children}) => {
  const isAuth = false;

  return (isAuth ? children : <Navigate to="/login" replace/>);
};

export default PrivateRoute;
