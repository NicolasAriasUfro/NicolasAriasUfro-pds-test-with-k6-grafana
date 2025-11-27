import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('games')
export class GameEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  genre: string;

  @Column()
  platform: string;

  @Column()
  releaseDate: Date;

  @Column('decimal')
  price: number;
}
