import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'post'})
export class PostEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    posts: string;
    @Column()   
    content: string;  
    @Column()
    startDate: Date;
    @Column()
    endDate: Date;
    @Column({type: 'varchar', length:25, default:'active'})
    status: string;
}
