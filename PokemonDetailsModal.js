import React from "react";
import { Modal, StyleSheet, Text, View } from "react-native";

const PokemonDetailsModal = ({ pokemon, isVisible, onClose }) => {
  if (!pokemon) {
    return null; // Add a null check to prevent accessing the name property of a null value
  }

  return (
    <Modal animationType="slide" transparent={false} visible={isVisible}>
      <View style={styles.container}>
        <Text style={styles.name}>{pokemon.name}</Text>
        <Text style={styles.description}>{pokemon.description}</Text>
        <Text style={styles.type}>Type: {pokemon.type}</Text>
        <Text style={styles.height}>Height: {pokemon.height}</Text>
        <Text style={styles.weight}>Weight: {pokemon.weight}</Text>
        <Text style={styles.baseExperience}>
          Base Experience: {pokemon.base_experience}
        </Text>
        <Text style={styles.button} onPress={onClose}>
          Close
        </Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  type: {
    fontSize: 16,
    marginBottom: 5,
  },
  height: {
    fontSize: 16,
    marginBottom: 5,
  },
  weight: {
    fontSize: 16,
    marginBottom: 5,
  },
  baseExperience: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    fontSize: 16,
    color: "#007AFF",
    marginTop: 10,
  },
});

export default PokemonDetailsModal;
