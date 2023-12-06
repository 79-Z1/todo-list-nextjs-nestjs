export interface IUser {
    id: number
}

export interface ITodo {
    id: number,
    name: string,
    time: Date,
    status: Boolean,
    user: IUser
}

export interface ICreateTodo {
    name: string,
    time: Date,
    user: IUser
}
