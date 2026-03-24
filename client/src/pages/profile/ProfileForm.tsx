
import "./ProfilePage.css";
import { useUpdateUserProfile } from "../../hooks/useProfile";
import type { ProfileBody, ProfileResponse } from "../../types/user.types";
import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { Beef, Droplets, Flame, Minus, TrendingDown, TrendingUp, Wheat,} from "lucide-react";
import CountUp from "react-countup";
import Navbar from "../../components/navbar/Navbar";

interface ProfileFormProps {
  userProfile: ProfileResponse;
  setUserProfile: (profile: ProfileResponse) => void;
}

const ProfileForm = ({ userProfile, setUserProfile }: ProfileFormProps) => {
  const [activeTab, setActiveTab] = useState<"stats" | "goal" | "preferences">("stats");
  const updateUserProfile = useUpdateUserProfile();


  const { formData, changeHandler, setField, submitHandler } = useForm<ProfileBody>(
    {
      age: userProfile.profile.age,
      weightKg: userProfile.profile.weightKg,
      heightCm: userProfile.profile.heightCm,
      sex: userProfile.profile.sex,
      goal: userProfile.profile.goal,
      activityLevel: userProfile.profile.activityLevel,
      mealsPerDay: userProfile.profile.mealsPerDay,
      dietaryRestrictions: userProfile.profile.dietaryRestrictions ?? [],
      foodDislikes: userProfile.profile.foodDislikes || '',
    },

    async (profileData) => {
      const updatedUser = await updateUserProfile(profileData);
      if (updatedUser) setUserProfile(updatedUser);
    }
  );

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
                    {(["male", "female"] as const).map((sex) => (
                      <div
                        key={sex}
                        className={`sex-card ${formData.sex === sex ? "active" : ""}`}
                        onClick={() => setField('sex', sex)}
                      >
                        <span>{sex.charAt(0).toUpperCase() + sex.slice(1)}</span>
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
                    <div className={`goal-card ${formData.goal === "lose" ? "active" : ""}`} onClick={() => setField("goal", 'lose')}>
                      <div className="goal-card-icon"><TrendingDown size={24} /></div>
                      <h4>Lose weight</h4>
                    </div>
                    <div className={`goal-card ${formData.goal === "maintain" ? "active" : ""}`} onClick={() => setField("goal", 'maintain')}>
                      <div className="goal-card-icon"><Minus size={24} /></div>
                      <h4>Maintain</h4>
                    </div>
                    <div className={`goal-card ${formData.goal === "gain" ? "active" : ""}`} onClick={() => setField("goal", 'gain')}>
                      <div className="goal-card-icon"><TrendingUp size={24} /></div>
                      <h4>Build muscle</h4>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Activity level</label>
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
                          checked={formData.dietaryRestrictions.includes(res)}
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
