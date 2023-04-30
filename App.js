import { StatusBar } from "expo-status-bar";
import React, { useState, useCallback, useEffect } from "react";
import { LogBox } from "react-native";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import PokemonList from "./PokemonList";
import PokemonDetailsModal from "./PokemonDetailsModal";

const pokePath = "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json";
const firstGenPokemonPath = `${pokePath}`;

export default function App() {
  const [firstGenPokemonDetails, setFirstGenPokemonDetails] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []); 

  useEffect(() => {
    const fetchFirstGenPokemons = async () => {
      const firstGenPokemonIdsResponse = await fetch(firstGenPokemonPath);
      const firstGenPokemonIdsBody = await firstGenPokemonIdsResponse.json();

      setFirstGenPokemonDetails(firstGenPokemonIdsBody.pokemon.slice(0, 151));
    };

    fetchFirstGenPokemons();
  }, []);

  const handlePokemonPress = useCallback((pokemon) => {
    setSelectedPokemon(pokemon);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedPokemon(null);
  }, []);

  const getPokemonsByType = useCallback(() => {
    const pokemonsByType = {};

    firstGenPokemonDetails.forEach((pokemon) => {
      if (!pokemonsByType[pokemon.type]) {
        pokemonsByType[pokemon.type] = [pokemon];
      } else {
        pokemonsByType[pokemon.type].push(pokemon);
      }
    });

    return pokemonsByType;
  }, [firstGenPokemonDetails]);

  const renderPokemonLists = useCallback(() => {
    const pokemonsByType = getPokemonsByType();

    return Object.keys(pokemonsByType).map((type) => (
      <View key={type} style={styles.listContainer}>
        <Text style={styles.typeTitle}>{type}</Text>
        <PokemonList data={pokemonsByType[type]} onPress={handlePokemonPress} />
      </View>
    ));
  }, [getPokemonsByType, handlePokemonPress]);

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>Pokemons</Text>
      {renderPokemonLists()}
      <PokemonDetailsModal
        isVisible={!!selectedPokemon}
        pokemon={selectedPokemon}
        onClose={handleCloseModal}
      />
      <StatusBar style="auto" />
    </View>
    </ScrollView>
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
  listContainer: {
    padding: 16,
  },
  typeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
