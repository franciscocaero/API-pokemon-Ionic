import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.page.html',
  styleUrls: ['./pokemon-list.page.scss'],
})
export class PokemonListPage implements OnInit {
  pokemonName: string = '';  
  pokemon: any = {};         
  pokemonImageUrl: string = '';
  loading: boolean = false;
  errorMessage: string = '';  

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {}

  searchPokemon() {
    if (this.pokemonName.trim() === '') {
      return; 
    }

    this.loading = true;
    this.errorMessage = ''; 

    this.pokemonService.getPokemonDetails(this.pokemonName.toLowerCase()).subscribe({
      next: (response) => {
        this.pokemon = response;
        this.pokemonImageUrl = this.pokemonService.getPokemonImage(this.pokemon.id); 
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching Pokémon:', error);
        this.loading = false;
        this.errorMessage = 'Pokémon no encontrado. Intenta nuevamente.'; 
      },
    });
  }
}
