import { Todo } from "src/api/todo/entities/todo.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany,  } from "typeorm";

@Entity({ name: 'users', schema: 'public' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column({ nullable: true })
    refreshToken: string;

    @OneToMany(() => Todo, (todo) => todo.user)
    todo: Todo[];
}
