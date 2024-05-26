export interface PokemonFilters {
  pageNumber: number;
  pageSize: number;
  sort: string;
  name?: string;
  generation?: number;
  legendary?: number;
  pokemonType?: number;
  min_total?: number;
  max_total?: number;
  min_speed?: number;
  max_speed?: number;
  min_sp_def?: number;
  max_sp_def?: number;
  min_sp_atk?: number;
  max_sp_atk?: number;
  min_hp?: number;
  max_hp?: number;
  min_defense?: number;
  max_defense?: number;
  min_attack?: number;
  max_attack?: number;
}