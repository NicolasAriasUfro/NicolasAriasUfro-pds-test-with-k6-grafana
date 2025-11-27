import { Game } from '../domain/game.model';
import { GameRepository } from '../domain/game.repository';

export class FindAllGamesUseCase {
  constructor(private readonly gameRepository: GameRepository) {}

  async execute(): Promise<Game[]> {
    return this.gameRepository.findAll();
  }
}
