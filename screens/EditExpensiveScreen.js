import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from 'ConfigFirebase';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function EditExpenseScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { expense } = route.params;

  const [description, setDescription] = useState(expense.description);
  const [value, setValue] = useState(String(expense.value));
  const [date, setDate] = useState(expense.date.toDate().toISOString().split('T')[0]); // 'YYYY-MM-DD'

  const handleUpdate = async () => {
    try {
      const ref = doc(db, 'expenses', expense.id);
      await updateDoc(ref, {
        description,
        value: parseFloat(value),
        date: new Date(date),
      });
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao atualizar gasto:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Gasto</Text>
      <TextInput
        placeholder="Descrição"
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        placeholder="Valor"
        style={styles.input}
        value={value}
        onChangeText={setValue}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Data (YYYY-MM-DD)"
        style={styles.input}
        value={date}
        onChangeText={setDate}
      />
      <Button title="Salvar Alterações" onPress={handleUpdate} />
      <Button title="Cancelar" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 8, marginBottom: 12,
  },
});
