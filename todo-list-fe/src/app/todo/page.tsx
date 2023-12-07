'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AiOutlineCheck } from 'react-icons/ai';
import moment from 'moment';
import FormInput from '@/components/formInput';
import { useTodo } from '@/hooks/useTodo';

export default function Todo() {
	const { push } = useRouter();
	const [todo, setTodo]: any = useState('');
	const [userId, setUserId]: any = useState(null);
	const [date, setDate]: any = useState(() => {
		return moment().format('YYYY-MM-DD');
	});
	const [time, setTime] = useState(() => {
		return moment().format('HH:mm');
	});
	const { todos, getAll, create, updateStatus, deleteTodo } = useTodo();	


	useEffect(() => {
		const uId: string = localStorage.getItem('UserId') || '';
		setUserId(parseInt(uId));
		getAll(parseInt(userId));
	}, [getAll, userId]);

	function changeStatus(id: number, status: boolean) {
		updateStatus(id, status);
	}

	function handleAdd() {
		if(!todo) return;
		const toDateTime = moment(`${date}T${time}`).format();
		create({
			user: userId,
			name: todo,
			time: new Date(toDateTime)
		})
		setTodo('');
	}

	function handleDelete(id: number) {
		deleteTodo(id, userId)
	}

	function formatDateTime(time: string) {
		const datetime = moment(time).format('YYYY-MM-DD, HH:mm');
		return datetime;
	}

	return (
		<div className="relative flex justify-center items-center min-h-screen bg-[#cbd7e3]">
			<div className="h-auto w-3/5 bg-white rounded-lg p-4">
				<p className="text-3xl text-center font-semibold mt-2 text-[#063c76]">
					To-do List
				</p>
				<div className="w-full mt-4 flex text-sm flex-col text-center justify-start ">
					<div className="md:flex justify-center md:items-center mb-6">
						<FormInput 
							width="w-1/3" 
							label="Ngày" 
							type="date" 
							value={date}
							setActivity={(e:any) => setDate(e)}
						/>
						<FormInput 
							width="w-1/3" 
							label="Giờ" 
							type="time" 
							value={time}
							setActivity={(e:any) => setTime(e)}
						/>
						<FormInput
							width="w-1/3"
							label="Tên công việc"
							type="text"
							value= {todo}
							setActivity={(e:any) => setTodo(e)}
						/>
					</div>
					<div className="md:flex md:items-center justify-center mb-6">
						<div className="md:w-1/3">
							<button
								className="w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
								onClick={handleAdd}
							>
								Thêm
							</button>
						</div>
					</div>
				</div>
				<ul className="my-4 ">
					{todos.map((todo) => (
						<li className=" mt-4" key={todo.id}>
							<div className="flex gap-2">
								<div className="w-9/12 h-12 bg-[#e0ebff] rounded-[7px] flex justify-start items-center px-3">
									<span
										className={
											'w-7 h-7 bg-white rounded-full border border-white transition-all cursor-pointer hover:border-[#36d344] flex justify-center items-center' +
											(todo.status && ' green')
										}
										onClick={() =>
											changeStatus(todo.id, !todo.status)
										}
									>
										{todo.status && <AiOutlineCheck />}
									</span>
									<span
										className={
											'cursor-pointer text-sm ml-4 w-full p-3 text-[#5b7a9d] font-semibold ' +
											(todo.status && 'strike')
										}
										onClick={() => push(`/todo/${todo.id}`)}
									>
										{todo.name}
									</span>
								</div>
								<span className="w-1/4 h-12 bg-[#e0ebff] rounded-[7px] flex justify-center text-sm text-[#5b7a9d] font-semibold items-center ">
									{formatDateTime(todo.time.toString())}
								</span>
								<button 
									className="p-5 h-12 bg-red-600 rounded-[7px] flex justify-center text-sm font-semibold items-center "
									onClick={() => {
										handleDelete(todo.id)
									}}
								>
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
