import { Link } from 'react-router-dom';
import { ThemeConsumer } from '../contexts/theme';

export default function NotFound() {
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <div className={`not-found ${theme}`}>
          <h3>404 Error</h3>
          <p>Page not Found</p>
          <Link to='/'>Go back to home</Link>
        </div>
      )}
    </ThemeConsumer>
  );
}
