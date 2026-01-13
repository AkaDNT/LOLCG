import { Controller, Get } from '@nestjs/common';
import { CardsService } from './cards.service';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}
  @Get()
  getCards() {
    return [
      { id: 'c1', name: 'Firebolt', mana: 1 },
      { id: 'c2', name: 'Shield', mana: 2 },
      { id: 'c3', name: 'Dragon', mana: 7 },
    ];
  }
}
