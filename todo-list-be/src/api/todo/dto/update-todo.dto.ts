import { ApiProperty } from "@nestjs/swagger";

export class UpdateTodoDto {
    @ApiProperty({
        example: 'Học bài'
    })
    name: string;

    @ApiProperty({
        example: "2023-12-07T19:00:00"
    })
    time: Date;

    @ApiProperty({
        example: true
    })
    status: boolean
}
