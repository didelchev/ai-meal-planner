import { Link } from 'react-router-dom';
import './Footer.css';
import { useAuthContext } from '../../contexts/AuthContext';

const Footer = () => {
  const { isAuthenticated } = useAuthContext();

  return (
    <footer className='footer'>
      <div className='footer-container'>

        <div className='footer-brand'>
          <Link to='/' className='footer-logo'>MyApp</Link>
          <p>Personalized AI meal plans built around your goals, your taste, and your life.</p>
          <div className='footer-social'>
            <a href='https://github.com/didelchev' target='_blank' rel='noopener noreferrer'>GitHub</a>
            <a href='https://www.linkedin.com/in/daniel-delchev-7b547a279/' target='_blank' rel='noopener noreferrer'>LinkedIn</a>
          </div>
        </div>

        <div className='footer-links'>
          <h4>Navigate</h4>
          <ul>
            <li><a href='#how-it-works'>How it works</a></li>
            <li><a href='#features'>Features</a></li>
            <li><a href='#stats'>Results</a></li>
            {isAuthenticated ? (
              <li><Link to='/dashboard'>Dashboard</Link></li>
            ) : (
              <>
                <li><Link to='/login'>Login</Link></li>
                <li><Link to='/register'>Register</Link></li>
              </>
            )}
          </ul>
        </div>

      </div>

      <div className='footer-bottom'>
        <p>© 2025 MyApp. All rights reserved.</p>
        <p>Built with React & Node.js</p>
      </div>
    </footer>
  );
};

export default Footer;