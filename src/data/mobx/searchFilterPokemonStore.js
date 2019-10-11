import {observable} from "mobx";

class SearchStore {
    @observable pokemonId = [];
    @observable pokemonName = [];
    @observable searchPokemon = [];
    @observable imagesFront = null;
    @observable imagesBack = null;
    @observable searchType = [];
    @observable searchAbilities = [];
}

export const SearchFilterPokemonStore = new SearchStore();