import {observable} from "mobx";

class ListStore {
    @observable pokemon = [];
    @observable currentPage = 'https://pokeapi.co/api/v2/pokemon';
    @observable nextPage = this.currentPage;
    @observable prewPage = this.currentPage;
    @observable loading = true;
}

export const PokemonListStore = new ListStore();