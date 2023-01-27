import { Component } from "@angular/core";

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
})

export class pokedexComponent{

}

const namePokemon = document.querySelector('.pokemonName') as any ;

const fetchpokemon =async (pokemon: string = "") => {
  const APIResponse= await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  const data = await APIResponse.json();
  return data
}

const renderPokemon = async (pokemon: string ="") =>{
  const data = await fetchpokemon(pokemon);
  namePokemon.innerHTML= data.nome

}

renderPokemon('1')
