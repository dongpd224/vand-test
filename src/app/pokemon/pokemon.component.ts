import { Component, ViewChild, effect, inject, signal, viewChild } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import PokemonService from './pokemon.service';
import { Pokemon, PokemonType } from '../dto';
import {
  MatDialog,
} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TypeToValuePipe } from './pokemon.pipe';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { PokemonFilters } from '../interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [SharedModule, TypeToValuePipe],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.scss'
})
export class PokemonComponent {
  private pokemonService = inject(PokemonService);
  private dialog = inject(MatDialog);
  initSortCol = {
    number : false, 
    name : false, 
    hp : false, 
    attack : false, 
    defense : false, 
    sp_atk : false, 
    sp_def : false, 
    speed : false, 
    generation : false, 
    legendary : false, 
    total : false}
  sortCol = signal(this.initSortCol)
  @ViewChild('type') typeSelect!: MatSelect;
  pokemonTypes : PokemonType[] = []
  filterForm: FormGroup;
  dataSource = new MatTableDataSource<Pokemon>();;
  pokemons: Pokemon[] = [];
  totalPokemons :  Pokemon[] = [];
  displayedColumns: string[] = ['number', 'name', 'type_1', 'type_2', 'hp', 'attack', 'defense', 'sp_atk', 'sp_def', 'speed', 'generation', 'legendary', 'total']
  filterColumns : string[] = ['numberFilter', 'nameFilter', 'typeFilter', 'hpFilter', 'attackFilter', 'defenseFilter', 'spAtkFilter', 'spDefFilter', 'speedFilter', 'generationFilter', 'legendaryFilter', 'totalFilter']
  totalItems: number = 0;
  pageSizeOptions: number[] = [10, 20, 30, 100];
  maxPageSize : number = 0
  filters : PokemonFilters = {
    pageNumber: 1,
    pageSize: 10,
    sort: 'number',
  }

  constructor(
    private fb: FormBuilder
  ) {
    this.handleSignal()
    this.loadPokemons(this.filters);
    this.filterForm = this.fb.group({
      name: [''],
      id: [''],
      pokemonType: [''],
      min_hp: [''],
      max_hp: [''],
      min_attack: [''],
      max_attack: [''],
      min_defense: [''],
      max_defense: [''],
      min_spAtk: [''],
      max_spAtk: [''],
      min_spDef: [''],
      max_spDef: [''],
      min_speed: [''],
      max_speed: [''],
      min_total: [''],
      max_total: [''],
      generation: [''],
      legendary: [''],
    });
    this.filterForm.valueChanges.pipe(
      debounceTime(500),
      switchMap((value) => {
        this.filters = {
          ...this.filters,
          ...value
        }
        return this.pokemonService.getPokemons(this.filters)
      })
    ).subscribe(response => {
      this.pokemons = response.data as Pokemon[];
      this.dataSource.data = this.pokemons;
      this.totalItems = response.meta.total;
    })
  }
  handleSignal = () => {
    effect(() => {
      this.pokemonTypes = this.pokemonService.pokemonType()
    })
  }

  loadPokemons(filters : PokemonFilters) {
    this.pokemonService.getPokemons(filters).subscribe(response => {
      this.sortCol.update(() => {
        return {
          ...this.initSortCol,
          [filters.sort]: true
        }
      })
      this.pokemons = response.data as Pokemon[];
      this.maxPageSize = response.meta.total
      this.dataSource.data = this.pokemons;
      this.totalItems = response.meta.total;
    });
  }

  pageChanged(event: any) {
    this.filters.pageNumber = event.pageIndex + 1;
    this.filters.pageSize = event.pageSize;
    this.loadPokemons(this.filters);
  }
  onRowClicked(row: any) {
    this.dialog.open(PokemonDetailComponent, {
      data: row.id,
      width: '50%',
    })
  }
  sortData($event: any) {
    this.filters.sort = $event.target.outerText.toLowerCase().replace(/\s+/g, '_').replace(/\./g, '');
    this.loadPokemons(this.filters)
    }
}
