import { Component, Inject, inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogTitle,} from '@angular/material/dialog';
import { TypeToValuePipe } from '../pokemon.pipe';
import { Pokemon } from '../../dto';
import PokemonService from '../pokemon.service';
import { map } from 'rxjs';
import { main } from '../../shared/pokemon.api';
@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, TypeToValuePipe],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss'
})
export class PokemonDetailComponent {
  pokemonData!: Pokemon
  imgUrl = ''
  public data = inject(MAT_DIALOG_DATA)

  
  constructor(
    private pokemonservice : PokemonService
  ) {
    this.imgUrl = main + '/' + this.data + '/sprite'
    this.pokemonservice.getPokemonDetail(this.data).pipe(map(res => res.data)).subscribe(response => {
      this.pokemonData = response as Pokemon
    })
  }
}