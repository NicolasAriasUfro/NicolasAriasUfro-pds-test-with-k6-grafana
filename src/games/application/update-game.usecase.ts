import { Game } from '../domain/game.model';
import { UpdateGameDto } from './dto/update-game.dto';
import { GameRepository } from '../domain/game.repository';

export class UpdateGameUseCase {
  constructor(private readonly gameRepository: GameRepository) { }

  async execute(id: string, updateGameDto: UpdateGameDto): Promise<void> {
    const existingGame = await this.gameRepository.findById(id);
    if (!existingGame) {
      throw new Error('Game not found');
    }

    const updatedGame = new Game(
      existingGame.id,
      updateGameDto.name ?? existingGame.name,
      updateGameDto.genre ?? existingGame.genre,
      updateGameDto.platform ?? existingGame.platform,
      updateGameDto.releaseDate ?? existingGame.releaseDate,
      updateGameDto.price ?? existingGame.price,
    );

    await this.gameRepository.update(updatedGame);
  }
}
