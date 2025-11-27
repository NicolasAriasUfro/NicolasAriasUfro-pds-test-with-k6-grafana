import { Game } from '../domain/game.model';
import { GameRepository } from '../domain/game.repository';

export class FindGameByIdUseCase {
    constructor(private readonly gameRepository: GameRepository) { }

    async execute(id: string): Promise<Game | null> {
        return this.gameRepository.findById(id);
    }
}
