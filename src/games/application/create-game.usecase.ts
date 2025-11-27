import { Game } from '../domain/game.model';
import { CreateGameDto } from './dto/create-game.dto';
import { GameRepository } from '../domain/game.repository';

export class CreateGameUseCase {
  constructor(private readonly gameRepository: GameRepository) {}

  async execute(createGameDto: CreateGameDto): Promise<Game> {
    const game = new Game(
      crypto.randomUUID(),
      createGameDto.name,
      createGameDto.genre,
      createGameDto.platform,
      createGameDto.releaseDate,
      createGameDto.price,
    );
    return this.gameRepository.create(game);
  }
}
