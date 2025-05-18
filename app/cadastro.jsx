import {
  Text,
  TextInput,
  StyleSheet,
  Modal,
  FlatList,
  Pressable,
  ScrollView,
  View,
  Alert,
} from 'react-native';
import { useState, useEffect } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Botao from '../components/Botao';
import { useLocalSearchParams, useNavigation } from 'expo-router';

const estados = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
  'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
  'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

export default function Cadastrar() {
  const [nome, setNome] = useState('');
  const [fabricacao, setFabricacao] = useState(new Date());
  const [validade, setValidade] = useState(null);
  const [quantidade, setQuantidade] = useState('');
  const [lote, setLote] = useState('');
  const [codigoBarras, setCodigoBarras] = useState('');
  const [estado, setEstado] = useState('');
  const [estadoModalVisible, setEstadoModalVisible] = useState(false);
  const [mostrarFabricacao, setMostrarFabricacao] = useState(false);
  const [mostrarValidade, setMostrarValidade] = useState(false);

  const [permission, requestPermission] = useCameraPermissions();
  const [cameraAtiva, setCameraAtiva] = useState(false);

  const navigation = useNavigation();
  const { editar, produto, index } = useLocalSearchParams();

  useEffect(() => {
    requestPermission();
     if (editar && produto) {
        try {
        const obj = JSON.parse(produto); // <-- transforma string em objeto

        setNome(obj.nome);
        setQuantidade(String(obj.quantidade));
        setLote(obj.lote);
        setFabricacao(new Date(obj.dataFabricacao));
        setValidade(obj.dataValidade ? new Date(obj.dataValidade) : null);
        setCodigoBarras(obj.codigoBarras || '');
        setEstado(obj.estado || '');
        } catch (e) {
        console.error('Erro ao fazer parse do produto:', e);
        }
    }   
  }, []);

  const handleBarCodeScanned = (code) => {
    setCodigoBarras(code.data);
    setCameraAtiva(false);
  };

  const onChangeFabricacao = (selectedDate) => {
    setMostrarFabricacao(false);
    if (selectedDate.type === 'set') {
      setFabricacao(new Date(selectedDate.nativeEvent.timestamp));
    }
  };

  const onChangeValidade = (selectedDate) => {
    setMostrarValidade(false);
    if (selectedDate?.type === 'set') {
      setValidade(new Date(selectedDate.nativeEvent.timestamp));
    }
  };

  const salvarProduto = async () => {
  if (!nome || !quantidade || !lote) {
    Alert.alert("Erro", "Preencha todos os campos!");
    return;
  }

  const novoProduto = {
    nome,
    quantidade: Number(quantidade),
    lote,
    dataFabricacao: fabricacao.toISOString(),
    dataValidade: validade ? validade.toISOString() : null,
    codigoBarras,
    estado
  };

  try {
    const dadosExistentes = await AsyncStorage.getItem('produtos');
    const produtos = dadosExistentes ? JSON.parse(dadosExistentes) : [];

    if (editar && index !== undefined) {
      produtos[Number(index)] = novoProduto;
    } else {
      produtos.push(novoProduto);
    }

    await AsyncStorage.setItem('produtos', JSON.stringify(produtos));
    Alert.alert("Sucesso", editar ? "Produto atualizado!" : "Produto salvo com sucesso!");

    navigation.goBack();
  } catch (err) {
    Alert.alert("Erro", "Falha ao salvar produto");
    console.error(err);
  }
};

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}
      keyboardShouldPersistTaps="handled">
      <Text style={styles.label}>Nome do Produto</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} />

      <Text style={styles.label}>Data de Fabricação</Text>
      <Text>{fabricacao.toLocaleDateString()}</Text>
      <Botao title="Alterar Data" onPress={() => setMostrarFabricacao(true)} />
      {mostrarFabricacao && (
        <DateTimePicker
          value={fabricacao}
          mode="date"
          display={'default'}
          onChange={onChangeFabricacao}
        />
      )}

      <Text style={styles.label}>Data de Validade</Text>
      <Text>{validade instanceof Date ? validade.toLocaleDateString() : 'Indefinido'}</Text>

      {mostrarValidade && (
        <DateTimePicker
          value={validade || new Date()}
          mode="date"
          display="default"
          onChange={onChangeValidade}
        />
      )}
      <Botao title="Alterar Data" onPress={() => setMostrarValidade(true)} />
      <Botao title="Definir Como Indefinido" onPress={() => setValidade(null)} />

      <Text style={styles.label}>Quantidade</Text>
      <TextInput style={styles.input} value={quantidade} onChangeText={setQuantidade} keyboardType="numeric" />

      <Text style={styles.label}>Lote</Text>
      <TextInput style={styles.input} value={lote} onChangeText={setLote} />

      <Text style={styles.label}>Código de Barras</Text>
      <TextInput style={styles.input} value={codigoBarras} editable={false} />
      <Botao title="Ler Código de Barras" onPress={() => setCameraAtiva(true)} />
      <Botao title="Cancelar" onPress={() => setCameraAtiva(false)} />

      {cameraAtiva && permission?.granted && (
        <CameraView
          style={{ width: '100%', height: 50, marginVertical: 20 }}
          onBarcodeScanned={handleBarCodeScanned}
          barcodeScannerSettings={{ barCodeTypes: ['ean13', 'code128'] }}
        />
      )}

      <Text style={styles.label}>Estado de Origem</Text>
      <Pressable style={styles.dropdown} onPress={() => setEstadoModalVisible(true)}>
        <Text>{estado || 'Selecionar estado'}</Text>
      </Pressable>

      <Modal visible={estadoModalVisible} animationType="slide">
        <FlatList
          data={estados}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Pressable
              style={styles.estadoItem}
              onPress={() => {
                setEstado(item);
                setEstadoModalVisible(false);
              }}
            >
              <Text>{item}</Text>
            </Pressable>
          )}
        />
        <View style={{ padding: 20 }}>
          <Botao title="Fechar" onPress={() => setEstadoModalVisible(false)} />
        </View>
      </Modal>

      <Botao title="Salvar Produto" onPress={salvarProduto} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    marginBottom: 20,
    paddingBottom: 50
  },
  label: {
    marginTop: 15,
    fontWeight: 'bold'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginTop: 5,
    borderRadius: 5
  },
  dropdown: {
    borderWidth: 1,
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
    borderColor: '#ccc'
  },
  estadoItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  }
});
