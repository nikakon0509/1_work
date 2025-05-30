import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMealsByCategory } from '../api/api';
import Preloader from './Preloader';
import '../styles/Category.css';

export default function Category() {
  const { name } = useParams();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMealsByCategory(name).then(data => {
      setMeals(data);
      setLoading(false);
    });
  }, [name]);

  if (loading) return <Preloader />;

  return (
    <div className="category-container">
      <h1 className="category-title">Блюда в категории: {name}</h1>
      <div className="meals-grid">
        {meals.map(meal => (
          <div className="meal-card" key={meal.idMeal}>
            <img src={meal.strMealThumb} alt={meal.strMeal} />
            <h3>{meal.strMeal}</h3>
            <Link to={`/recipe/${meal.idMeal}`} className="recipe-button">
              Ознакомиться с рецептом
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}