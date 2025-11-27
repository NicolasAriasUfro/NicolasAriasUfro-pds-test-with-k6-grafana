import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamesController } from './web/games.controller';
import { GameEntity } from './persistence/entities/game.entity';
import { TypeOrmGameRepository } from './persistence/repositories/typeorm-game.repository';
import { CreateGameUseCase } from '../application/create-game.usecase';
import { FindAllGamesUseCase } from '../application/find-all-games.usecase';
import { FindGameByIdUseCase } from '../application/find-game-by-id.usecase';
import { UpdateGameUseCase } from '../application/update-game.usecase';
import { DeleteGameUseCase } from '../application/delete-game.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([GameEntity])],
  controllers: [GamesController],
  providers: [
    {
      provide: 'GameRepository',
      useClass: TypeOrmGameRepository,
    },
    {
      provide: 'CreateGameUseCase',
      useFactory: (repo) => new CreateGameUseCase(repo),
      inject: ['GameRepository'],
    },
    {
      provide: 'FindAllGamesUseCase',
      useFactory: (repo) => new FindAllGamesUseCase(repo),
      inject: ['GameRepository'],
    },
    {
      provide: 'FindGameByIdUseCase',
      useFactory: (repo) => new FindGameByIdUseCase(repo),
      inject: ['GameRepository'],
    },
    {
      provide: 'UpdateGameUseCase',
      useFactory: (repo) => new UpdateGameUseCase(repo),
      inject: ['GameRepository'],
    },
    {
      provide: 'DeleteGameUseCase',
      useFactory: (repo) => new DeleteGameUseCase(repo),
      inject: ['GameRepository'],
    },
  ],
})
export class GamesModule {}
