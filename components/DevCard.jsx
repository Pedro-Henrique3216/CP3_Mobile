import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';

export default function DevCard({ nome, rm, github, imagem }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: imagem }} style={styles.imagem} />
      <Text style={styles.nome}>{nome}</Text>
      <Text style={styles.rm}>RM: {rm}</Text>
      <TouchableOpacity onPress={() => Linking.openURL(github)}>
        <Text style={styles.link}>GitHub</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  imagem: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  rm: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  link: {
    color: '#1e90ff',
    fontWeight: '600',
  },
});