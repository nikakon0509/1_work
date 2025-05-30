import axios from "axios";

const API_URL = "https://www.themealdb.com/api/json/v1/1/";

export const getCategories = () => {
	return axios
		.get(`${API_URL}categories.php`)
		.then((res) => res.data.categories);
};

export const getMealsByCategory = (categoryName) => {
	return axios
		.get(`${API_URL}filter.php?c=${categoryName}`)
		.then((res) => res.data.meals);
};

export const getRecipeById = (id) => {
	return axios
		.get(`${API_URL}lookup.php?i=${id}`)
		.then((res) => res.data.meals[0]);
};

export const searchMeals = (query) => {
	return axios
		.get(`${API_URL}search.php?s=${query}`)
		.then((res) => res.data.meals);
};
