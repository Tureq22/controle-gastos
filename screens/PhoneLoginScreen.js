// src/screens/PhoneLoginScreen.js
import React, { useRef, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { firebaseConfig } from '../configfirebase';

const auth = getAuth();

export default function PhoneLoginScreen({ navigation }) {
  const recaptchaVerifier = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [code, setCode] = useState('');

  const sendVerification = async () => {
    try {
      const provider = new PhoneAuthProvider(auth);
      const id = await provider.verifyPhoneNumber(phoneNumber, recaptchaVerifier.current);
      setVerificationId(id);
      Alert.alert('Código enviado por SMS');
    } catch (err) {
      Alert.alert('Erro', err.message);
    }
  };

  const confirmCode = async () => {
    try {
      const credential = PhoneAuthProvider.credential(verificationId, code);
      await signInWithCredential(auth, credential);
      Alert.alert('Login concluído com sucesso!');
      navigation.navigate('Dashboard');
    } catch (err) {
      Alert.alert('Erro', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <Text style={styles.title}>Login com Telefone</Text>
      <TextInput
        style={styles.input}
        placeholder="Número (ex: +55 11 91234-5678)"
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      <Button title="Enviar Código" onPress={sendVerification} />

      {verificationId ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Código recebido"
            onChangeText={setCode}
            keyboardType="number-pad"
          />
          <Button title="Confirmar Código" onPress={confirmCode} />
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 12, borderRadius: 4 },
  title: { fontSize: 22, marginBottom: 16, textAlign: 'center' },
});
