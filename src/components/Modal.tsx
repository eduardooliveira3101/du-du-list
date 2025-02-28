interface ModalProps {
	children: React.ReactNode;
}

export function Modal({ children }: ModalProps) {
	return (
		<div
			id="modal"
			className="fixed inset-0 flex justify-center items-center z-50"
		>
			<div className="absolute inset-0 bg-black opacity-30 z-40" />

			<div className="flex flex-col justify-center items-center w-125 h-100 bg-blue-50 z-50 rounded-lg p-6 shadow-lg">
				<h2 className="font-semibold text-2xl mb-4">Texto do modal</h2>
				{children}
			</div>
		</div>
	);
}
