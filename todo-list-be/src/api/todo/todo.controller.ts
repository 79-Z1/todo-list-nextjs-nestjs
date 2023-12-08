import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiBody, ApiHeader, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('todo')
@ApiTags('todos')
@ApiHeader({
  name: 'Authorization',
  required: true,
  description: 'Bearer token for authentication.',
  schema: {
    type: 'string',
  },
})
export class TodoController {
  constructor(private readonly todoService: TodoService) { }
  
  @Post()
  @ApiOperation({
    summary: 'Add new todo'
  })
  @ApiBody({
    type: CreateTodoDto,
    description: 'Json structure for create new todo',
  })
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all todos'
  })
  findAll() {
    return this.todoService.findAll();
  }
  
  @Get(':id')
  @ApiOperation({
    summary: 'Get todo by id'
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the todo item.',
    required: true,
    type: 'number',
    example: '7',
  })
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(+id);
  }

  @Get('user/:id')
  @ApiOperation({
    summary: 'Get all user todo by user id'
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the user.',
    required: true,
    type: 'number',
    example: '1',
  })
  findByUserId(@Param('id') id: string) {
    return this.todoService.findByUserId(+id);
  }

  @ApiOperation({
    summary: 'Update todo'
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the todo item.',
    required: true,
    type: 'number',
    example: '7'
  })
  @ApiBody({
    type: UpdateTodoDto,
    description: 'Json structure for update todo',
  })
  @Patch(':id') 
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }
  
  @Patch('status/:id')
  @ApiOperation({
    summary: 'Update todo status'
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the todo item.',
    required: true,
    type: 'number',
    example: '7'
  })
  @ApiBody({
    type: UpdateTodoDto,
    description: 'Json structure for update todo status',
  })
  updateStatus(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.updateStatus(+id, updateTodoDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete todo by id'
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the todo item.',
    required: true,
    type: 'number',
    example: '1',
  })
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
