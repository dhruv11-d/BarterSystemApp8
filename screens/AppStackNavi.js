import * as React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import Exchange from '../screens/ExchangeScreen';
import receiver from '../screens/receiverDetails';

const AppStack = createStackNavigator({
    Barters:{
        screen:Exchange,
        navigationOptions:{
            headerShown:false
        }
    },
    Receiver:{
        screen:receiver,
        navigationOptions:{
            headerShown:false
        }
    },
},
{
    initialRouteName:'Barters'
})

export default AppStack;