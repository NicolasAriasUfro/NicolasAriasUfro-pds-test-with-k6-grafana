import { Game } from './game.model';

export interface GameRepository {
  create(game: Game): Promise<Game>;
  findAll(): Promise<Game[]>;
  findById(id: string): Promise<Game | null>;
  update(game: Game): Promise<void>;
  delete(id: string): Promise<void>;
}
