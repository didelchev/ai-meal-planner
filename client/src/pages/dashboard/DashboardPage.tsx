import './DashboardPage.css';
import Navbar from '../../components/navbar/Navbar';
import { Flame, Beef, Wheat, Droplets, UtensilsCrossed} from 'lucide-react';
import { useAuthContext } from '../../contexts/AuthContext';
import { useGetProfile } from '../../hooks/useProfile';

const DashboardPage = () => {

const userData = useAuthContext();

const { userProfile } = useGetProfile();

  return (
    <>
      <Navbar />
      <div className='dashboard-container'>

        {/* WELCOME */}
        <div className='dashboard-welcome'>
          <h1>Welcome back, <span>{userData.user?.username}</span></h1>
          <p>Here's your nutrition overview for today</p>
        </div>

        {/* MACRO TARGETS */}
        <div className='macro-targets'>
          <div className='macro-card'>
            <div className='macro-icon calories'>
              <Flame size={20} />
            </div>
            <div className='macro-info'>
              <span className='macro-value'>{userProfile?.macros.calories}</span>
              <span className='macro-label'>Calories</span>
            </div>
          </div>
          <div className='macro-card'>
            <div className='macro-icon protein'>
              <Beef size={20} />
            </div>
            <div className='macro-info'>
              <span className='macro-value'>{userProfile?.macros.proteinG}</span>
              <span className='macro-label'>Protein</span>
            </div>
          </div>
          <div className='macro-card'>
            <div className='macro-icon carbs'>
              <Wheat size={20} />
            </div>
            <div className='macro-info'>
              <span className='macro-value'>{userProfile?.macros.carbsG}</span>
              <span className='macro-label'>Carbs</span>
            </div>
          </div>
          <div className='macro-card'>
            <div className='macro-icon fat'>
              <Droplets size={20} />
            </div>
            <div className='macro-info'>
              <span className='macro-value'>{userProfile?.macros.fatG}</span>
              <span className='macro-label'>Fat</span>
            </div>
          </div>
        </div>

        {/* MEAL PLAN SECTION */}
        <div className='dashboard-section'>
          <div className='dashboard-section-header'>
            <h2>Your Meal Plan</h2>
            <button className='btn-generate'>Generate New Plan</button>
          </div>

          {/* EMPTY STATE */}
          <div className='empty-state'>
            <div className='empty-state-icon'>
              <UtensilsCrossed size={36} />
            </div>
            <h3>No meal plan yet</h3>
            <p>Generate your first AI powered meal plan based on your macro targets</p>
            <button className='btn-generate-main'>Generate My First Meal Plan</button>
          </div>
        </div>

      </div>
    </>
  );
};

export default DashboardPage;