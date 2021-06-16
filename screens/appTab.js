import * as React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Exchange from '../screens/ExchangeScreen';
import HomeScreen from '../screens/HomeScreen'
import {Image} from 'react-native';
import firebase from 'firebase';

const appTab = createBottomTabNavigator({
    Barter:{screen:HomeScreen,
        navigationOptions:{
            tabBarIcon : <Image source={require('../assets/Home.png')} style={{width:30,height:30}}/>,
            tabBarLabel:'Requests'
        },
    },
    Exchange:{screen:Exchange,
        navigationOptions:{
            tabBarIcon:<Image source={require('../assets/exchange.png')} style={{width:30,height:30}}/>,
            tabBarLabel:'Exchange'
        },
       
    }
})
export default appTab;