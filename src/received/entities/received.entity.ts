import { product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity(' ', {
    orderBy: {
        ReId: 'DESC'
    }
})
export class received {
    @PrimaryGeneratedColumn()
    ReId: number;
    @Column()
    Reqty: number;
    @Column() 
    ReDate: Date;

    @Column()
    ProdId: number;
    @ManyToOne(() => product, Product => Product.received)
    @JoinColumn({ name: 'ProdId' })
    product: product;

    @Column() 
    UserId: number;
    @ManyToOne(() => User, user => user.received)
    @JoinColumn({ name: 'UserId' })
    user: User;
}
