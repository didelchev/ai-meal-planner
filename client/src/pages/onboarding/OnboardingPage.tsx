import { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import './OnboardingPage.css';
import { TrendingDown, Minus, TrendingUp } from 'lucide-react';
import type { ProfileBody } from '../../types/user.types';
import { useProfile } from '../../hooks/useProfile';


const OnboardingPage = () => {

const [sex , setSex] =useState<"male" | "female">('male');
const [goal, setGoal] = useState<"maintain" | "lose" | "gain">('maintain');
const [activityLevel, setActivityLevel] = useState<"sedentary" | "light" | "moderate" | "active" | "very_active">('sedentary');
const [mealsPerDay, setMealsPerDay] = useState(3);
const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);

const createUserProfile = useProfile();


const profileHandler = async (formData: Record<string, string>) => {
  const profileData: ProfileBody = { 
    age: Number(formData.age),
    weightKg: Number(formData.weightKg),
    heightCm: Number(formData.heightCm),
    sex,
    goal,
    activityLevel,
    dietaryRestrictions,
    foodDislikes: formData.foodDislikes,
    mealsPerDay,
  }
  await createUserProfile(profileData)
}


const { formData, changeHandler, submitHandler } = useForm({
  age: '',
  weightKg: '',
  heightCm: '',
  foodDislikes: ''
}, profileHandler)

const handleDietaryRestrictions = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { value, checked } = e.target;
  if(checked){
    setDietaryRestrictions(currentState => [...currentState, value])
  }else{ 
    setDietaryRestrictions(currentState => currentState.filter(dietaryRestriction => dietaryRestriction !== value))
  }

}

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
                <div className={`sex-card ${sex === 'male' ? 'active': ''}`} onClick={() => setSex('male')}>
                  <span>Male</span>
                </div>
                <div className={`sex-card ${sex === 'female' ? 'active': ''}`} onClick={() => setSex('female')}>
                  <span>Female</span>
                </div>
              </div>
            </div>
          </div>

          {/* GOAL */}
          <div className='form-section'>
            <h3>What is your goal?</h3>
            <div className='goal-cards'>
              <div className={`goal-card ${goal === 'lose' ? 'active' : ''}`} onClick={() => setGoal('lose')}>
                <div className='goal-card-icon'>
                  <TrendingDown size={24} />
                </div>
                <h4>Lose weight</h4>
                <p>Reduce body fat while preserving muscle</p>
              </div>
              <div className={`goal-card ${goal === 'maintain' ? 'active' : ''}`} onClick={() => setGoal('maintain')}>
                <div className='goal-card-icon'>
                  <Minus size={24} />
                </div>
                <h4>Maintain weight</h4>
                <p>Keep current weight and improve composition</p>
              </div>
              <div className={`goal-card ${goal === 'gain' ? 'active' : ''}`} onClick={() => setGoal('gain')}>
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
            <div className='activity-cards'>
              <div className={`activity-card ${activityLevel === 'sedentary' ? 'active' : ''}`} onClick={() => setActivityLevel('sedentary')}>
                <span className='activity-name'>Sedentary</span>
                <span className='activity-desc'>Little or no exercise</span>
              </div>
              <div className={`activity-card ${activityLevel === 'light' ? 'active' : ''}`} onClick={() => setActivityLevel('light')}>
                <span className='activity-name'>Light</span>
                <span className='activity-desc'>1-3 days/week</span>
              </div>
              <div className={`activity-card ${activityLevel === 'moderate' ? 'active' : ''}`} onClick={() => setActivityLevel('moderate')}>
                <span className='activity-name'>Moderate</span>
                <span className='activity-desc'>3-5 days/week</span>
              </div>
              <div className={`activity-card ${activityLevel === 'active' ? 'active' : ''}`} onClick={() => setActivityLevel('active')}>
                <span className='activity-name'>Active</span>
                <span className='activity-desc'>6-7 days/week</span>
              </div>
              <div className={`activity-card ${activityLevel === 'very_active' ? 'active' : ''}`} onClick={() => setActivityLevel('very_active')}>
                <span className='activity-name'>Very Active</span>
                <span className='activity-desc'>Intense daily</span>
              </div>
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
              <div className='meals-cards'>
                <div className={`meals-card ${mealsPerDay === 3 ? 'active' : ''}`} onClick={() => { setMealsPerDay(3)}}>
                  <span className='meals-number'>3</span>
                  <span className='meals-label'>Meals</span>
                </div>
                <div className={`meals-card ${mealsPerDay === 4 ? 'active' : ''}`} onClick={() => { setMealsPerDay(4)}}>
                  <span className='meals-number'>3+</span>
                  <span className='meals-label'>Meals + Snacks</span>
                </div>
                <div className={`meals-card ${mealsPerDay === 5 ? 'active' : ''}`} onClick={() => { setMealsPerDay(5)}}>
                  <span className='meals-number'>5</span>
                  <span className='meals-label'>Small Meals</span>
                </div>
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