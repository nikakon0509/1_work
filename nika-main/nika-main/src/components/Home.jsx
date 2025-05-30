import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategories, searchMeals } from "../api/api";
import Preloader from "./Preloader";
import Search from "./Search";
import "../styles/Home.css";

export default function Home() {
	const [categories, setCategories] = useState([]);
	const [searchResults, setSearchResults] = useState([]);
	const [loading, setLoading] = useState(true);
	const [isSearching, setIsSearching] = useState(false);

	useEffect(() => {
		getCategories().then((data) => {
			setCategories(data);
			setLoading(false);
		});
	}, []);

	const handleSearch = async (query) => {
		if (!query.trim()) {
			setIsSearching(false);
			return;
		}

		setIsSearching(true);
		try {
			const results = await searchMeals(query);
			setSearchResults(results || []);
		} catch (error) {
			console.error("Search error:", error);
			setSearchResults([]);
		}
	};

	if (loading) return <Preloader />;

	return (
		<div className="home-container">
			<h1 className="home-title">Рецепты</h1>

			<Search onSearch={handleSearch} />

			{isSearching ? (
				<div className="search-results">
					<h2>Результаты поиска</h2>
					{searchResults.length > 0 ? (
						<div className="meals-grid">
							{searchResults.map((meal) => (
								<Link to={`/recipe/${meal.idMeal}`} key={meal.idMeal}>
									<div className="meal-card">
										<img src={meal.strMealThumb} alt={meal.strMeal} />
										<h3>{meal.strMeal}</h3>
									</div>
								</Link>
							))}
						</div>
					) : (
						<p>Ничего не найдено</p>
					)}
				</div>
			) : (
				<>
					<h2>Категории</h2>
					<div className="categories-grid">
						{categories.map((category) => (
							<Link
								to={`/category/${category.strCategory}`}
								key={category.idCategory}
							>
								<div className="category-card">
									<img
										src={category.strCategoryThumb}
										alt={category.strCategory}
									/>
									<h3>{category.strCategory}</h3>
								</div>
							</Link>
						))}
					</div>
				</>
			)}
		</div>
	);
}
