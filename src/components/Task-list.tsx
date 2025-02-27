// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface TaskList {}

// biome-ignore lint/correctness/noEmptyPattern: <explanation>
export function TaskList({}: TaskList) {
	return (
		<div>
			<p>TaskList</p>
		</div>
	);
}
