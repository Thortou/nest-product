import { categories } from "src/categories/entities/category.entity";
import { Order } from "src/order/entities/order.entity";
import { product } from "src/products/entities/product.entity";
import { received } from "src/received/entities/received.entity";
import { role } from "src/roles/entities/role.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    UserId : number;
    @Column()
    UserName: string;
    @Column()
    Gmail: string;
    @Column()
    Tel : string;
    @Column()
    Password : string;

    @OneToMany(() => categories, Categories => Categories.user)
    Categories: categories

    @OneToMany(() => product, Product => Product.user)
    Product: product

    @OneToMany(() => received, received => received.user)
    @JoinColumn({name:'UserName'})
    received: received

    @OneToMany(() => Order, order => order.user)
    order: Order

    @ManyToMany(() => role, roles => roles.user)
    @JoinTable()
    has: role[]
  users: role;
}
