import type { ITask } from "../interfaces/Task";

interface TaskList {
	taskList: ITask[];
	handleDelete(id: number): void;
	handleEdit(task: ITask): void;
}

export function TaskList({ taskList, handleDelete, handleEdit }: TaskList) {
	return (
		<>
			{taskList.length > 0 ? (
				taskList.map((task) => (
					<div
						className="flex justify-between mx-auto max-w-100 border-b-2 border-b-blue-300 p-4"
						key={task.id}
					>
						<div className="text-left">
							<h4 className="text-2xl mb-4">{task.title}</h4>
							<p>Dificuldade: {task.difficulty}</p>
						</div>

						<div className="flex flex-col gap-2 items-center justify-center gap-5">
							{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
							<i
								onClick={() => {
									handleEdit(task);
								}}
								className="hover:text-blue-500 transition duration-300 cursor-pointer text-[1.2em] ph ph-pencil-simple"
							/>
							<i
								onClick={() => handleDelete(task.id)}
								onKeyDown={(e) => e.key === "Enter" && handleDelete(task.id)}
								className="hover:text-red-500 transition duration-300 cursor-pointer text-[1.2em] ph ph-trash"
							/>
						</div>
					</div>
				))
			) : (
				<p className="mt-5">Não há tarefas cadastradas</p>
			)}
		</>
	);
}
