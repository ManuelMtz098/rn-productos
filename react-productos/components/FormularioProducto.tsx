import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
  nombre: string;
  precio: string;
  onChangeNombre: (text: string) => void;
  onChangePrecio: (text: string) => void;
  onAgregar: () => void;
}

export function FormularioProducto({
  nombre,
  precio,
  onChangeNombre,
  onChangePrecio,
  onAgregar,
}: Props) {
  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Nombre del producto"
        value={nombre}
        onChangeText={onChangeNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Precio (ej: 29.99)"
        value={precio}
        onChangeText={onChangePrecio}
        keyboardType="decimal-pad"
      />
      <TouchableOpacity style={styles.btnAgregar} onPress={onAgregar}>
        <Text style={styles.btnAgregarText}>Agregar Producto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
  btnAgregar: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  btnAgregarText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});