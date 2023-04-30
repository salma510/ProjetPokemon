import React from "react";
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from "react-native";

export default function PokemonList({ data, onPress }) {
  const renderPokemon = ({ item }) => {
    return (
      <TouchableOpacity style={styles.pokemonContainer} onPress={() => onPress(item)}>
        <Text style={styles.pokemonTitle}>
          {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
        </Text>
        <Image style={styles.pokemonSprite} source={{ uri: item.img }} />
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderPokemon}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  pokemonContainer: {
    backgroundColor: "lightgrey",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
  },
  pokemonTitle: {
    fontSize: 32,
    alignSelf: "center",
    marginTop: 10,
  },
  pokemonSprite: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },
});
