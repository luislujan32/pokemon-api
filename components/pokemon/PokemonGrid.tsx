import { FC } from "react"
import { PokemonResult } from "../../interfaces"
import { Grid } from "@nextui-org/react"
import { PokemonCard } from "./PokemonCard"

interface Props {
    pokemons: PokemonResult[]
}

export const PokemonGrid: FC<Props> = ({ pokemons }) => {
    return (
        <Grid.Container gap={2} justify='flex-start'>
            {
                pokemons.map((pokemon) => {
                    return (
                        <PokemonCard key={pokemon.id} pokemon={pokemon} />
                    )
                })
            }
        </Grid.Container>
    )
}
