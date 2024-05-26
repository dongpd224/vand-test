import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, WritableSignal, signal } from "@angular/core";
import { Observable, map } from "rxjs";
import * as DTO from "../dto";
import { main, type } from "../shared/pokemon.api";
import { PokemonFilters } from "../interface";

@Injectable(  {providedIn: 'root'})
export default class PokemonService {
  public pokemonType: WritableSignal<DTO.PokemonType[]> = signal([]);
  constructor(private http: HttpClient) {
    this.getType().subscribe(response => {
      this.pokemonType.set(response.data as DTO.PokemonType[]);
    })
  }

  getType() {
    return this.http.get<DTO.BaseApiResponse<DTO.PokemonType>>(type);
  }
  getPokemons(filters: PokemonFilters): Observable<DTO.BaseApiResponse<DTO.Pokemon>> {
    const url = main;
    let params = ''
    console.log(filters)
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        let paramKey: string;

        switch (key) {
          case 'pageNumber':
            paramKey = 'page[number]';
            break;
          case 'pageSize':
            paramKey = 'page[size]';
            break;
          case 'sort':
            paramKey = 'sort';
            break;
          case 'pokemonType':
            paramKey = 'filter[type]';
            break;
          case 'minSpeed':
            paramKey = 'filter[min_speed]';
            break;
          case 'maxSpeed':
            paramKey = 'filter[max_speed]';
            break;
          case 'minSpDef':
            paramKey = 'filter[min_sp_def]';
            break;
          case 'maxSpDef':
            paramKey = 'filter[max_sp_def]';
            break;
          case 'minSpAtk':
            paramKey = 'filter[min_sp_atk]';
            break;
          case 'maxSpAtk':
            paramKey = 'filter[max_sp_atk]';
            break;
          case 'max_spAtk':
            paramKey = 'filter[max_sp_atk]';
            break;
          case 'min_spAtk':
            paramKey = 'filter[min_sp_atk]';
            break;
          case 'min_spDef':
            paramKey = 'filter[min_sp_def]';
            break;
          case 'max_spDef':
            paramKey = 'filter[min_sp_def]';
            break;
          default:
            paramKey = `filter[${key}]`;
        }

        params = params + `&${paramKey}=${value}`;
      }
    });
    return this.http.get<DTO.BaseApiResponse<DTO.Pokemon>>(url + '?' + params);
  }
  getPokemonDetail(id: number): Observable<DTO.BaseApiResponse<DTO.Pokemon>> {
    const url = main + '/' + id;
    return this.http.get<DTO.BaseApiResponse<DTO.Pokemon>>(url);
  }
}