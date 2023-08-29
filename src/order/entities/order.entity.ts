import { product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

@Entity('', {orderBy:{OrderId:'DESC'}})
export class Order {
    @PrimaryGeneratedColumn()
    OrderId: number;
    @Column()
    Orderqty: number;
    @Column()
    OrderDate: Date;

    @Column()
    ProdId: number;
    @ManyToOne(() => product, Product => Product.order)
    @JoinColumn({name: 'ProdId'})
    Product: product

    @Column()
    UserId: number;
    @ManyToOne(() => User, user => user.order)
    @JoinColumn({name: 'UserId'})
    user: User
}
