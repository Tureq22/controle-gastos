import 'expo-asset'; // Importação recomendada para assets do Expo
import { registerRootComponent } from 'expo';
import { AppRegistry, LogBox } from 'react-native';
import App from './App';

// Ignora warnings específicos (opcional)
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  'AsyncStorage has been extracted from react-native',
]);

/** 
 * Configuração inicial antes do app carregar
 * Pode ser usado para inicializações assíncronas
 */
function setup() {
  // Adicione aqui qualquer inicialização necessária
  return App;
}

// Registra o componente principal
registerRootComponent(App);

// Hot reload para desenvolvimento (Android)
if (module.hot) {
  module.hot.accept();
}