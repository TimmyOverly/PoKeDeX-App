import React, {useEffect} from 'react';
import Axios from "axios";
import {observer} from "mobx-react-lite";
import {InfoPanel} from "../infoPanel";
import {PokemonStore} from "../../mobx/typesPokemonStore";

export const TagPokemonFilter = observer(() => {

    useEffect(() => {
        Axios
            .get(PokemonStore.url)
            .then(response => {
                PokemonStore.types = response.data.results;
            });
    });

    const FilteredPokemonList = link => {
        Axios
            .get(link)
            .then(response => {
                PokemonStore.pokemon = response.data.pokemon;
            })
            .catch(error => console.log(error.statusText));
    };

    const GetDataPokemon = url => {
        Axios
            .get(url)
            .then(response => {
                PokemonStore.images = response.data.sprites.front_default;
                PokemonStore.name = response.data.name;
            })
    };

    return(
        <div>
            <section>
                <ul className='btn-group' style={{
                    display : 'flex',
                    justifyContent: 'center',
                    marginRight : '3.5%'
                }}>
                    {PokemonStore.types.map(type => <button className='btn btn-danger' onClick={event => FilteredPokemonList(type.url)}>
                        {type.name}
                    </button>)}
                </ul>
            </section>
                {FilteredPokemonList ?
                    <div className='row'>
                        {PokemonStore.pokemon.map(item => <button className='btn' onClick={event => GetDataPokemon(item.pokemon.url)}>
                            {item.pokemon.name}
                        </button>)}
                    </div>
                : null}
            <section/>
            <section>
                {GetDataPokemon ?
                    <InfoPanel/>
                : null}
            </section>
        </div>
    )
});