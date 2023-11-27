import { NextPage, GetStaticProps } from 'next';

import { Layout } from '../components/layouts';
import { PokemonGrid } from '../components/pokemon/PokemonGrid';
import { pokeApi } from '../api';
import { PokemonListResponse, PokemonResult } from '../interfaces';

interface Props {
  pokemons: PokemonResult[]
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title='Listado de Pokémons'>
      <PokemonGrid pokemons={pokemons} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {

  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

  const pokemons: PokemonResult[] = data.results.map((poke, i) => ({
    ...poke,
    id: `${i + 1}`,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg`
  }))

  return {
    props: {
      pokemons
    }
  }
}

export default HomePage;
