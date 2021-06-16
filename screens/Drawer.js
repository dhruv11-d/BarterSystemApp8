import * as React from 'react';
import {DrawerItems} from 'react-navigation-drawer';
import firebase from 'firebase';
import {Text,View,TouchableOpacity,Image,ScrollView} from 'react-native';
import HomeScreen from '../screens/HomeScreen'

export default class Drawer extends React.Component{
    render(){
        return(
            <View>
            
                <View>
                    <DrawerItems {...this.props}
                    />
            

            
                     <TouchableOpacity onPress={()=>{
                         this.props.navigation.navigate('HomeScreen'),
                         firebase.auth().signOut(),
                         Alert.alert('Logged Out');
                         
                     }}
                     ><Text>Log Out</Text>
                     </TouchableOpacity>
                </View>

            </View>
        )
    }
}