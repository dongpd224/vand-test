import { Pipe, PipeTransform } from '@angular/core';
import PokemonService from './pokemon.service';
import { PokemonType } from '../dto';

@Pipe({
  name: 'convertTypeToValue',
  standalone: true
})
export class TypeToValuePipe implements PipeTransform {
  pokemonType : PokemonType[]= this.pokemonService.pokemonType();
  constructor(private pokemonService: PokemonService) {
  }
  transform(type: number | null): string {
    const typeName = this.pokemonType.find(t => t.id === type)?.name;

    return typeName || 'Unknown';
  }
}