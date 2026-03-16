import { Link } from 'react-router-dom';
import './Navbar.css';
import { useAuthContext } from '../../contexts/AuthContext';

const Navbar = () => {
  const { isAuthenticated } = useAuthContext();

  return (
    <nav className='navbar'>
      <div className='navbar-container'>

        <Link to='/' className='navbar-logo'>
          MyApp
        </Link>

        <div className='navbar-links'>
          <a href='#how-it-works'>How it works</a>
          <a href='#features'>Features</a>
          <a href='#preview'>Preview</a>
        </div>

        <div className='navbar-auth'>
          {isAuthenticated ? (
            <Link to='/dashboard' className='btn-primary'>Go to Dashboard</Link>
          ) : (
            <>
              <Link to='/login' className='btn-ghost'>Login</Link>
              <Link to='/register' className='btn-primary'>Get Started</Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;