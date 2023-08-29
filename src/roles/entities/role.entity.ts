import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('', {orderBy: {roleId: 'DESC'}})
export class role {
    @PrimaryGeneratedColumn()
    roleId : number;
    @Column()
    roleName: string;

    @ManyToMany(() => User, user => user.has)
    user: User[]; 
} 
 