import "./index.css";

import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

function App() {
	return (
		<div className="">
			<Header />
			<main className=" text-center min-h-60 mb-100">
				<h1 className="text-3xl mt-10">Conteúdo....</h1>
			</main>
			<Footer />
		</div>
	);
}

export default App;
