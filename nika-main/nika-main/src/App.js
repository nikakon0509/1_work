import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Category from "./components/Category";
import Recipe from "./components/Recipe";
import "./styles/App.css";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/category/:name" element={<Category />} />
				<Route path="/recipe/:id" element={<Recipe />} />
			</Routes>
		</Router>
	);
}

export default App;
