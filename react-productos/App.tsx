import { Alert, FlatList, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {
  SafeAreaView,
} from 'react-native-safe-area-context';
import { Producto } from './types/producto';
import { ProductoItem, FormularioProducto } from './components';

const STORAGE_KEY = '@productos_lista';

export default function App() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [nombre, setNombre] = useState<string>('');
  const [precio, setPrecio] = useState<string>('');

  useEffect(() => {
    cargarProductos();
  }, []);

  useEffect(() => {
    guardarProductos(productos);
  }, [productos]);


  const cargarProductos = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data !== null) {
        setProductos(JSON.parse(data) as Producto[]);
      }
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  };

  const guardarProductos = async (lista: Producto[]): Promise<void> => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
    } catch (error) {
      console.error('Error al guardar productos:', error);
    }
  };

  const agregarProducto = (): void => {
    if (!nombre.trim()) {
      Alert.alert('Error', 'El nombre del producto es obligatorio.');
      return;
    }

    if (!precio.trim() || isNaN(Number(precio))) {
      Alert.alert('Error', 'Ingresa un precio válido.');
      return;
    }

    const nuevo: Producto = {
      id: Date.now().toString(),
      nombre: nombre.trim(),
      precio: parseFloat(precio).toFixed(2),
    };

    setProductos((prev) => [nuevo, ...prev]);
    setNombre('');
    setPrecio('');
  };

  const eliminarProducto = (id: string): void => {
    Alert.alert(
      'Eliminar producto',
      '¿Estás seguro de que deseas eliminar este producto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () =>
            setProductos((prev) => prev.filter((p) => p.id !== id)),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Productos</Text>

      <FormularioProducto
        nombre={nombre}
        precio={precio}
        onChangeNombre={setNombre}
        onChangePrecio={setPrecio}
        onAgregar={agregarProducto}
      />

      <FlatList<Producto>
        data={productos}
        keyExtractor={(item: Producto) => item.id}
        renderItem={({ item }) => (
          <ProductoItem producto={item} onEliminar={eliminarProducto} />
        )}
        contentContainerStyle={styles.lista}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay productos agregados aún</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  lista: {
    paddingBottom: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
});