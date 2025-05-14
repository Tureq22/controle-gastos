import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../configfirebase';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

export default function AccountScreen() {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log('Usuário atual:', user); // DEBUG

        if (!user?.uid) {
          setError('Usuário não autenticado.');
          setLoading(false);
          return;
        }

        const ref = doc(db, 'users', user.uid);
        const snapshot = await getDoc(ref);

        if (snapshot.exists()) {
          const data = snapshot.data();
          console.log('Dados do perfil:', data); // DEBUG
          setProfile(data);
        } else {
          setError('Perfil não encontrado.');
        }
      } catch (err) {
        console.error('Erro ao buscar dados do usuário:', err);
        setError('Erro ao carregar dados do perfil.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate('Login');
    } catch (err) {
      console.error('Erro ao sair:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minha Conta</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : profile ? (
        <>
          <Text style={styles.item}>Nome: {profile.name}</Text>
          <Text style={styles.item}>Email: {profile.email}</Text>
          <Text style={styles.item}>Telefone: {profile.phone}</Text>
        </>
      ) : (
        <Text>Nenhuma informação encontrada.</Text>
      )}

      <View style={styles.buttonContainer}>
        <Button title="Voltar" onPress={() => navigation.goBack()} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Sair da Conta" color="red" onPress={handleLogout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  item: { fontSize: 18, marginBottom: 8 },
  error: { color: 'red', fontSize: 16, textAlign: 'center', marginBottom: 16 },
  buttonContainer: { marginTop: 16 },
});
