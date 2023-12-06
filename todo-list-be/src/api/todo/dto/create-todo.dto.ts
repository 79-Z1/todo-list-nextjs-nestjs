import { IsNotEmpty } from "class-validator";

export class CreateTodoDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    time: Date;

    @IsNotEmpty()
    user: number;
}
