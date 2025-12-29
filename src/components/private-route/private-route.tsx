import {FC, ReactElement} from 'react';
import {Navigate} from 'react-router-dom';
import {useAppSelector} from '../../hooks';
import {selectAuthorizationStatus} from '../../store/selectors';
import {AuthorizationStatus} from '../../const/auth.ts';
import Spinner from '../spinner/spinner.tsx';

type PrivateRouteProps = {
  children: ReactElement;
};

const PrivateRoute: FC<PrivateRouteProps> = ({children}) => {
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <Spinner/>;
  }

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to="/login" replace/>
  );
};

export default PrivateRoute;
