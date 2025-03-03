import { useState, useEffect } from "react";
import "./index.css";

import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { TaskForm } from "./components/Task-form";
import { TaskList } from "./components/Task-list";
import { Modal } from "./components/Modal";

// biome-ignore lint/style/useImportType: <explanation>
import { ITask } from "./interfaces/Task";

function App() {
	const [taskList, setTaskList] = useState<ITask[]>([]);
	const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null);

	// 🚀 Carregar tarefas do LocalStorage ao iniciar o app
	useEffect(() => {
		const savedTasks = localStorage.getItem("tasks");
		if (savedTasks) {
			try {
				setTaskList(JSON.parse(savedTasks)); // Converte para objeto
			} catch (error) {
				console.error("Erro ao carregar tarefas do LocalStorage:", error);
			}
		}
	}, []);

	// 🚀 Salvar tarefas no LocalStorage sempre que a lista for atualizada
	useEffect(() => {
		if (taskList.length > 0) {
			localStorage.setItem("tasks", JSON.stringify(taskList));
		}
	}, [taskList]);

	function deleteTask(id: number) {
		const updatedTasks = taskList.filter((task) => task.id !== id);
		setTaskList(updatedTasks);
		localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Atualiza LocalStorage
	}

	function hideOrShowModal(display: boolean) {
		const modal = document.querySelector("#modal");
		if (display) {
			modal?.classList.remove("hide");
		} else {
			modal?.classList.add("hide");
		}
	}

	function editTask(task: ITask): void {
		hideOrShowModal(true);
		setTaskToUpdate(task);
	}

	function updateTask(id: number, title: string, difficulty: number) {
		const updatedTask: ITask = { id, title, difficulty };

		const updatedItems = taskList.map((task) => {
			return task.id === updatedTask.id ? updatedTask : task;
		});

		setTaskList(updatedItems);
		localStorage.setItem("tasks", JSON.stringify(updatedItems)); // Atualiza LocalStorage

		hideOrShowModal(false);
	}

	return (
		<div>
			<Modal
				// biome-ignore lint/correctness/noChildrenProp: <explanation>
				children={
					<TaskForm
						btnText="Editar tarefa"
						taskList={taskList}
						task={taskToUpdate}
						handleUpdate={updateTask}
					/>
				}
			/>
			<Header />
			<main className="mt-20 text-center min-h-60 mb-120">
				<div>
					<h2 className="text-3xl font-bold">O que você vai fazer?</h2>
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
						handleDelete={deleteTask}
						handleEdit={editTask}
					/>
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default App;
