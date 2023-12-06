export default function FormInput({ ...props }) {
	return (
		<div className={props.width + " flex flex-col mx-2 items-center"}>
			<div>
				<label
					className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
					htmlFor="todo-name"
				>
					{ props.label }
				</label>
			</div>
			<div className="md:w-full">
				<input
					className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
					type={ props.type}
					value={ props.value }
					onChange={ props.setActivity && ((e) => props.setActivity(e.target.value)) }
				/>
			</div>
		</div>
	);
}
