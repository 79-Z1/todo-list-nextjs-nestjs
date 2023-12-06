'use client';
import { useEffect, useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { useTodo } from '../hooks/useTodo';

export default function Todo() {
	const [status, setStatus] = useState(false);
	const [todo, setTodo]: any = useState('');
	// const [todos, setTodos]: any = useState([]);
	const { todos, getAll } = useTodo();
	const [time, setTime] = useState(() => {
		return new Date().toLocaleString();
	});

	function handleStatus() {
		setStatus(!status);
	}

	function handleTodos() {
		if (!todo) return toast.error('Không được để trống tên công việc');
		setTodo('');
	}
	
	useEffect(() => {
		let isMounted = true;
		if(isMounted) {
			getAll()
		}
		const intervalId = setInterval(() => {
			const newTime = new Date().toLocaleTimeString();
			setTime(newTime);
		});

		return () => {
			isMounted = false;
			clearInterval(intervalId);
		};
	}, [time, getAll]);

	return (
		<div className="flex justify-center items-center min-h-screen bg-[#cbd7e3]">
			<div className="h-auto w-2/5 bg-white rounded-lg p-4">
				<div className="mt-3 text-sm text-[#8ea6c8] flex justify-between items-center">
					<p className="set_date">
						{new Date().toISOString().split('T')[0]}
					</p>
					<p suppressHydrationWarning>{time}</p>
				</div>
				<p className="text-xl text-center font-semibold mt-2 text-[#063c76]">
					To-do List
				</p>
				<div className="w-full mt-4 flex text-sm flex-col text-center justify-start ">
					<div className="md:flex md:items-center mb-6">
						<div className="md:w-1/3">
							<label
								className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
								htmlFor="todo-name"
							>
								Tên công việc
							</label>
						</div>
						<div className="md:w-2/3">
							<input
								className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
								id="todo-name"
								value={todo}
								onChange={(e) => setTodo(e.target.value)}
							/>
						</div>
						<div className="md:w-1/3">
							<button
								className="w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
								onClick={handleTodos}
							>
								Thêm
							</button>
						</div>
					</div>
				</div>
				<ul className="my-4 ">
					{todos.map((todo) => (
						<li className=" mt-4" id="1" key={todo.id}>
							<div className="flex gap-2">
								<div className="w-9/12 h-12 bg-[#e0ebff] rounded-[7px] flex justify-start items-center px-3">
									<span
										className={
											'w-7 h-7 bg-white rounded-full border border-white transition-all cursor-pointer hover:border-[#36d344] flex justify-center items-center' +
											(status && ' green')
										}
										onClick={handleStatus}
									>
										{status && <AiOutlineCheck />}
									</span>
									<span
										className={
											'text-sm ml-4 text-[#5b7a9d] font-semibold ' +
											(status && 'strike')
										}
									>
										take out the trash
									</span>
								</div>
								<span className="w-1/4 h-12 bg-[#e0ebff] rounded-[7px] flex justify-center text-sm text-[#5b7a9d] font-semibold items-center ">
									9:00 AM
								</span>
								<button className="p-5 h-12 bg-red-600 rounded-[7px] flex justify-center text-sm font-semibold items-center ">
									X
								</button>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
