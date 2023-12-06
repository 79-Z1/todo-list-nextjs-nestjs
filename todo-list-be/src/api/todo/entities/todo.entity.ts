import { User } from "src/api/user/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,  } from "typeorm";

@Entity({ name: 'todos', schema: 'public' })
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false }) 
    name: string;

    @Column({ nullable: false })
    time: Date;

    @Column({ default: false })
    status: boolean;

    @ManyToOne(() => User, (user: User) => user.todo)
    user: number;
}
