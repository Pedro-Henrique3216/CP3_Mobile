import { Link } from 'expo-router';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📦 Estoque Fácil</Text>
      <Text style={styles.subtitle}>Gerencie seu estoque com agilidade</Text>

      <View style={styles.buttonContainer}>
        <Link href="/cadastro" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Cadastrar Produto</Text>
          </Pressable>
        </Link>

        <Link href="/produtos" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Ver Produtos</Text>
          </Pressable>
        </Link>

        <Link href="/desenvolvedores" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Desenvolvedores</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    gap: 15,
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
