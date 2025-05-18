import { View, Text, FlatList, Button, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useNavigation } from 'expo-router';

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const carregarProdutos = async () => {
      const dados = await AsyncStorage.getItem('produtos');
      if (dados) setProdutos(JSON.parse(dados));
    };
    const unsubscribe = navigation.addListener('focus', carregarProdutos);
    return unsubscribe;
  }, [navigation]);

  const excluirProduto = async (index) => {
    const novaLista = [...produtos];
    novaLista.splice(index, 1);
    setProdutos(novaLista);
    await AsyncStorage.setItem('produtos', JSON.stringify(novaLista));
    Alert.alert("Sucesso", "Produto excluído!");
  };

  const pegarProduto = (index) => {
    const produto = produtos[index];
    if (produto) {
      return JSON.stringify(produto);
    }
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
        {produtos.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhum produto cadastrado.</Text>
        ) : (
            <FlatList
            data={produtos}
            ListHeaderComponent={() => (
                <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Lista de Produtos</Text>
            )}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
                <View style={{ marginBottom: 15, borderBottomWidth: 1, paddingBottom: 10 }}>
                    <Text style={{ fontWeight: 'bold' }}>{item.nome}</Text>
                    <Text>Quantidade: {item.quantidade}</Text>
                    <Text>Lote: {item.lote}</Text>
                    <Text>Validade: {item.dataValidade ? new Date(item.dataValidade).toLocaleDateString() : 'Indefinido'}</Text>

                    <Link
                        href={{
                            pathname: '/cadastro',
                            params: { editar: true, index: index, produto: pegarProduto(index) }
                        }} asChild>
                            <Button title="Editar" color="blue" />
                        </Link>
                    <Button
                    title="Excluir"
                    color="red"
                    onPress={() => excluirProduto(index)}
                    />
                </View>
                )}
            />

        )}
      
    </View>
  );
}
