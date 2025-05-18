import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import DevCard from '../components/DevCard';

const devs = [
  {
    nome: 'Pedro Henrique dos Santos',
    rm: '559064',
    github: 'https://github.com/Pedro-Henrique3216',
    imagem: 'https://avatars.githubusercontent.com/u/137585699?v=4',
  },
  {
    nome: 'Vinícius de Oliveira Coutinho',
    rm: '556182',
    github: 'https://github.com/ViniOC',
    imagem: 'https://avatars.githubusercontent.com/u/103922053?v=4',
  },
  {
    nome: 'Thiago Thomaz Sales Conceição',
    rm: '557992 ',
    github: "https://github.com/ThiagoThmaz",
    imagem: 'https://avatars.githubusercontent.com/u/142420181?v=4',
  }
];

const repositorioProjeto = 'https://github.com/Pedro-Henrique3216/CP3_Mobile.git';

export default function TelaDesenvolvedores() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Desenvolvedores</Text>

      {devs.map((dev, index) => (
        <DevCard
          key={index}
          nome={dev.nome}
          rm={dev.rm}
          github={dev.github}
          imagem={dev.imagem}
        />
      ))}

      <View style={styles.repoContainer}>
        <Text style={styles.repoTitulo}>Repositório do Projeto:</Text>
        <TouchableOpacity onPress={() => Linking.openURL(repositorioProjeto)}>
          <Text style={styles.link}>{repositorioProjeto}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  repoContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  repoTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  link: {
    color: '#1e90ff',
    fontWeight: '600',
    textAlign: 'center',
  },
});