import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from 'ConfigFirebase';
import { useAuth } from 'context/AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function AddExpenseScreen() {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [date, setDate] = useState('');

  const handleAdd = async () => {
    try {
      await addDoc(collection(db, 'expenses'), {
        userId: user.uid,
        description,
        value: parseFloat(value),
        date: Timestamp.fromDate(new Date(date)),
      });
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao adicionar gasto:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Gasto</Text>
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
      <Button title="Salvar" onPress={handleAdd} />
      <Button title="Cancelar" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 12,
  },
});