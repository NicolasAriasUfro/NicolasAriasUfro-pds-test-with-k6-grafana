import { GameRepository } from '../domain/game.repository';

export class DeleteGameUseCase {
  constructor(private readonly gameRepository: GameRepository) {}

  async execute(id: string): Promise<void> {
    await this.gameRepository.delete(id);
  }
}
