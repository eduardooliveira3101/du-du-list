import "./index.css";

import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { TaskForm } from "./components/Task-form";
import { TaskList } from "./components/Task-list";

// biome-ignore lint/style/useImportType: <explanation>
import { ITask } from "./interfaces/Task";
import { useState } from "react";

function App() {
	const [taskList, setTaskList] = useState<ITask[]>([]);

	return (
		<div className="">
			<Header />
			<main className="mt-20 text-center min-h-60 mb-120">
				<div>
					<h2 className="text-3xl font-bold">Oque você vai fazer?</h2>
					<TaskForm taskList={taskList} setTaskList={setTaskList} btnText="" />
				</div>

				<div className="mt-10">
					<h2 className="text-3xl font-bold">Suas tarefas</h2>
					<TaskList taskList={taskList} />
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default App;
