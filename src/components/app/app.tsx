import {FC} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import PrivateRoute from '../private-route/private-route.tsx';

import MainPage from '../../pages/main';
import Login from '../../pages/login';
import Favorites from '../../pages/favorites';
import OfferPage from '../../pages/offer';
import NotFound from '../../pages/not-found';

import {OfferShort} from '../../types/offer.ts';

interface AppProps {
  offers: OfferShort[];
}

const App: FC<AppProps> = ({offers}) => (
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <Routes>
      <Route path="/" element={<MainPage/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route
        path="/favorites"
        element={
          <PrivateRoute>
            <Favorites/>
          </PrivateRoute>
        }
      />
      <Route path="/offer/:id" element={<OfferPage offers={offers}/>}/>

      <Route path="*" element={<NotFound/>}/>
    </Routes>
  </BrowserRouter>
);

export default App;
