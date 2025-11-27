import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
    Inject,
    NotFoundException,
} from '@nestjs/common';
import { CreateGameUseCase } from '../../application/create-game.usecase';
import { FindAllGamesUseCase } from '../../application/find-all-games.usecase';
import { FindGameByIdUseCase } from '../../application/find-game-by-id.usecase';
import { UpdateGameUseCase } from '../../application/update-game.usecase';
import { DeleteGameUseCase } from '../../application/delete-game.usecase';
import { Game } from '../../domain/game.model';

@Controller('games')
export class GamesController {
    constructor(
        @Inject('CreateGameUseCase')
        private readonly createGameUseCase: CreateGameUseCase,
        @Inject('FindAllGamesUseCase')
        private readonly findAllGamesUseCase: FindAllGamesUseCase,
        @Inject('FindGameByIdUseCase')
        private readonly findGameByIdUseCase: FindGameByIdUseCase,
        @Inject('UpdateGameUseCase')
        private readonly updateGameUseCase: UpdateGameUseCase,
        @Inject('DeleteGameUseCase')
        private readonly deleteGameUseCase: DeleteGameUseCase,
    ) { }

    @Post()
    async create(@Body() createGameDto: any): Promise<Game> {
        return this.createGameUseCase.execute(
            createGameDto.name,
            createGameDto.genre,
            createGameDto.platform,
            new Date(createGameDto.releaseDate),
            createGameDto.price,
        );
    }

    @Get()
    async findAll(): Promise<Game[]> {
        return this.findAllGamesUseCase.execute();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Game> {
        const game = await this.findGameByIdUseCase.execute(id);
        if (!game) {
            throw new NotFoundException(`Game with ID ${id} not found`);
        }
        return game;
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateGameDto: any,
    ): Promise<void> {
        return this.updateGameUseCase.execute(
            id,
            updateGameDto.name,
            updateGameDto.genre,
            updateGameDto.platform,
            updateGameDto.releaseDate ? new Date(updateGameDto.releaseDate) : undefined,
            updateGameDto.price,
        );
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.deleteGameUseCase.execute(id);
    }
}
