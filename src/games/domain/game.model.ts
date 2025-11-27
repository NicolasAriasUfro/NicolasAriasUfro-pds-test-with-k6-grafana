export class Game {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly genre: string,
    public readonly platform: string,
    public readonly releaseDate: Date,
    public readonly price: number,
  ) {}
}
