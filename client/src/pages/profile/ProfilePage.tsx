import { useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import { TrendingDown, Minus, TrendingUp, Flame, Beef, Wheat, Droplets } from 'lucide-react';
import './ProfilePage.css';
import { useGetProfile } from '../../hooks/useProfile';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<'stats' | 'goal' | 'preferences'>('stats');


  const { userProfile } = useGetProfile();


  return (
    <>
      <Navbar />
      <div className='profile-container'>

        <div className='profile-header'>
          <h1>Your Profile</h1>
          <p>Update your details to keep your meal plan accurate</p>
        </div>

        {/* MACRO SUMMARY */}
        <div className='profile-macros'>
          <div className='profile-macro-item'>
            <div className='profile-macro-icon calories'>
              <Flame size={16} />
            </div>
            <div>
              <span className='profile-macro-value'>{userProfile?.macros.calories}</span>
              <span className='profile-macro-label'>kcal / day</span>
            </div>
          </div>
          <div className='profile-macro-item'>
            <div className='profile-macro-icon protein'>
              <Beef size={16} />
            </div>
            <div>
              <span className='profile-macro-value'>{userProfile?.macros.proteinG}g</span>
              <span className='profile-macro-label'>Protein</span>
            </div>
          </div>
          <div className='profile-macro-item'>
            <div className='profile-macro-icon carbs'>
              <Wheat size={16} />
            </div>
            <div>
              <span className='profile-macro-value'>{userProfile?.macros.carbsG}g</span>
              <span className='profile-macro-label'>Carbs</span>
            </div>
          </div>
          <div className='profile-macro-item'>
            <div className='profile-macro-icon fat'>
              <Droplets size={16} />
            </div>
            <div>
              <span className='profile-macro-value'>{userProfile?.macros.fatG}g</span>
              <span className='profile-macro-label'>Fat</span>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className='profile-card'>
          <div className='profile-tabs'>
            <button
              className={`profile-tab ${activeTab === 'stats' ? 'active' : ''}`}
              onClick={() => setActiveTab('stats')}
            >
              Stats
            </button>
            <button
              className={`profile-tab ${activeTab === 'goal' ? 'active' : ''}`}
              onClick={() => setActiveTab('goal')}
            >
              Goal & Activity
            </button>
            <button
              className={`profile-tab ${activeTab === 'preferences' ? 'active' : ''}`}
              onClick={() => setActiveTab('preferences')}
            >
              Preferences
            </button>
          </div>

          <div className='profile-tab-content'>

            {/* STATS TAB */}
            {activeTab === 'stats' && (
              <div className='tab-panel'>
                <div className='form-row'>
                  <div className='form-group'>
                    <label htmlFor='age'>Age</label>
                    <div className='input-with-unit'>
                      <input id='age' name='age' type='number' placeholder='25' />
                      <span className='unit'>years</span>
                    </div>
                  </div>
                  <div className='form-group'>
                    <label htmlFor='weightKg'>Weight</label>
                    <div className='input-with-unit'>
                      <input id='weightKg' name='weightKg' type='number' placeholder='70' />
                      <span className='unit'>kg</span>
                    </div>
                  </div>
                  <div className='form-group'>
                    <label htmlFor='heightCm'>Height</label>
                    <div className='input-with-unit'>
                      <input id='heightCm' name='heightCm' type='number' placeholder='175' />
                      <span className='unit'>cm</span>
                    </div>
                  </div>
                </div>

                <div className='form-group'>
                  <label>Sex</label>
                  <div className='sex-cards'>
                    <div className='sex-card active'>
                      <span>Male</span>
                    </div>
                    <div className='sex-card'>
                      <span>Female</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* GOAL TAB */}
            {activeTab === 'goal' && (
              <div className='tab-panel'>
                <div className='form-group'>
                  <label>Your goal</label>
                  <div className='goal-cards'>
                    <div className='goal-card active'>
                      <div className='goal-card-icon'>
                        <TrendingDown size={22} />
                      </div>
                      <h4>Lose weight</h4>
                      <p>Reduce body fat while preserving muscle</p>
                    </div>
                    <div className='goal-card'>
                      <div className='goal-card-icon'>
                        <Minus size={22} />
                      </div>
                      <h4>Maintain weight</h4>
                      <p>Keep current weight and improve composition</p>
                    </div>
                    <div className='goal-card'>
                      <div className='goal-card-icon'>
                        <TrendingUp size={22} />
                      </div>
                      <h4>Build muscle</h4>
                      <p>Increase muscle mass with a calorie surplus</p>
                    </div>
                  </div>
                </div>

                <div className='form-group'>
                  <label>Activity level</label>
                  <div className='activity-cards'>
                    <div className='activity-card active'>
                      <span className='activity-name'>Sedentary</span>
                      <span className='activity-desc'>Little or no exercise</span>
                    </div>
                    <div className='activity-card'>
                      <span className='activity-name'>Light</span>
                      <span className='activity-desc'>1-3 days/week</span>
                    </div>
                    <div className='activity-card'>
                      <span className='activity-name'>Moderate</span>
                      <span className='activity-desc'>3-5 days/week</span>
                    </div>
                    <div className='activity-card'>
                      <span className='activity-name'>Active</span>
                      <span className='activity-desc'>6-7 days/week</span>
                    </div>
                    <div className='activity-card'>
                      <span className='activity-name'>Very Active</span>
                      <span className='activity-desc'>Intense daily</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PREFERENCES TAB */}
            {activeTab === 'preferences' && (
              <div className='tab-panel'>
                <div className='form-group'>
                  <label>Dietary restrictions</label>
                  <div className='checkbox-group'>
                    <label className='checkbox-item'>
                      <input type='checkbox' name='dietaryRestrictions' value='vegetarian' />
                      <span>Vegetarian</span>
                    </label>
                    <label className='checkbox-item'>
                      <input type='checkbox' name='dietaryRestrictions' value='vegan' />
                      <span>Vegan</span>
                    </label>
                    <label className='checkbox-item'>
                      <input type='checkbox' name='dietaryRestrictions' value='gluten-free' />
                      <span>Gluten Free</span>
                    </label>
                    <label className='checkbox-item'>
                      <input type='checkbox' name='dietaryRestrictions' value='dairy-free' />
                      <span>Dairy Free</span>
                    </label>
                    <label className='checkbox-item'>
                      <input type='checkbox' name='dietaryRestrictions' value='halal' />
                      <span>Halal</span>
                    </label>
                  </div>
                </div>

                <div className='form-group'>
                  <label htmlFor='foodDislikes'>Food dislikes</label>
                  <input
                    id='foodDislikes'
                    name='foodDislikes'
                    type='text'
                    placeholder='e.g. mushrooms, shellfish, spicy food'
                  />
                  <span className='input-hint'>Separate items with a comma</span>
                </div>

                <div className='form-group'>
                  <label>Meals per day</label>
                  <div className='meals-cards'>
                    <div className='meals-card active'>
                      <span className='meals-number'>3</span>
                      <span className='meals-label'>Meals</span>
                    </div>
                    <div className='meals-card'>
                      <span className='meals-number'>3+</span>
                      <span className='meals-label'>Meals + Snacks</span>
                    </div>
                    <div className='meals-card'>
                      <span className='meals-number'>5</span>
                      <span className='meals-label'>Small Meals</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          <div className='profile-form-footer'>
            <button className='btn-save'>Save Changes</button>
          </div>
        </div>

      </div>
    </>
  );
};

export default ProfilePage;