import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GiveawaySweeper } from './giveaway-sweeper.entity';

@Entity()
export class Sweeper {
  @PrimaryGeneratedColumn('uuid')
  id_sweeper: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  id_discord: string;

  @Column({ type: 'varchar', length: 50 })
  username: string;

  @Column({ type: 'varchar', length: 40 })
  avatar: string;

  @OneToMany(
    () => GiveawaySweeper,
    (giveawaySweeper) => giveawaySweeper.sweeper,
  )
  giveawaySweeper: GiveawaySweeper[];
}
