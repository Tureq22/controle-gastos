import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/loginscreen';
import RegisterScreen from './screens/registerscreen';
import DashboardScreen from './screens/DashboardScreen';
import AddExpenseScreen from './screens/addexpensivescreen';
import EditExpenseScreen from './screens/EditExpensiveScreen';
import AccountScreen from './screens/accountscreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import PhoneLoginScreen from './screens/PhoneLoginScreen';
import { useAuth } from './context/AuthContext';

const Stack = createNativeStackNavigator();

export default function Routes() {
  const { user, loading } = useAuth();

  if (loading) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
          <Stack.Screen name="EditExpense" component={EditExpenseScreen} />
          <Stack.Screen name="Account" component={AccountScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="PhoneLogin" component={PhoneLoginScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
