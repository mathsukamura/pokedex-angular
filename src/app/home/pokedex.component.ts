import {  Component,OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
})

export class PokedexComponent implements OnInit {

  pokemonName: string = 'Loading...';
  pokemonNumber: number = 1;
  pokemonImage: string = "";
  input: string = '';
  searchPokemon: number = 1;

  constructor(private http: HttpClient) {}

  fetchPokemon(pokemon: number) {
    return this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  }

  renderPokemon(pokemon: string) {
    this.pokemonName = 'Loading...';
    this.pokemonNumber = 1;

    this.fetchPokemon(parseInt(pokemon.toLowerCase())).subscribe(
      data => {
        this.pokemonImage = data.sprites.versions['generation-v']['black-white'].animated.front_default;
        this.pokemonName = data.name;
        this.pokemonNumber = data.id;
        this.input = '';
        this.searchPokemon = data.id;
      },
      error => {
        this.pokemonImage = "";
        this.pokemonName = 'Not found :c';
        this.pokemonNumber = 1;
      }
    );
  }

  onFormSubmit(event: any) {
    event.preventDefault();
    this.renderPokemon(this.input);
  }

  onButtonPrevClick() {
    if (this.searchPokemon > 1) {
      this.searchPokemon -= 1;
      this.renderPokemon(this.searchPokemon.toString());
    }
  }

  onButtonNextClick() {
    this.searchPokemon += 1;
    this.renderPokemon(this.searchPokemon.toString());
  }

  ngOnInit() {
    this.renderPokemon(this.searchPokemon.toString());
  }

}

