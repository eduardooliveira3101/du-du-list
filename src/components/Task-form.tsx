import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import react, { useEffect } from "react";

// biome-ignore lint/style/useImportType: <explanation>
import { ITask } from "../interfaces/Task";

interface TaskFormProps {
	btnText: string;
	taskList: ITask[];
	setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>;
	task?: ITask | null;
	handleUpdate?(id: number, title: string, difficulty: number): void;
}

export function TaskForm({
	btnText,
	taskList,
	setTaskList,
	task,
	handleUpdate,
}: TaskFormProps) {
	const [id, setId] = react.useState<number>(0);
	const [title, setTitle] = react.useState<string>("");
	const [difficulty, setDifficulty] = react.useState<number>(0);

	useEffect(() => {
		if (task) {
			setId(task.id);
			setTitle(task.title);
			setDifficulty(task.difficulty);
		}
	}, [task]);

	function addTaskHandle(event: react.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (handleUpdate) {
			handleUpdate(id, title, difficulty);
		} else {
			const id = Math.floor(Math.random() * 1000);

			const newTask: ITask = { id, title, difficulty };

			// biome-ignore lint/style/noNonNullAssertion: <explanation>
			setTaskList!([...taskList, newTask]);

			setTitle("");
			setDifficulty(0);
		}
	}

	function handleChange(event: react.ChangeEvent<HTMLInputElement>) {
		if (event.target.name === "title") {
			setTitle(event.target.value);
		} else {
			setDifficulty(Number(event.target.value));
		}
	}

	return (
		<form onSubmit={addTaskHandle}>
			<div className="mt-5 mb-5">
				<TextField
					onChange={handleChange}
					type="text"
					name="title"
					id="title"
					label="Título da sua tarefa"
					variant="outlined"
					value={title}
				/>
			</div>

			<div>
				<div className="mb-5">
					<TextField
						type="number"
						name="difficulty"
						id="difficulty"
						label="Dificuldade da tarefa"
						variant="outlined"
						value={difficulty}
						onChange={handleChange}
						inputProps={{ min: 0, max: 3 }}
						className="w-55"
					/>
				</div>
			</div>
			<Button type="submit" variant="contained">
				{btnText}
			</Button>
		</form>
	);
}
