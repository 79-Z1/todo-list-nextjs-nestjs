import { create } from 'zustand'
import { ICreateTodo, ITodo } from '../api/types/todo.type';
import { axiosDelete, axiosGet, axiosPatch, axiosPost } from '../api/axios.interceptor';

type State = {
    todo: ITodo,
    todos: ITodo[]
};

type Actions = {
    create: (todo: ICreateTodo) => void,
    getAll: (userId: number) => void,
    getDetail: (todoId: number) => void,
    updateStatus: (id: number, status: boolean) => void,
    deleteTodo: (id: number, userId: number) => void
};

const initialState: State = { todo: {} as ITodo, todos: [] };

export const useTodo = create<State & Actions>()(
    (set) => ({
        ...initialState,
        create: async (todo: ICreateTodo) => {
            try {
                await axiosPost('/todo', { ...todo })
                const todos: ITodo[] = await axiosGet(`/todo/user/${todo.user}`)
                set({ todos });
            } catch (error) {
                console.log('Create todo err:::', error);
            }
        },
        getAll: async (userId: number) => {
            const todos: ITodo[] = await axiosGet(`/todo/user/${userId}`)
            set({ todos });
        },
        getDetail: async (todoId: number) => {
            const todo: ITodo = await axiosGet(`/todo/${todoId}`)
            set({ todo });
        },
        updateStatus: async (id: number, status: boolean) => {
            const todos: ITodo[] = await axiosPatch(`/todo/status/${id}`, {
                status: status
            })
            set({ todos });
        },
        deleteTodo: async (id: number, userId: number) => {
            await axiosDelete(`/todo/${id}`)
            const todos: ITodo[] = await axiosGet(`/todo/user/${userId}`)
            set({ todos });
        }
    })
);