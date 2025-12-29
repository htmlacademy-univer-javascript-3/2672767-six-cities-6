import {FC} from 'react';
import './spinner.css';

const Spinner: FC = () => (
  <div className="spinner" role="status" aria-live="polite" aria-busy="true">
    <div className="spinner__circle"/>
    <p className="spinner__text">Loading...</p>
  </div>
);

export default Spinner;
