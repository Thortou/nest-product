import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'location' })
export class LocationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 6 }) // Latitude
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 6 }) // Longitude
  longitude: number;

  @Column({ type: 'text' }) // Location Name or Address
  locationName: string;

  @Column()
  UserId: number;
  @ManyToOne(() => User, user => user.received)
  @JoinColumn({ name: 'UserId' })
  user: User;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) // Timestamp for when the location was created
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }) // Timestamp for when the location was updated
  updatedAt: Date;

}
