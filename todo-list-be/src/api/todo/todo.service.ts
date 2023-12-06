import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodoService {
  constructor(
		@InjectRepository(Todo)
		private todo: Repository<Todo>,
	) { }

  create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const newTodo = this.todo.create(createTodoDto);
    return this.todo.save(newTodo);
  }

  async findAll(): Promise<Todo[]> {
    return (await this.todo.find()).sort((a,b) => +new Date(b.time) - +new Date(a.time))
  }

  async findByUserId(userId: number): Promise<Todo[]> {
    return (await this.todo.findBy({user: userId}))
          .sort((a,b) => +new Date(b.time) - +new Date(a.time))
  }

  async findOne(id: number): Promise<Todo> {
    return await this.todo.findOne({ where: { id } });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    await this.todo.update(id, updateTodoDto);
    return this.todo.findOne({ where: { id } })
  }

  async updateStatus(id: number,  updateTodoDto: UpdateTodoDto): Promise<Todo[]> {
    await this.todo.update(id, updateTodoDto);
    return (await this.todo.find()).sort((a,b) => +new Date(b.time) - +new Date(a.time))
  }

  remove(id: number) {
    return this.todo.delete({ id });
  }
}
