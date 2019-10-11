import React, {useEffect} from 'react';
import {PokemonCard} from "./pokemonCard";
import {Pagination} from "./functions/pagination";
import {NumberOfPokemon} from "./functions/numberOfPokemon";
import Axios from "axios";
import {observer} from "mobx-react";
import {PokemonListStore} from "../mobx/pokemonListStore";

export const PokemonList = observer(() => {

    //const [pokemon, setPokemon] = useState([]);
    //const [currentPage, setCurrentPage] = useState('https://pokeapi.co/api/v2/pokemon');
    //const [nextPage, setNextPage] = useState(currentPage);
    //const [prevPage, setPrevPage] = useState(currentPage);
    //const [loading, setLoading] = useState(true);

    useEffect(() => {
        PokemonListStore.loading = true;
        Axios.get(PokemonListStore.currentPage)
            .then(response => {
                PokemonListStore.loading = false;
                PokemonListStore.nextPage = response.data.next;
                PokemonListStore.prewPage = response.data.previous;
                PokemonListStore.pokemon = response.data.results;
            });

    },[PokemonListStore.currentPage]);

    if (PokemonListStore.loading) return (
        <div className='loading jumbotron'>
            <h1 className='container' style={{marginLeft : '42%'}}>Loading...</h1>
        </div>
    );

    const buttonNext = () => {
        PokemonListStore.currentPage = PokemonListStore.nextPage;
    };

    const buttonPrev = () => {
        PokemonListStore.currentPage = PokemonListStore.nextPage;
    };

    const filter = limit => {
        PokemonListStore.currentPage = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`;
    };

    return(
        <div>
            <section className='jumbotron' style={{
                marginBottom : '65px'
            }}><h1 style={{
                display : 'flex',
                justifyContent : 'center'
            }} className='display-4'>Navigation</h1>
                <Pagination left={buttonPrev} right={buttonNext}/>
                <NumberOfPokemon filter={filter}/>
            </section>

            <section className='row'>
                {PokemonListStore.pokemon.map(pokemon =>
                    <PokemonCard
                        key={pokemon.id}
                        name = {pokemon.name}
                        url = {pokemon.url}
                    />)}
            </section>
        </div>
    )
});