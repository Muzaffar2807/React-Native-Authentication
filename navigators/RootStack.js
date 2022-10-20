import React from 'react';

//React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
 

//screens
import Login from './../screens/Login';
import Signup from './../screens/Signup';
import Welcome from './../screens/Welcome';

//Colors
import { Colors } from '../components/styles';
 
const { primary, tertiary } = Colors;

const Stack = createNativeStackNavigator();

const RootStack = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator 
                screenOptions={{
                    /* headerStyle: {
                        backgroundColor: 'transparent'
                    },
                    headerTintColor: tertiary,
                    headerTitle: '',
                    headerLeftContainerStyle: {
                        paddingLeft: 20
                    }  */
                    headerShown: false
                }}
                initialRouteName="Login" 
            >
                <Stack.Screen name='Login' component={Login} />
                <Stack.Screen name='Signup' component={Signup} />
                <Stack.Screen options={{ headerTintColor: tertiary }} name='Welcome' component={Welcome} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootStack;