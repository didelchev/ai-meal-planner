
import "./ProfilePage.css";
import { useUpdateUserProfile } from "../../hooks/useProfile";
import type { ProfileBody, ProfileResponse } from "../../types/user.types";
import { useState } from "react";
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

  const [sex, setSex] = useState<"male" | "female">(userProfile.profile.sex);
  const [goal, setGoal] = useState<"maintain" | "lose" | "gain">(userProfile.profile.goal);
  const [activityLevel, setActivityLevel] = useState<"sedentary" | "light" | "moderate" | "active" | "very_active">(userProfile.profile.activityLevel);
  const [mealsPerDay, setMealsPerDay] = useState(userProfile.profile.mealsPerDay);
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>(userProfile.profile.dietaryRestrictions ?? []);

  const updateUserProfile = useUpdateUserProfile();

  const updateProfileHandler = async (formData: Record<string, string>) => {
    const profileData: ProfileBody = {
      age: Number(formData.age), 
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
        setUserProfile(updatedUser);
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

        {/* MACRO SUMMARY  */}
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
                type="button" 
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