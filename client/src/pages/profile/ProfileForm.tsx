// import "./ProfilePage.css";
// import {  useUpdateUserProfile } from "../../hooks/useProfile";
// import type { ProfileBody, ProfileResponse } from "../../types/user.types";
// import { useEffect, useState } from "react";
// import { useForm } from "../../hooks/useForm";
// import {
//   Beef,
//   Droplets,
//   Flame,
//   Minus,
//   TrendingDown,
//   TrendingUp,
//   Wheat,
// } from "lucide-react";
// import CountUp from "react-countup";
// import Navbar from "../../components/navbar/Navbar";

// const ProfileForm = ({ userProfile, setUserProfile }: { userProfile: ProfileResponse, setUserProfile: (profile: ProfileResponse) => void}) => {
  
//   const [activeTab, setActiveTab] = useState<"stats" | "goal" | "preferences">("stats");

//   const [sex , setSex] =useState<"male" | "female">('male');
//   const [goal, setGoal] = useState<"maintain" | "lose" | "gain">('maintain');
//   const [activityLevel, setActivityLevel] = useState<"sedentary" | "light" | "moderate" | "active" | "very_active">('sedentary');
//   const [mealsPerDay, setMealsPerDay] = useState(3);
//   const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);

//   const updateUserProfile = useUpdateUserProfile();

//   useEffect(() => {
//     if(!userProfile.profile){
//       return
//     }
//     setSex(userProfile.profile.sex);
//     setGoal(userProfile.profile.goal);
//     setActivityLevel(userProfile.profile.activityLevel);
//     setMealsPerDay(userProfile.profile.mealsPerDay);
//     setDietaryRestrictions(userProfile.profile.dietaryRestrictions ?? []);
//   },[userProfile.profile])


//   const updateProfileHandler = async (formData: Record<string, string>) => {
//     const profileData: ProfileBody = {
//       age: Number(formData.age),
//       weightKg: Number(formData.weightKg),
//       heightCm: Number(formData.heightCm),
//       foodDislikes: formData.foodDislikes || '',
//       sex,
//       goal,
//       activityLevel,
//       mealsPerDay,
//       dietaryRestrictions,
//     };
//     const updatedUser = await updateUserProfile(profileData);

//     if(updatedUser){
//       setUserProfile(updatedUser) 
//     }


//   };

//   const { formData, changeHandler, submitHandler } = useForm(
//     {
//       age: String(userProfile.profile.age),
//       weightKg: String(userProfile.profile.weightKg),
//       heightCm: String(userProfile.profile.heightCm),
//       foodDislikes: String(userProfile.profile.foodDislikes),
//     },
//     updateProfileHandler,
//   );

//   const handleDietaryRestrictions = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { value, checked } = e.target;
//     if (checked) {
//       setDietaryRestrictions((current) => [...current, value]);
//     } else {
//       setDietaryRestrictions((current) => current.filter((item) => item !== value));
//     }
//   };


//   return (
//     <>
//       <Navbar />
//       <div className="profile-container">

//         <div className="profile-header">
//           <h1>Your Profile</h1>
//           <p>Update your details to keep your meal plan accurate</p>
//         </div>

//         {/* MACRO SUMMARY */}
//         <div className="profile-macros">
//           <div className="profile-macro-item">
//             <div className="profile-macro-icon calories">
//               <Flame size={16} />
//             </div>
//             <div>
//               <span className="profile-macro-value">
//                 <CountUp end={userProfile.macros.calories} />
//               </span>
//               <span className="profile-macro-label">kcal / day</span>
//             </div>
//           </div>
//           <div className="profile-macro-item">
//             <div className="profile-macro-icon protein">
//               <Beef size={16} />
//             </div>
//             <div>
//               <span className="profile-macro-value">
//                 <CountUp end={userProfile.macros.proteinG} />g
//               </span>
//               <span className="profile-macro-label">Protein</span>
//             </div>
//           </div>
//           <div className="profile-macro-item">
//             <div className="profile-macro-icon carbs">
//               <Wheat size={16} />
//             </div>
//             <div>
//               <span className="profile-macro-value">
//                 <CountUp end={userProfile.macros.carbsG} />g
//               </span>
//               <span className="profile-macro-label">Carbs</span>
//             </div>
//           </div>
//           <div className="profile-macro-item">
//             <div className="profile-macro-icon fat">
//               <Droplets size={16} />
//             </div>
//             <div>
//               <span className="profile-macro-value">
//                 <CountUp end={userProfile.macros.fatG} />g
//               </span>
//               <span className="profile-macro-label">Fat</span>
//             </div>
//           </div>
//         </div>

//         {/* TABS */}
//         <form className="profile-card" onSubmit={submitHandler}>
//           <div className="profile-tabs">
//             <button
//               type="button"
//               className={`profile-tab ${activeTab === "stats" ? "active" : ""}`}
//               onClick={() => setActiveTab("stats")}
//             >
//               Stats
//             </button>
//             <button
//               type="button"
//               className={`profile-tab ${activeTab === "goal" ? "active" : ""}`}
//               onClick={() => setActiveTab("goal")}
//             >
//               Goal & Activity
//             </button>
//             <button
//               type="button"
//               className={`profile-tab ${activeTab === "preferences" ? "active" : ""}`}
//               onClick={() => setActiveTab("preferences")}
//             >
//               Preferences
//             </button>
//           </div>

//           <div className="profile-tab-content">

//             {/* STATS TAB */}
//             {activeTab === "stats" && (
//               <div className="tab-panel">
//                 <div className="form-row">
//                   <div className="form-group">
//                     <label htmlFor="age">Age</label>
//                     <div className="input-with-unit">
//                       <input
//                         id="age"
//                         name="age"
//                         type="number"
//                         value={formData.age}
//                         onChange={changeHandler}
//                       />
//                       <span className="unit">years</span>
//                     </div>
//                   </div>
//                   <div className="form-group">
//                     <label htmlFor="weightKg">Weight</label>
//                     <div className="input-with-unit">
//                       <input
//                         id="weightKg"
//                         name="weightKg"
//                         type="number"
//                         value={formData.weightKg}
//                         onChange={changeHandler}
//                       />
//                       <span className="unit">kg</span>
//                     </div>
//                   </div>
//                   <div className="form-group">
//                     <label htmlFor="heightCm">Height</label>
//                     <div className="input-with-unit">
//                       <input
//                         id="heightCm"
//                         name="heightCm"
//                         type="number"
//                         value={formData.heightCm}
//                         onChange={changeHandler}
//                       />
//                       <span className="unit">cm</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="form-group">
//                   <label>Sex</label>
//                   <div className="sex-cards">
//                     <div
//                       className={`sex-card ${sex === "male" ? "active" : ""}`}
//                       onClick={() => setSex("male")}
//                     >
//                       <span>Male</span>
//                     </div>
//                     <div
//                       className={`sex-card ${sex === "female" ? "active" : ""}`}
//                       onClick={() => setSex("female")}
//                     >
//                       <span>Female</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* GOAL TAB */}
//             {activeTab === "goal" && (
//               <div className="tab-panel">
//                 <div className="form-group">
//                   <label>Your goal</label>
//                   <div className="goal-cards">
//                     <div
//                       className={`goal-card ${goal === "lose" ? "active" : ""}`}
//                       onClick={() => setGoal("lose")}
//                     >
//                       <div className="goal-card-icon">
//                         <TrendingDown size={24} />
//                       </div>
//                       <h4>Lose weight</h4>
//                       <p>Reduce body fat while preserving muscle</p>
//                     </div>
//                     <div
//                       className={`goal-card ${goal === "maintain" ? "active" : ""}`}
//                       onClick={() => setGoal("maintain")}
//                     >
//                       <div className="goal-card-icon">
//                         <Minus size={24} />
//                       </div>
//                       <h4>Maintain weight</h4>
//                       <p>Keep current weight and improve composition</p>
//                     </div>
//                     <div
//                       className={`goal-card ${goal === "gain" ? "active" : ""}`}
//                       onClick={() => setGoal("gain")}
//                     >
//                       <div className="goal-card-icon">
//                         <TrendingUp size={24} />
//                       </div>
//                       <h4>Build muscle</h4>
//                       <p>Increase muscle mass with a calorie surplus</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="form-group">
//                   <label>Activity level</label>
//                   <div className="activity-cards">
//                     <div
//                       className={`activity-card ${activityLevel === "sedentary" ? "active" : ""}`}
//                       onClick={() => setActivityLevel("sedentary")}
//                     >
//                       <span className="activity-name">Sedentary</span>
//                       <span className="activity-desc">Little or no exercise</span>
//                     </div>
//                     <div
//                       className={`activity-card ${activityLevel === "light" ? "active" : ""}`}
//                       onClick={() => setActivityLevel("light")}
//                     >
//                       <span className="activity-name">Light</span>
//                       <span className="activity-desc">1-3 days/week</span>
//                     </div>
//                     <div
//                       className={`activity-card ${activityLevel === "moderate" ? "active" : ""}`}
//                       onClick={() => setActivityLevel("moderate")}
//                     >
//                       <span className="activity-name">Moderate</span>
//                       <span className="activity-desc">3-5 days/week</span>
//                     </div>
//                     <div
//                       className={`activity-card ${activityLevel === "active" ? "active" : ""}`}
//                       onClick={() => setActivityLevel("active")}
//                     >
//                       <span className="activity-name">Active</span>
//                       <span className="activity-desc">6-7 days/week</span>
//                     </div>
//                     <div
//                       className={`activity-card ${activityLevel === "very_active" ? "active" : ""}`}
//                       onClick={() => setActivityLevel("very_active")}
//                     >
//                       <span className="activity-name">Very Active</span>
//                       <span className="activity-desc">Intense daily</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* PREFERENCES TAB */}
//             {activeTab === "preferences" && (
//               <div className="tab-panel">
//                 <div className="form-group">
//                   <label>Dietary restrictions</label>
//                   <div className="checkbox-group">
//                     <label className="checkbox-item">
//                       <input
//                         type="checkbox"
//                         name="dietaryRestrictions"
//                         value="vegetarian"
//                         checked={dietaryRestrictions.includes("vegetarian")}
//                         onChange={handleDietaryRestrictions}
//                       />
//                       <span>Vegetarian</span>
//                     </label>
//                     <label className="checkbox-item">
//                       <input
//                         type="checkbox"
//                         name="dietaryRestrictions"
//                         value="vegan"
//                         checked={dietaryRestrictions.includes("vegan")}
//                         onChange={handleDietaryRestrictions}
//                       />
//                       <span>Vegan</span>
//                     </label>
//                     <label className="checkbox-item">
//                       <input
//                         type="checkbox"
//                         name="dietaryRestrictions"
//                         value="gluten-free"
//                         checked={dietaryRestrictions.includes("gluten-free")}
//                         onChange={handleDietaryRestrictions}
//                       />
//                       <span>Gluten Free</span>
//                     </label>
//                     <label className="checkbox-item">
//                       <input
//                         type="checkbox"
//                         name="dietaryRestrictions"
//                         value="dairy-free"
//                         checked={dietaryRestrictions.includes("dairy-free")}
//                         onChange={handleDietaryRestrictions}
//                       />
//                       <span>Dairy Free</span>
//                     </label>
//                   </div>
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="foodDislikes">Food dislikes</label>
//                   <input
//                     id="foodDislikes"
//                     name="foodDislikes"
//                     type="text"
//                     placeholder="e.g. mushrooms, shellfish, spicy food"
//                     value={formData.foodDislikes}
//                     onChange={changeHandler}
//                   />
//                   <span className="input-hint">Separate items with a comma</span>
//                 </div>

//                 <div className="form-group">
//                   <label>Meals per day</label>
//                   <div className="meals-cards">
//                     <div
//                       className={`meals-card ${mealsPerDay === 3 ? "active" : ""}`}
//                       onClick={() => setMealsPerDay(3)}
//                     >
//                       <span className="meals-number">3</span>
//                       <span className="meals-label">Meals</span>
//                     </div>
//                     <div
//                       className={`meals-card ${mealsPerDay === 4 ? "active" : ""}`}
//                       onClick={() => setMealsPerDay(4)}
//                     >
//                       <span className="meals-number">3+</span>
//                       <span className="meals-label">Meals + Snacks</span>
//                     </div>
//                     <div
//                       className={`meals-card ${mealsPerDay === 5 ? "active" : ""}`}
//                       onClick={() => setMealsPerDay(5)}
//                     >
//                       <span className="meals-number">5</span>
//                       <span className="meals-label">Small Meals</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="profile-form-footer">
//             <button type="submit" className="btn-save">
//               Save Changes
//             </button>
//           </div>
//         </form>

//       </div>
//     </>
//   );
// };

// export default ProfileForm



import "./ProfilePage.css";
import { useUpdateUserProfile } from "../../hooks/useProfile";
import type { ProfileBody, ProfileResponse } from "../../types/user.types";
import { useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import {
  Beef,
  Droplets,
  Flame,
  Minus,
  TrendingDown,
  TrendingUp,
  Wheat,
} from "lucide-react";
import CountUp from "react-countup";
import Navbar from "../../components/navbar/Navbar";

interface ProfileFormProps {
  userProfile: ProfileResponse;
  setUserProfile: (profile: ProfileResponse) => void;
}

const ProfileForm = ({ userProfile, setUserProfile }: ProfileFormProps) => {
  const [activeTab, setActiveTab] = useState<"stats" | "goal" | "preferences">("stats");

  // Local state for UI selection elements
  const [sex, setSex] = useState<"male" | "female">(userProfile.profile.sex);
  const [goal, setGoal] = useState<"maintain" | "lose" | "gain">(userProfile.profile.goal);
  const [activityLevel, setActivityLevel] = useState<"sedentary" | "light" | "moderate" | "active" | "very_active">(userProfile.profile.activityLevel);
  const [mealsPerDay, setMealsPerDay] = useState(userProfile.profile.mealsPerDay);
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>(userProfile.profile.dietaryRestrictions ?? []);

  const updateUserProfile = useUpdateUserProfile();

  // Submission handler with proper Type Conversion
  const updateProfileHandler = async (formData: Record<string, string>) => {
    const profileData: ProfileBody = {
      age: Number(formData.age), // Convert string input to number
      weightKg: Number(formData.weightKg),
      heightCm: Number(formData.heightCm),
      foodDislikes: formData.foodDislikes || '',
      sex,
      goal,
      activityLevel,
      mealsPerDay,
      dietaryRestrictions,
    };

    try {
      const updatedUser = await updateUserProfile(profileData);
      if (updatedUser) {
        setUserProfile(updatedUser); // This updates the parent & triggers CountUp
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const { formData, changeHandler, submitHandler } = useForm(
    {
      age: String(userProfile.profile.age),
      weightKg: String(userProfile.profile.weightKg),
      heightCm: String(userProfile.profile.heightCm),
      foodDislikes: String(userProfile.profile.foodDislikes || ""),
    },
    updateProfileHandler
  );

  const handleDietaryRestrictions = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setDietaryRestrictions((current) => [...current, value]);
    } else {
      setDietaryRestrictions((current) => current.filter((item) => item !== value));
    }
  };

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="profile-header">
          <h1>Your Profile</h1>
          <p>Update your details to keep your meal plan accurate</p>
        </div>

        {/* MACRO SUMMARY - Automatically animates when setUserProfile is called */}
        <div className="profile-macros">
          <div className="profile-macro-item">
            <div className="profile-macro-icon calories"><Flame size={16} /></div>
            <div>
              <span className="profile-macro-value"><CountUp end={userProfile.macros.calories} /></span>
              <span className="profile-macro-label">kcal / day</span>
            </div>
          </div>
          <div className="profile-macro-item">
            <div className="profile-macro-icon protein"><Beef size={16} /></div>
            <div>
              <span className="profile-macro-value"><CountUp end={userProfile.macros.proteinG} />g</span>
              <span className="profile-macro-label">Protein</span>
            </div>
          </div>
          <div className="profile-macro-item">
            <div className="profile-macro-icon carbs"><Wheat size={16} /></div>
            <div>
              <span className="profile-macro-value"><CountUp end={userProfile.macros.carbsG} />g</span>
              <span className="profile-macro-label">Carbs</span>
            </div>
          </div>
          <div className="profile-macro-item">
            <div className="profile-macro-icon fat"><Droplets size={16} /></div>
            <div>
              <span className="profile-macro-value"><CountUp end={userProfile.macros.fatG} />g</span>
              <span className="profile-macro-label">Fat</span>
            </div>
          </div>
        </div>

        {/* FORM SECTION */}
        <form className="profile-card" onSubmit={submitHandler}>
          <div className="profile-tabs">
            {["stats", "goal", "preferences"].map((tab) => (
              <button
                key={tab}
                type="button" // Critical: prevents form submission on tab click
                className={`profile-tab ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab as any)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="profile-tab-content">
            {/* STATS TAB */}
            {activeTab === "stats" && (
              <div className="tab-panel">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <div className="input-with-unit">
                      <input id="age" name="age" type="number" value={formData.age} onChange={changeHandler} />
                      <span className="unit">years</span>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="weightKg">Weight</label>
                    <div className="input-with-unit">
                      <input id="weightKg" name="weightKg" type="number" value={formData.weightKg} onChange={changeHandler} />
                      <span className="unit">kg</span>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="heightCm">Height</label>
                    <div className="input-with-unit">
                      <input id="heightCm" name="heightCm" type="number" value={formData.heightCm} onChange={changeHandler} />
                      <span className="unit">cm</span>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Sex</label>
                  <div className="sex-cards">
                    {["male", "female"].map((s) => (
                      <div
                        key={s}
                        className={`sex-card ${sex === s ? "active" : ""}`}
                        onClick={() => setSex(s as any)}
                      >
                        <span>{s.charAt(0).toUpperCase() + s.slice(1)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* GOAL TAB */}
            {activeTab === "goal" && (
              <div className="tab-panel">
                <div className="form-group">
                  <label>Your goal</label>
                  <div className="goal-cards">
                    <div className={`goal-card ${goal === "lose" ? "active" : ""}`} onClick={() => setGoal("lose")}>
                      <div className="goal-card-icon"><TrendingDown size={24} /></div>
                      <h4>Lose weight</h4>
                    </div>
                    <div className={`goal-card ${goal === "maintain" ? "active" : ""}`} onClick={() => setGoal("maintain")}>
                      <div className="goal-card-icon"><Minus size={24} /></div>
                      <h4>Maintain</h4>
                    </div>
                    <div className={`goal-card ${goal === "gain" ? "active" : ""}`} onClick={() => setGoal("gain")}>
                      <div className="goal-card-icon"><TrendingUp size={24} /></div>
                      <h4>Build muscle</h4>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Activity level</label>
                  <div className="activity-cards">
                    {["sedentary", "light", "moderate", "active", "very_active"].map((level) => (
                      <div
                        key={level}
                        className={`activity-card ${activityLevel === level ? "active" : ""}`}
                        onClick={() => setActivityLevel(level as any)}
                      >
                        <span className="activity-name">{level.replace("_", " ")}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* PREFERENCES TAB */}
            {activeTab === "preferences" && (
              <div className="tab-panel">
                <div className="form-group">
                  <label>Dietary restrictions</label>
                  <div className="checkbox-group">
                    {["vegetarian", "vegan", "gluten-free", "dairy-free"].map((res) => (
                      <label key={res} className="checkbox-item">
                        <input
                          type="checkbox"
                          value={res}
                          checked={dietaryRestrictions.includes(res)}
                          onChange={handleDietaryRestrictions}
                        />
                        <span>{res}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="foodDislikes">Food dislikes</label>
                  <input
                    id="foodDislikes"
                    name="foodDislikes"
                    type="text"
                    value={formData.foodDislikes}
                    onChange={changeHandler}
                    placeholder="e.g. mushrooms, shellfish"
                  />
                </div>

                <div className="form-group">
                  <label>Meals per day</label>
                  <div className="meals-cards">
                    {[3, 4, 5].map((num) => (
                      <div
                        key={num}
                        className={`meals-card ${mealsPerDay === num ? "active" : ""}`}
                        onClick={() => setMealsPerDay(num)}
                      >
                        <span className="meals-number">{num === 4 ? "3+" : num}</span>
                        <span className="meals-label">Meals</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="profile-form-footer">
            <button type="submit" className="btn-save">Save Changes</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfileForm;