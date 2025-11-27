import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from '../../../domain/game.model';
import { GameRepository } from '../../../domain/game.repository';
import { GameEntity } from '../entities/game.entity';

@Injectable()
export class TypeOrmGameRepository implements GameRepository {
    constructor(
        @InjectRepository(GameEntity)
        private readonly repository: Repository<GameEntity>,
    ) { }

    async create(game: Game): Promise<Game> {
        const entity = this.toEntity(game);
        await this.repository.save(entity);
        return this.toDomain(entity);
    }

    async findAll(): Promise<Game[]> {
        const entities = await this.repository.find();
        return entities.map((entity) => this.toDomain(entity));
    }

    async findById(id: string): Promise<Game | null> {
        const entity = await this.repository.findOneBy({ id });
        return entity ? this.toDomain(entity) : null;
    }

    async update(game: Game): Promise<void> {
        const entity = this.toEntity(game);
        await this.repository.save(entity);
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    private toEntity(game: Game): GameEntity {
        const entity = new GameEntity();
        entity.id = game.id;
        entity.name = game.name;
        entity.genre = game.genre;
        entity.platform = game.platform;
        entity.releaseDate = game.releaseDate;
        entity.price = game.price;
        return entity;
    }

    private toDomain(entity: GameEntity): Game {
        return new Game(
            entity.id,
            entity.name,
            entity.genre,
            entity.platform,
            entity.releaseDate,
            Number(entity.price),
        );
    }
}
