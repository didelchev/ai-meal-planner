import { useForm } from '../../hooks/useForm';
import './OnboardingPage.css';
import { TrendingDown, Minus, TrendingUp } from 'lucide-react';
import type { ProfileBody } from '../../types/user.types';
import { useCreateProfile } from '../../hooks/useProfile';


const OnboardingPage = () => {

const createUserProfile = useCreateProfile();

const initialValues: ProfileBody = {
  age: 0,
  weightKg: 0,
  heightCm: 0,
  sex: 'male',
  activityLevel: 'sedentary',
  goal: 'maintain',
  dietaryRestrictions: [],
  foodDislikes: '',
  mealsPerDay: 3
}

const { formData, changeHandler, setField, submitHandler } = useForm<ProfileBody>(
  initialValues, 
  async (profileData ) => {
    await createUserProfile(profileData)
})


const handleDietaryRestrictions = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setField(
      'dietaryRestrictions',
      checked
        ? [...formData.dietaryRestrictions, value]
        : formData.dietaryRestrictions.filter(r => r !== value)
    );
  };

  return (
    <div className='onboarding-container'>
      <div className='onboarding-card'>

        <div className='onboarding-header'>
          <h1>Let's get you set up</h1>
          <p>Tell us about yourself so we can build your perfect meal plan</p>
        </div>

        <form className='onboarding-form' onSubmit={submitHandler}>
          {/* BASIC STATS */}
          <div className='form-section'>
            <h3>Basic stats</h3>
            <div className='form-row'>
              <div className='form-group'>
                <label htmlFor='age'>Age</label>
                <div className='input-with-unit'>
                  <input id='age' name='age' type='number' placeholder='25' value={formData?.age} onChange={changeHandler}/>
                  <span className='unit'>years</span>
                </div>
              </div>
              <div className='form-group'>
                <label htmlFor='weight'>Weight</label>
                <div className='input-with-unit'>
                  <input id='weight' name='weightKg' type='number' placeholder='70' value={formData?.weightKg} onChange={changeHandler}/>
                  <span className='unit'>kg</span>
                </div>
              </div>
              <div className='form-group'>
                <label htmlFor='height'>Height</label>
                <div className='input-with-unit'>
                  <input id='height' name='heightCm' type='number' placeholder='175' value={formData?.heightCm} onChange={changeHandler}/>
                  <span className='unit'>cm</span>
                </div>
              </div>
            </div>

            <div className='form-group'>
              <label>Sex</label>
              <div className='sex-cards'>
                {(["male", "female"] as const).map((sex) => (
                  <div 
                  key={sex}
                  className={`sex-card ${formData.sex === sex ? 'active' : ''}`}
                  onClick={() => setField('sex', sex)}
                  >
                  <span>{sex.charAt(0).toUpperCase() + sex.slice(1)}</span>
                  </div>
                ))

                }
              </div>
            </div>
          </div>

          {/* GOAL */}
          <div className='form-section'>
            <h3>What is your goal?</h3>
            <div className='goal-cards'>
              <div className={`goal-card ${formData.goal === 'lose' ? 'active' : ''}`} onClick={() => setField('goal', 'lose')}>
                <div className='goal-card-icon'>
                  <TrendingDown size={24} />
                </div>
                <h4>Lose weight</h4>
                <p>Reduce body fat while preserving muscle</p>
              </div>
              <div className={`goal-card ${formData.goal === 'maintain' ? 'active' : ''}`} onClick={() => setField('goal', 'maintain')}>
                <div className='goal-card-icon'>
                  <Minus size={24} />
                </div>
                <h4>Maintain weight</h4>
                <p>Keep current weight and improve composition</p>
              </div>
              <div className={`goal-card ${formData.goal === 'gain' ? 'active' : ''}`} onClick={() => setField('goal', 'gain')}>
                <div className='goal-card-icon'>
                  <TrendingUp size={24} />
                </div>
                <h4>Build muscle</h4>
                <p>Increase muscle mass with a calorie surplus</p>
              </div>
            </div>
          </div>

          {/* ACTIVITY */}
          <div className='form-section'>
            <h3>Activity level</h3>
            <div className="activity-cards">
                    {(["sedentary", "light", "moderate", "active", "very_active"] as const).map((level) => (
                      <div
                        key={level}
                        className={`activity-card ${formData.activityLevel === level ? "active" : ""}`}
                        onClick={() => setField('activityLevel', level as any )}
                      >
                        <span className="activity-name">{level.replace("_", " ")}</span>
                      </div>
                    ))}
                  </div>
          </div>

          {/* PREFERENCES */}
          <div className='form-section'>
            <h3>Preferences</h3>

            <div className='form-group'>
              <label>Dietary restrictions</label>
              <div className='checkbox-group'>
                <label className='checkbox-item'>
                  <input type='checkbox' name='dietaryRestrictions'  value='vegetarian' onChange={handleDietaryRestrictions}/>
                  <span>Vegetarian</span>
                </label>
                <label className='checkbox-item'>
                  <input type='checkbox' name='dietaryRestrictions'  value='vegan' onChange={handleDietaryRestrictions}/>
                  <span>Vegan</span>
                </label>
                <label className='checkbox-item'>
                  <input type='checkbox' name='dietaryRestrictions'  value='gluten-free' onChange={handleDietaryRestrictions}/>
                  <span>Gluten Free</span>
                </label>
                <label className='checkbox-item'>
                  <input type='checkbox' name='dietaryRestrictions'  value='dairy-free' onChange={handleDietaryRestrictions}/>
                  <span>Dairy Free</span>
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
                value={formData?.foodDislikes}
                onChange={changeHandler}
              />
              <span className='input-hint'>Separate items with a comma</span>
            </div>

            <div className='form-group'>
              <label>Meals per day</label>
              <div className="meals-cards">
                    {[3, 4, 5].map((num) => (
                      <div
                        key={num}
                        className={`meals-card ${formData.mealsPerDay === num ? "active" : ""}`}
                        onClick={() =>  setField('mealsPerDay', num)  }
                      >
                        <span className="meals-number">{num === 4 ? "3+" : num}</span>
                        <span className="meals-label">Meals</span>
                      </div>
                    ))}
                  </div>
            </div>
          </div>

          <button type='submit' className='btn-submit'>
            Generate My Meal Plan
          </button>

        </form>
      </div>
    </div>
  );
};

export default OnboardingPage;