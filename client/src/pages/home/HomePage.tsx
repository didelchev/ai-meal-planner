import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import "./HomePage.css";
import Footer from "../../components/footer/Footer";
import {
  Target,
  Sparkles,
  ShoppingCart,
  RefreshCw,
  BarChart2,
  Settings,
} from "lucide-react";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <main className="home">
        {/* HERO */}
        <section className="hero">
          <div className="hero-content">
            <span className="hero-badge">AI Powered Meal Planning</span>
            <h1>
              Eat smarter.
              <br />
              Feel better.
              <br />
              Every week.
            </h1>
            <p>
              Tell us your goals and we'll generate a personalized weekly meal
              plan with exact macros, recipes, and a shopping list — in seconds.
            </p>
            <div className="hero-buttons">
              <Link to="/register" className="btn-primary">
                Get Started Free
              </Link>
              <Link to="#how-it-works" className="btn-outline">
                See How It Works
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-card">
              <div className="hero-card-header">
                <span>Monday</span>
                <span className="hero-card-calories">2,840 kcal</span>
              </div>
              <div className="hero-meal">
                <span className="meal-type">Breakfast</span>
                <span className="meal-name">Greek Yogurt Bowl</span>
                <span className="meal-macros">450 kcal · 35g protein</span>
              </div>
              <div className="hero-meal">
                <span className="meal-type">Lunch</span>
                <span className="meal-name">Grilled Chicken Wrap</span>
                <span className="meal-macros">620 kcal · 48g protein</span>
              </div>
              <div className="hero-meal">
                <span className="meal-type">Dinner</span>
                <span className="meal-name">Salmon with Quinoa</span>
                <span className="meal-macros">750 kcal · 52g protein</span>
              </div>
              <div className="hero-card-macros">
                <div className="macro-pill">160g Protein</div>
                <div className="macro-pill">320g Carbs</div>
                <div className="macro-pill">85g Fat</div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="how-it-works" id="how-it-works">
          <div className="section-container">
            <div className="section-header">
              <h2>How it works</h2>
              <p>Three simple steps to your perfect meal plan</p>
            </div>
            <div className="steps-grid">
              <div className="step-card">
                <div className="step-number">01</div>
                <h3>Tell us about yourself</h3>
                <p>
                  Enter your age, weight, height, goal and dietary preferences.
                  Takes less than 2 minutes.
                </p>
              </div>
              <div className="step-card">
                <div className="step-number">02</div>
                <h3>Get your macro targets</h3>
                <p>
                  We calculate your exact daily calorie and macro targets using
                  proven nutritional formulas.
                </p>
              </div>
              <div className="step-card">
                <div className="step-number">03</div>
                <h3>Generate your meal plan</h3>
                <p>
                  Our AI creates a full 7 day meal plan tailored to your
                  targets, preferences and dietary needs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="features" id="features">
          <div className="section-container">
            <div className="section-header">
              <h2>Everything you need</h2>
              <p>Built to make healthy eating effortless</p>
            </div>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <Target size={28} />
                </div>
                <h3>Accurate macro tracking</h3>
                <p>
                  Every meal is calculated to hit your exact daily protein, carb
                  and fat targets.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <Sparkles size={28} />
                </div>
                <h3>AI powered plans</h3>
                <p>
                  Our AI generates varied, realistic meals you'll actually want
                  to cook and eat.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <ShoppingCart size={28} />
                </div>
                <h3>Shopping list</h3>
                <p>
                  Get a categorized shopping list for the whole week with one
                  click.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <RefreshCw size={28} />
                </div>
                <h3>Swap any meal</h3>
                <p>
                  Don't like a meal? Swap it out and the AI generates a
                  replacement instantly.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <BarChart2 size={28} />
                </div>
                <h3>Macro dashboard</h3>
                <p>
                  See your daily macro breakdown at a glance with clear visual
                  charts.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <Settings size={28} />
                </div>
                <h3>Fully personalized</h3>
                <p>
                  Dietary restrictions, food dislikes, cuisine preferences — all
                  taken into account.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="stats" id="stats">
          <div className="section-container">
            <div className="section-header">
              <h2>One plan. Everything included.</h2>
              <p>
                Everything you need for a full week of healthy eating —
                generated in seconds
              </p>
            </div>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">7</div>
                <div className="stat-label">Days of meals</div>
                <div className="stat-desc">
                  A full week planned so you never have to think about what to
                  eat
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-number">21+</div>
                <div className="stat-label">Unique recipes</div>
                <div className="stat-desc">
                  No repeated meals — every breakfast, lunch and dinner is
                  different
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-number">100%</div>
                <div className="stat-label">Macro accurate</div>
                <div className="stat-desc">
                  Every meal calculated to hit your exact daily calorie and
                  macro targets
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-number">1</div>
                <div className="stat-label">Shopping list</div>
                <div className="stat-desc">
                  All ingredients for the week combined and organized by
                  category
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta">
          <div className="section-container">
            <h2>Ready to start eating better?</h2>
            <p>
              Join thousands of people hitting their goals with personalized
              meal plans.
            </p>
            <Link to="/register" className="btn-primary">
              Create Free Account
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default HomePage;
