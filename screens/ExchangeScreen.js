import * as React from 'react';
import {View,Text,FlatList,TouchableOpacity} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../screens/AppHeader';
import {ListItem} from 'react-native-elements';

export default class Exchange extends React.Component{
    constructor(){
        super();
        this.state={
            userId:firebase.auth().currentUser.email,
            allBooks:[]
        }
        this.requestRef = null
    }
   
    

    getRequestedItemsList=()=>{
        this.requestRef = db.collection("UsersRequest").onSnapshot(snapshot=>{
            var allBooks = snapshot.docs.map((doc)=>doc.data())
            this.setState({
                allBooks:allBooks
            })
        })
    }

    componentDidMount(){
        this.getRequestedItemsList();
    }
    componentWillUnount(){
        this.requestRef();
    }


    keyExtractor=(item,index)=>index.toString();

    renderItem=({item,i})=>{
        return(
            <ListItem
            key={i}
            title={item.Item}
            subtitle={item.Reason}
            titleStyle={{color:'black', fontWeight:'bold'}}
            rightElement={
                <TouchableOpacity onPress={()=>{
                    this.props.navigation.navigate('ReceiverDetails',{'details':item})}}
                    >
                    <Text>Exchange</Text>
                </TouchableOpacity >
            } 
            bottomDivider
            />
        )
    }

    render(){
        return(
            <View style={{justifyContent:'center',marginTop:30}}>
                
              <View>
                  {
                this.state.allBooks.length === 0
                ?(
                    <View>
                        <Text>List Empty</Text>
                    </View>
                ):
                (
                <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.allBooks}
                renderItem={this.renderItem}
                />
                )
                    }
                </View>
                
            </View>
        )
    }
}