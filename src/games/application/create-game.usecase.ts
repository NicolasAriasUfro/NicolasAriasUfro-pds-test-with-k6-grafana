import { Game } from '../domain/game.model';
import { GameRepository } from '../domain/game.repository';

export class CreateGameUseCase {
    constructor(private readonly gameRepository: GameRepository) { }

    async execute(
        name: string,
        genre: string,
        platform: string,
        releaseDate: Date,
        price: number,
    ): Promise<Game> {
        const game = new Game(
            crypto.randomUUID(),
            name,
            genre,
            platform,
            releaseDate,
            price,
        );
        return this.gameRepository.create(game);
    }
}
