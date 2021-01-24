import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import firebase from 'firebase/app'
import 'firebase/auth'
import { theme } from './src/core/theme'
import {
  AuthLoadingScreen,
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  Dashboard,
  Home,
} from './src/screens'
import { FIREBASE_CONFIG } from './src/core/config'
import Icon from 'react-native-vector-icons/FontAwesome'

import PoliceHome from './src/screens/PoliceHome'

import { GoogleSignin } from '@react-native-community/google-signin'

GoogleSignin.configure({
  webClientId:
    '553874354647-qs3ooatg62b8sau8k3s26cb4mtgsoo7s.apps.googleusercontent.com',
})

const Stack = createStackNavigator()
if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG)
}

const Drawer = createDrawerNavigator()

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        //name="Home"
        component={PoliceHome}
        name="Home"
        options={{
          headerTitle: <Icon name="home" size={22} />,
        }}
      />
    </Drawer.Navigator>
  )
}

// const HomeStack = createStackNavigator()

// const HomeSN = () => {
//   return (
//     <HomeStack.Navigator>
//       <HomeStack.Screen
//         name="Home"
//         component={PoliceHome}
//         options={{
//           headerTitle: <Icon name="home" size={22} />,
//         }}
//       />
//     </HomeStack.Navigator>
//   )
// }

const App = () => {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="AuthLoadingScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="AuthLoadingScreen"
            component={AuthLoadingScreen}
          />
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="Home" component={MyDrawer} />
          <Stack.Screen
            name="ForgotPasswordScreen"
            component={ForgotPasswordScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App
