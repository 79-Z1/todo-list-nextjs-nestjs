'use client';
import { useTodo } from '@/app/hooks/useTodo';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { FC, useEffect } from 'react';

interface ITodoDetailProps {
	params: { id: string };
}

const TodoDetail: FC<ITodoDetailProps> = ({ params }) => {
    const { todo, getDetail } = useTodo();
    const { push } = useRouter();
	const id = params.id;

	const time = (time: Date) => {
		return {
			getDate: () => {
				return moment(time).format('YYYY-MM-DD');
			},
			getHour: () => {
				return moment(time).format('HH:mm');
			}
		};
	};

    const getBack = () => {
		push('/todo');
    }

	useEffect(() => {
		getDetail(parseInt(id));
	}, [getDetail, id]);
	return (
		<section className="text-gray-700 body-font overflow-hidden bg-white">
			<div className="container px-5 py-24 mx-auto">
				<div className="lg:w-4/5 mx-auto flex flex-wrap justify-center">
					<div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
						<h2 className="text-sm title-font text-gray-500 tracking-widest">
							TÊN CÔNG VIỆC
						</h2>
						<h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
							{todo.name}
						</h1>
						<p className="leading-relaxed">
							Ngày tới hạn: {time(todo.time).getDate()}
						</p>
						<p className="leading-relaxed">
							Giờ tới hạn: {time(todo.time).getHour()}
						</p>
						<div className="flex items-center">
							<p
								className={
									'leading-relaxed ' + (todo.status
										? 'text-green-600'
										: 'text-red-600')
								}
							>
								{todo.status
									? ' Đã hoàn thành'
									: ' Chưa hoàn thành'
                                }
							</p>
							<button 
                                className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                                onClick={getBack}
                            >
								Quay lại
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default TodoDetail;
