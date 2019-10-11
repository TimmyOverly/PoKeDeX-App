import React from 'react';
import Axios from "axios";
import {observer} from "mobx-react";
import {SearchFilterPokemonStore} from "../../mobx/searchFilterPokemonStore";

export const SearchPokemonFilter = observer(() => {

    const PokemonSearch = input => {
        input.preventDefault();
        const pokemon = input.target.elements.input.value;
        Axios
            .get(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)
            .then(response => {
                SearchFilterPokemonStore.searchPokemon = response.data;
                SearchFilterPokemonStore.imagesFront = response.data.sprites.front_default;
                SearchFilterPokemonStore.imagesBack = response.data.sprites.back_default;
                SearchFilterPokemonStore.searchType = response.data.types.map(type => type.type.name);
                SearchFilterPokemonStore.searchAbilities = response.data.abilities.map(abilities => abilities.ability.name);
            })
            .catch(error => console.log(error));
    };
    return(
        <div>
            <nav className="navbar navbar-light bg-light">
                <a className="navbar-brand">Search Pokemon</a>
                <form className="form-inline" onSubmit={PokemonSearch}>
                    <input className="form-control mr-sm-2" type="search" name='input' placeholder="Enter name or id" aria-label="Search"/>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search!</button>
                </form>
            </nav>
            <div style={{
                display : 'flex',
                justifyContent : 'center',
                marginTop : '2%'
            }}>
                {PokemonSearch ?
                    <div className='pokeName col-md-3 col-sm-6 mb-5'>
                        <div className='card bg-success'>
                            <div className='card-header'>
                                {`id : ${SearchFilterPokemonStore.searchPokemon.id}`}
                            </div>
                            <div className='card-title mx-auto'>
                                <img src={SearchFilterPokemonStore.imagesFront}/>
                                |
                                |
                                <img src={SearchFilterPokemonStore.imagesBack}/>
                            </div>
                            <div className='card-body mx-auto'>
                                {`NAME : ${SearchFilterPokemonStore.searchPokemon.name}`}
                            </div>
                            <div className='card-body mx-auto'>
                                {`TYPE : ${SearchFilterPokemonStore.searchType}`}
                            </div>
                            <div className='card-body mx-auto'>
                                {`ABILITIES : ${SearchFilterPokemonStore.searchAbilities}`}
                            </div>
                            <div className='card-body mx-auto'>
                                {`HEIGHT : ${SearchFilterPokemonStore.searchPokemon.height}`}
                            </div>
                            <div className='card-body mx-auto'>
                                {`WEIGHT : ${SearchFilterPokemonStore.searchPokemon.weight}`}
                            </div>
                        </div>
                    </div> : null}
            </div>
        </div>
    )
});