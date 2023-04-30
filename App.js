import { StatusBar } from "expo-status-bar";
import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import PokemonList from "./PokemonList";
import PokemonDetailsModal from "./PokemonDetailsModal";

const pokePath = "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json";
const firstGenPokemonPath = `${pokePath}`;

export default function App() {
  const [firstGenPokemonDetails, setfirstGenPokemonDetails] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    const fetchFirstGenPokemons = async () => {
      const firstGenPokemonIdsResponse = await fetch(firstGenPokemonPath);
      const firstGenPokemonIdsBody = await firstGenPokemonIdsResponse.json();

      setfirstGenPokemonDetails(firstGenPokemonIdsBody.pokemon.slice(0, 151));
    };

    fetchFirstGenPokemons();
  }, []);

  const handlePokemonPress = useCallback((pokemon) => {
    setSelectedPokemon(pokemon);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedPokemon(null);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokemons</Text>
      <PokemonList data={firstGenPokemonDetails} onPress={handlePokemonPress} />
      <PokemonDetailsModal
        visible={!!selectedPokemon}
        pokemon={selectedPokemon}
        onClose={handleCloseModal}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
    marginTop: 60,
  },
  title: {
    fontSize: 38,
    alignSelf: "center",
    marginBottom: 20,
  },
});
