import {observable} from 'mobx';

class TypesStore {
    @observable url = 'https://pokeapi.co/api/v2/type';
    @observable pokemon = [];
    @observable types = [];
    @observable images = [];
    @observable name = '';
}
export const PokemonStore = new TypesStore();