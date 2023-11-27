import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { Layout } from "../../components/layouts"
import { pokeApi } from "../../api";
import { Pokemon } from "../../interfaces/pokemon";
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";

interface Props {
    pokemon: Pokemon
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
    return (
        <Layout title={pokemon.name}>

            <Grid.Container css={{ marginTop: '5px' }} gap={2}>
                <Grid xs={12} sm={4} >
                    <Card hoverable css={{ padding: '30px' }}>
                        <Card.Body>
                            <Card.Image
                                src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                                alt={pokemon.name}
                                width="100%"
                                height={200}
                            />
                        </Card.Body>
                    </Card>
                </Grid>

                <Grid xs={12} sm={8}>
                    <Card>
                        <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Text h1 transform='capitalize'>{pokemon.name}</Text>

                            <Button
                                color="gradient"
                                ghost
                            >
                                Guardar en favoritos
                            </Button>
                        </Card.Header>

                        <Card.Body>
                            <Text size={30}>Sprites:</Text>

                            <Container direction='row' display='flex' gap={0}>
                                <Image
                                    src={pokemon.sprites.front_default}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={pokemon.sprites.back_default}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={pokemon.sprites.front_shiny}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={pokemon.sprites.back_shiny}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />

                            </Container>


                        </Card.Body>


                    </Card>
                </Grid>

            </Grid.Container>



        </Layout>
    )
}

/**
 NOTAS

 getStaticPaths, getStaticProps Se ejecutan en tiempo de build. Una vez ejecutado, no se vuelven a invocar. 
 NO corre en el lado del cliente, solo del servidor
 */


export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const pokemonList: string[] = [...Array(151)].map((value, index) => `${index + 1}`)
    return {
        paths: pokemonList.map(id => ({
            params: { id }
        })),
        fallback: false // En false, no permite que el usuario entre a una pagina que no este dentro de los ids de arriba
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { id } = params as { id: string }

    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`);
    return {
        props: {
            pokemon: data
        }
    }
}

export default PokemonPage
