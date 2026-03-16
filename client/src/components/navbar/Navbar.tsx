import { Link } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import './Navbar.css';
import { useLogout } from '../../hooks/useAuth';

const Navbar = () => {
  const { isAuthenticated } = useAuthContext();
  const logout = useLogout();
  const isHomePage = location.pathname === "/"

  return (
    <nav className='navbar'>
      <div className='navbar-container'>

        <Link to='/' className='navbar-logo'>
          MyApp
        </Link>

        <div className='navbar-links'>
          {isHomePage && (
          <>
            <Link to="/#how-it-works">How it works</Link>
            <a href='#features'>Features</a>
            <a href='#stats'>Results</a>
          </>
          
          )}
          
        </div>

        <div className='navbar-auth'>
          {isAuthenticated ? (
            <>
              <Link to='/dashboard' className='btn-ghost'>Dashboard</Link>
              <Link to='/onboarding' className='btn-ghost'>Onboarding</Link>
              <Link to='/profile' className='btn-ghost'>Profile</Link>
              <button onClick={logout} className='btn-logout'>Logout</button>
            </>
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