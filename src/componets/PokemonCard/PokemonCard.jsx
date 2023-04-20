import { usePokemonData } from "../../hooks/usePokemonData"

import styles from './PokemonCard.module.css'

const URL = "https://pokeapi.co/api/v2/pokemon/1"

export function PokemonCard() {
    const {isLoading, pokemon, error} = usePokemonData(URL)
    
    return (
        <div className={styles.card}>
            {
                isLoading ? <h2>loading..</h2>
                : error ? <h2>Oh noes.. Something went wrong: <span>{JSON.stringify(error)}</span></h2>
                :
                <>
                    <h2>{pokemon.name}</h2>
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                </>
            }
        </div>
    )
}