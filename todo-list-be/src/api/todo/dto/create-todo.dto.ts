import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateTodoDto {
    @ApiProperty({
        example: 'Chơi game',
        required: true
    })
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: "2023-12-07T19:00:00",
        required: true
    })
    @IsNotEmpty()
    time: Date;
    
    @ApiProperty({
        example: 1,
        required: true
    })
    @IsNotEmpty()
    user: number;
}
