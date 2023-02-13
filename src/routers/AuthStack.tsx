import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Files
import RouterConstants from './RouterConstants';
import Login from '../screens/auth/Login';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={RouterConstants.Login}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={RouterConstants.Login} component={Login} />
    </Stack.Navigator>
  );
};

export default AuthStack;
