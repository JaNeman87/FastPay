import React, { Component } from "react";

import { createStackNavigator, createDrawerNavigator } from "react-navigation";
import QRscanner from "./src/screens/QRscanner/QRscanner";
import LoginScreen from "./src/screens/Login/LoginScreen";
import InfoScreen from "./src/screens/InfoScreen/InfoScreen";
import CartScreen from "./src/screens/CartScreen/CartScreen";

class App extends Component {
  render() {
    return <AppStackNavigator />;

    // <AppStack />;
    // return <MainDrawer />;
  }
}

const AppStackNavigator = createStackNavigator({
  Login: LoginScreen,
  QRscanner: QRscanner,
  InfoScreen: InfoScreen,
  CartScreen: CartScreen
});

// Main Screens for Drawer Navigator
// export const MainStack = createStackNavigator({
//   QRscanner: QRscanner,
//   InfoScreen: InfoScreen,
//   CartScreen: CartScreen
// });

// // Drawer Navigator
// export const Drawer = createDrawerNavigator({
//   Home: MainStack,
//   Cart: CartScreen
// });

// // Main App Navigation
// export const AppStack = createStackNavigator(
//   {
//     Login: LoginScreen,

//     Drawer: {
//       screen: Drawer
//     }
//   },
//   { headerMode: "none" }
// );

export default App;
