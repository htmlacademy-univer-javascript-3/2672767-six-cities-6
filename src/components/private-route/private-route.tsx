import {FC, ReactElement} from 'react';
import {Navigate} from 'react-router-dom';

type PrivateRouteProps = {
  children: ReactElement;
};

const PrivateRoute: FC<PrivateRouteProps> = ({children}) => {
  const isAuth = true;

  return (isAuth ? children : <Navigate to="/login" replace/>);
};

export default PrivateRoute;
