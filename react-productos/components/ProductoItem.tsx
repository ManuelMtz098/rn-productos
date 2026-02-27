import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Producto } from '../types/producto';

interface Props {
  producto: Producto;
  onEliminar: (id: string) => void;
}

export function ProductoItem({ producto, onEliminar }: Props) {
  return (
    <View style={styles.item}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemNombre}>{producto.nombre}</Text>
        <Text style={styles.itemPrecio}>${producto.precio}</Text>
      </View>
      <TouchableOpacity
        style={styles.btnEliminar}
        onPress={() => onEliminar(producto.id)}
      >
        <Text style={styles.btnEliminarText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemInfo: {
    flex: 1,
  },
  itemNombre: {
    fontSize: 16,
  },
  itemPrecio: {
    fontSize: 14,
    color: '#555',
  },
  btnEliminar: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  btnEliminarText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 16,
  },
});