import React, { useEffect, useState } from 'react';
import { View, Text, SectionList, StyleSheet, Button } from 'react-native';
import { collection, query, where, onSnapshot, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../configfirebase';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';

export default function DashboardScreen() {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    if (!user?.uid) return;

    const q = query(
      collection(db, 'expenses'),
      where('userId', '==', user.uid),
      orderBy('date', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log('Gastos carregados:', data); // Debug

      const grouped = data.reduce((groups, expense) => {
        try {
          const dateObj = expense.date?.toDate ? expense.date.toDate() : new Date();
          const date = format(dateObj, 'dd/MM/yyyy');
          if (!groups[date]) groups[date] = [];
          groups[date].push(expense);
        } catch (err) {
          console.warn('Erro ao processar gasto:', expense, err);
        }
        return groups;
      }, {});

      const sections = Object.entries(grouped).map(([title, data]) => ({ title, data }));
      setExpenses(sections);
    });

    return unsubscribe;
  }, [user]);

  const total = expenses.reduce(
    (sum, section) => sum + section.data.reduce((acc, item) => acc + item.value, 0),
    0
  );

  return (
    <View style={styles.container}>
      <Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text>

      <View style={{ marginBottom: 16 }}>
        <Button title="Adicionar Gasto" onPress={() => navigation.navigate('AddExpense')} />
      </View>

      <View style={{ marginBottom: 16 }}>
        <Button title="Minha Conta" onPress={() => navigation.navigate('Account')} />
      </View>

      <SectionList
        sections={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.description} - R$ {item.value.toFixed(2)}</Text>
            <Button
              title="Editar"
              onPress={() => navigation.navigate('EditExpense', { expense: item })}
            />
            <Button
              title="Excluir"
              color="red"
              onPress={async () => {
                try {
                  await deleteDoc(doc(db, 'expenses', item.id));
                } catch (err) {
                  console.error('Erro ao deletar:', err);
                }
              }}
            />
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#eee',
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginTop: 12,
  },
  item: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
