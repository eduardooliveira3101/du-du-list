import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import react from "react";

// biome-ignore lint/style/useImportType: <explanation>
import { ITask } from "../interfaces/Task";

interface TaskFormProps {
	btnText: string;
	taskList: ITask[];
	setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>;
}

export function TaskForm({ btnText, taskList, setTaskList }: TaskFormProps) {
	const [id, setId] = react.useState<number>(0);
	const [title, setTitle] = react.useState<string>("");
	const [difficulty, setDifficulty] = react.useState<number>(0);

	function addTaskHandle(event: react.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const id = Math.floor(Math.random() * 1000);

		const newTask: ITask = { id, title, difficulty };

		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		setTaskList!([...taskList, newTask]);

		setTitle("");
		setDifficulty(0);
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
						inputProps={{ min: 0, max: 10 }}
						className="w-55"
					/>
				</div>
			</div>
			<Button type="submit" value={btnText} variant="contained">
				Criar tarefa
			</Button>
		</form>
	);
}
