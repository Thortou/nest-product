import { product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, OneToMany, ManyToOne } from "typeorm";

@Entity('', {orderBy: {CateId: 'DESC'}}) 
export class categories {
@PrimaryGeneratedColumn()
CateId: number;
@Column()
CateName: string;

@CreateDateColumn()
CreateAt: Date; 

@OneToMany(() => product, product => product.categories)
product: product[]

@ManyToOne(() => User, user => user.Categories)
user: User

}
