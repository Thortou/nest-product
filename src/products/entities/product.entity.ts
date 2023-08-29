import { categories } from "src/categories/entities/category.entity";
import { Order } from "src/order/entities/order.entity";
import { received } from "src/received/entities/received.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToOne} from "typeorm";

@Entity('', {
    orderBy:{
        ProdId:'DESC'
    }
})
export class product {
    @PrimaryGeneratedColumn()
    ProdId: number;
    @Column()
    ProdName: string;

    @Column()
    qty: number;
    
    @Column('decimal', { precision: 10, scale: 2 })
    sprice: number;

    @Column('decimal', { precision: 10, scale: 2 })
    bprice: number;

    @Column()
    CateId: number;
    @ManyToOne(() => categories, category => category.product, {onDelete: 'SET NULL'})
    @JoinColumn({name: 'CateId'})
    categories: categories;

    @OneToMany(() => received, Received => Received.product)
    received: received;

    @OneToMany(() => Order, order => order.Product)
    order: Order

    @Column()
    UserId: number;
    @ManyToOne(() => User, user => user.Product)
    @JoinColumn({name: 'UserId'})
    user: User
    
    
}
