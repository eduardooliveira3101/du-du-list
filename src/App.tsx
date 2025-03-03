import "./index.css";

import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { TaskForm } from "./components/Task-form";
import { TaskList } from "./components/Task-list";
import { Modal } from "./components/Modal";

// biome-ignore lint/style/useImportType: <explanation>
import { ITask } from "./interfaces/Task";
import { useState } from "react";

function App() {
	const [taskList, setTaskList] = useState<ITask[]>([]);

	function deleteTak(id: number) {
		setTaskList(
			taskList.filter((task) => {
				return task.id !== id;
			}),
		);
	}

	function hideOrShowModal(display: boolean) {
		const modal = document.querySelector("#modal");
		if (display) {
			modal?.classList.remove("hide");
		} else {
			modal?.classList.add("hide");
		}
	}

	function editTask(): void {
		hideOrShowModal(true);
	}

	return (
		<div>
			<Modal
				// biome-ignore lint/correctness/noChildrenProp: <explanation>
				children={<TaskForm btnText="Editar tarefa" taskList={taskList} />}
			/>
			<Header />
			<main className="mt-20 text-center min-h-60 mb-120">
				<div>
					<h2 className="text-3xl font-bold">Oque você vai fazer?</h2>
					<TaskForm
						taskList={taskList}
						setTaskList={setTaskList}
						btnText="Criar tarefa"
					/>
				</div>

				<div className="mt-10">
					<h2 className="text-3xl font-bold">Suas tarefas</h2>
					<TaskList
						taskList={taskList}
						handleDelete={deleteTak}
						handleEdit={editTask}
					/>
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default App;
