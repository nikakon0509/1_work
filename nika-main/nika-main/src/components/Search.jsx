import { useState } from "react";
import "../styles/Search.css";

export default function Search({ onSearch }) {
	const [query, setQuery] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		onSearch(query);
	};

	return (
		<form className="search-form" onSubmit={handleSubmit}>
			<input
				type="text"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder="Поиск рецептов..."
			/>
			<button type="submit">Найти</button>
		</form>
	);
}
