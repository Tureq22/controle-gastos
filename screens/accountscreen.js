import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from 'context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from 'ConfigFirebase';

export default function AccountScreen() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const ref = doc(db, 'users', user.uid);
      const snapshot = await getDoc(ref);
      if (snapshot.exists()) {
        setProfile(snapshot.data());
      }
    };
    if (user?.uid) fetchUserData();
  }, [user]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minha Conta</Text>
      {profile && (
        <>
          <Text style={styles.item}>Nome: {profile.name}</Text>
          <Text style={styles.item}>Email: {profile.email}</Text>
          <Text style={styles.item}>Telefone: {profile.phone}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  item: { fontSize: 18, marginBottom: 8 },
});
