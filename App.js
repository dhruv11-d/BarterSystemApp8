import * as React from 'react';
import {View} from 'react-native';
import WelcomeScreen from './screens/SigningIn'
import {createSwitchNavigator,createAppContainer} from 'react-navigation';
import appTab from './screens/appTab.js';
import navi from './screens/Navigation';
import Drawer from './screens/Drawer';


export default class App extends React.Component {
  render(){
         return (

              <AppContainer/>
          
          );
  }
}

const switchNavigator=createSwitchNavigator({
  Welcome:{screen:WelcomeScreen},
  Options : {screen:navi},
  bottom:{screen:appTab},
})

const AppContainer = createAppContainer(switchNavigator);