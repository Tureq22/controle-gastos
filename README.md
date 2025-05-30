#  App de Controle de Gastos com Firebase

Este é um aplicativo mobile feito com **React Native + Expo** que permite aos usuários cadastrarem-se, fazerem login, adicionar, editar e excluir seus gastos. Os dados são armazenados no **Firebase Firestore** e o controle de autenticação é feito com o **Firebase Authentication**.

---

##  Funcionalidades

-  Cadastro de usuários com nome, telefone, e-mail e senha
-  Login e logout com Firebase Authentication
-  Recuperação de senha por e-mail
-  Adicionar, editar e excluir gastos pessoais
-  Gastos organizados por data
-  Visualização do total de gastos
-  Visualização dos dados do perfil
-  Persistência de dados em tempo real via Firebase
-  Navegação entre telas com React Navigation

---

##  Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Firebase (Firestore + Auth)](https://firebase.google.com/)
- [React Navigation](https://reactnavigation.org/)
- [Date-fns](https://date-fns.org/) — para formatação de datas

---

##  Estrutura de Pastas

bash
.
├── App.js                # Ponto de entrada do app
├── index.js              # Configuração raiz (expo + hot reload)
├── /screens              # Telas da aplicação (Login, Dashboard, etc.)
├── /context              # AuthContext (controle de autenticação)
├── /navigation           # Rotas do app
├── /configfirebase.js    # Configuração do Firebase
└── /assets               # Imagens e ícones

## Pré-requisitos

Node.js (v18+ recomendado)

Expo CLI (npm install -g expo-cli)

Conta no Firebase com um projeto criado

## PASSO A PASSO

# git clone https://github.com/Tureq22/controle-gastos.git
# cd controle-gastos

# npm install

## ARQUIVO FIREBASE CONFIG

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_DOMINIO.firebaseapp.com",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_BUCKET.appspot.com",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

# npx expo start

## ESCOLHE O SISTEMA

Defina os métodos de inicialização se será web, android ou ios

# CRIE SUA CONTA

# ADICIONE GASTOS

# EDITE OU EXCLUA
