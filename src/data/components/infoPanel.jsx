import React from 'react';
import {observer} from "mobx-react-lite";
import {PokemonStore} from "../mobx/typesPokemonStore";

export const InfoPanel = observer(() => {
    return(
        <div className='jumbotron' style={{
            display : 'flex',
            justifyContent: 'center',
            marginTop : '17px'
        }}>
            <div className='card'>
                <img src={PokemonStore.images}/>
                <h5 className='pokeName' style={{
                    display : 'flex',
                    justifyContent: 'center',
                }}>
                    {PokemonStore.name}
                </h5>
            </div>
            <div>
            </div>
        </div>
    )
});