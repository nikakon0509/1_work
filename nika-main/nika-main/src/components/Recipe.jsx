import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../api/api";
import Preloader from "./Preloader";
import "../styles/Recipe.css";

export default function Recipe() {
	const { id } = useParams();
	const [recipe, setRecipe] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getRecipeById(id).then((data) => {
			setRecipe(data);
			setLoading(false);
		});
	}, [id]);

	if (loading) return <Preloader />;

	return (
		<div className="recipe-container">
			<h1 className="recipe-title">{recipe.strMeal}</h1>
			<img
				src={recipe.strMealThumb}
				alt={recipe.strMeal}
				className="recipe-image"
			/>
			<div className="recipe-details">
				<h2>Ингредиенты:</h2>
				<ul>
					{Array.from({ length: 20 }).map((_, i) => {
						const ingredient = recipe[`strIngredient${i + 1}`];
						const measure = recipe[`strMeasure${i + 1}`];
						return ingredient ? (
							<li key={i}>
								{ingredient} - {measure}
							</li>
						) : null;
					})}
				</ul>
				<h2>Способ приготовления:</h2>
				<p>{recipe.strInstructions}</p>
			</div>
		</div>
	);
}
