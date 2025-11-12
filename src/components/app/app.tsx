import {FC} from 'react';
import MainPage from '../../pages/main.tsx';
import Offer from '../../types/offer.tsx';


interface AppProps {
  offers: Offer[];
}

const App: FC<AppProps> = ({offers}) => (
  <MainPage offers={offers}/>
);

export default App;
