import {Link} from 'react-router-dom';

export default function NotFound(): JSX.Element {
  return (
    <main className="page__main page__main--not-found">
      <div className="container" style={{paddingTop: 60, paddingBottom: 60}}>
        <h1 style={{fontSize: 42}}>404 Not Found</h1>
        <p>
          Такой страницы не существует.
        </p>
        <Link to="/" style={{color: '#4481c3', textDecoration: 'underline'}}>
          Перейти на главную
        </Link>
      </div>
    </main>
  );
}
