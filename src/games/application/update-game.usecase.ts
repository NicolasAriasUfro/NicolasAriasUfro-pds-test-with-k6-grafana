import { Game } from '../domain/game.model';
import { GameRepository } from '../domain/game.repository';

export class UpdateGameUseCase {
    constructor(private readonly gameRepository: GameRepository) { }

    async execute(
        id: string,
        name?: string,
        genre?: string,
        platform?: string,
        releaseDate?: Date,
        price?: number,
    ): Promise<void> {
        const existingGame = await this.gameRepository.findById(id);
        if (!existingGame) {
            throw new Error('Game not found');
        }

        const updatedGame = new Game(
            existingGame.id,
            name ?? existingGame.name,
            genre ?? existingGame.genre,
            platform ?? existingGame.platform,
            releaseDate ?? existingGame.releaseDate,
            price ?? existingGame.price,
        );

        await this.gameRepository.update(updatedGame);
    }
}
