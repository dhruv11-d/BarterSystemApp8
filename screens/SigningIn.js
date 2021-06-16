import * as React from 'react';
import {View,Text,TextInput,TouchableOpacity,ScrollView,KeyboardAvoidingView,StyleSheet, Alert,Modal} from 'react-native';
import db from '../config';
import firebase from 'firebase' 
import HomeScreen from '../screens/HomeScreen';
import appTab from '../screens/appTab';

 export default class WelcomeScreen extends React.Component{
     constructor(){
         super();
         this.state={
             email:'',
             password:'',
             name:'',
             name2:'',
             contact:'',
             cP:'',
             address:'',
             isModalVisible:'false'
         }
     }
     signUp=(email,password,cP)=>{
         if (password !== cP){ 
              return Alert.alert("Password Doesn't Match");
         }else{
         firebase.auth().createUserWithEmailAndPassword(email,password).then((response)=>{
             db.collection("Users").add({
                 'FirstName':this.state.name,
                 'LastName':this.state.name2,
                 'Contact':this.state.contact,
                 'Email':this.state.email,
                 'Address':this.state.address
             })
             return Alert.alert("Successfully Signed Up",
                '',
                [
                    {text:'OK', onPress:()=>{
                       this.setState({'isModalVisible':false})
                    }}
                ]
                );
            }).catch((error)=>{
                var errorCode = error.code;
                var errorMessage = error.message;
                Alert.alert(errorMessage); 
            })
        }
    }           

     signIn=(email,password)=>{
        firebase.auth().signInWithEmailAndPassword(email,password).then((response)=>{
            this.props.navigation.navigate('Home');
           
        }).catch((error)=>{
            var errorCode = error.code;
            var errorMessage = error.message;
            return Alert.alert(errorMessage)
               
        })
    }

    showModal=()=>{
        return(
        <Modal 
        animationType='slide'
         transparent={false} 
         visible={this.state.isModalVisible}
         >
            <View style={styles.modal}>

              <ScrollView style={{width:'100%'}}>
                                
                <Text style={styles.signIng}>Signing Up</Text>

                <TextInput
                placeholder="First Name"
                maxLength={10}
                onChangeText={text=>{this.setState({name:text})}}
                style={styles.First}
                />
                <TextInput
                placeholder="Last Name"
                maxLength={15}
                onChangeText={text=>{this.setState({name2:text})}}
                style={styles.Last}
                />
                <TextInput
                placeholder="address"
                multiline={true}
                onChangeText={text=>{this.setState({address:text})}}
                style={styles.add}
                />
                <TextInput
                placeholder="Mobile No."
                maxLength={10}
                keyboardType="numeric"
                onChangeText={text=>{this.setState({contact:text})}}
                style={styles.cont}
                />
                <TextInput 
                placeholder="email Id"
                keyboardType="email-address"
                onChangeText={text=>{this.setState({email:text})}}
                style={styles.email}
                />
                <TextInput
                placeholder="password"
                secureTextEntry={true}
                onChangeText={text=>{this.setState({password:text})}}
                style={styles.pass}
                />
                <TextInput
                placeholder="confirm password"
                secureTextEntry={true}
                onChangeText={text=>{this.setState({cP:text})}}
                style={styles.cP}
                />

                <TouchableOpacity onPress={()=>this.signUp(this.state.email, this.state.password, this.state.cP)}
                                  style={styles.reg}
                >
                    <Text style={styles.register2}>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>this.setState({'isModalVisible':false})}
                                  style={styles.goBack}
                >
                    <Text style={styles.goB}>Go Back</Text>
                </TouchableOpacity>

                
                </ScrollView>
            </View>

        </Modal>
        )
    }
     render(){
        return(
            <View>
               
               <View style={{justifyContent:'center'}}></View>
                   
                <View>
                    <Text style={styles.barter}>
                    Barter System</Text>
                </View>

                {
                    this.showModal()
                }

                <KeyboardAvoidingView behavior="padding" enabled>
                    <TextInput
                        style={styles.e}
                        placeholder="email Id"
                        keyboardType="email-address"
                        onChangeText={(text)=>{this.setState({email:text})}}
                    
                        />

                    <TextInput
                        style={styles.p}
                        placeholder="password"
                        secureTextEntry={true}
                        onChangeText={(text)=>{this.setState({password:text})}}
                    />

                    <TouchableOpacity 
                        style={[styles.b,{width:100}]}
                        onPress={()=>{this.signIn(this.state.email,this.state.password)}}>
 
                        <Text style={[styles.in,{fontSize:25}]}>Sign In</Text>
                    </TouchableOpacity>
               
                    <TouchableOpacity 
                          style={[styles.a,{width:150,textAlign:'center',paddingLeft:30}]}
                          onPress={()=>this.setState({'isModalVisible':true})}>

                        <Text style={[styles.up,{fontSize:30}]}>Sign Up</Text>
                    </TouchableOpacity>
                
                </KeyboardAvoidingView>
            </View>
        )
     }   
    
}
const styles = StyleSheet.create({
    a:{
        backgroundColor:'white',
        alignSelf:'center',
        width:90,
        borderColor:'#4466FF',
        borderWidth:3,
        borderRadius:15,
        marginBottom:20,
        marginTop:20,
        marginLeft:-15
    
          
    },
    b:{
        backgroundColor:'white',
        width:90,
        borderColor:'#22CCFF',
        borderWidth:3,
        borderRadius:7,
        marginLeft:150
    },
    e:{
        marginTop:120,
        //color:'grey',
        backgroundColor:'#EEEEBB',
        width:290,
        alignSelf:'center',
        fontSize:30,
        paddingLeft:5
    },
    p:{
        marginTop:20,
        backgroundColor:"#EEEEBB",
        width:290,
        alignSelf:'center',
        marginBottom:20,
        fontSize:30,
        paddingLeft:5
    },
    back:{
        backgroundColor:'#33BB00',
        marginBottom:0

    },
    in:{
        justifyContent:'center',
        paddingLeft:0,
        fontWeight:'bold',
        alignSelf:'center',
        textAlign:'center',
        fontSize:30
    },
    up:{
        fontWeight:'bold',
        //justifyContent:'center',
        alignSelf:'center',
        marginLeft:-35,
        
    },
    modal:{
        marginTop:150,
        flex:1,
        justifyContent:'center',
        alignSelf:'center',
        alignItems:'center',
    },
    barter:{
        fontWeight:'bold',
        marginTop:130,
        justifyContent:'center',
        alignSelf:'center',
        fontSize:50,
        backgroundColor:'#8888FF',
        padding:10,
        borderRadius:15
    },
    KeyboardAvoidingView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    First:{
        borderRadius:20,
        borderWidth:2,
        borderColor:'yellow',
        fontSize:17,
        width:290,
        paddingLeft:10,
        backgroundColor:'#A0FFAA',
        marginTop:7
    },
    Last:{
        borderRadius:20,
        borderWidth:2,
        borderColor:'yellow',
        fontSize:17,
        width:290,
        paddingLeft:10,
        backgroundColor:'#A0FFAA',
        marginTop:7
    },
    add:{
        borderRadius:20,
        borderWidth:2,
        borderColor:'yellow',
        fontSize:17,
        width:290,
        paddingLeft:10,
        backgroundColor:'#A0FFAA',
        marginTop:7
    },
    cont:{
        borderRadius:20,
        borderWidth:2,
        borderColor:'yellow',
        fontSize:17,
        width:290,
        paddingLeft:10,
        backgroundColor:'#A0FFAA',
        marginTop:7
    },
    email:{
        borderRadius:20,
        borderWidth:2,
        borderColor:'yellow',
        fontSize:17,
        width:290,
        paddingLeft:10,
        backgroundColor:'#A0FFAA',
        marginTop:7
    },
    pass:{
        borderRadius:20,
        borderWidth:2,
        borderColor:'yellow',
        fontSize:17,
        width:290,
        paddingLeft:10,
        backgroundColor:'#A0FFAA',
        marginTop:7
    },
    cP:{
        borderRadius:20,
        borderWidth:2,
        borderColor:'yellow',
        fontSize:17,
        width:290,
        paddingLeft:10,
        backgroundColor:'#A0FFAA',
        marginTop:7
    },
    register2:{
        justifyContent:'center',
        alignSelf:'center',
        fontWeight:'bold',
        padding:3,        
    },
    reg:{
        borderColor:'#56FC00',
        borderWidth:2,
        borderRadius:3,
        marginTop:15,
        width:90,
        marginLeft:90,
        padding:2
    },
    goBack:{
        borderColor:'red',
        borderWidth:2,
        borderRadius:3,
        marginTop:15,
        width:90,
        marginLeft:90,
        padding:2
    },
    goB:{
        justifyContent:'center',
        alignSelf:'center'
    },
    signIng:{
        justifyContent:'center',
        alignSelf:'center',
        borderColor:'black',
        borderWidth:1,
        fontSize:20,
        borderRadius:9,
        paddingLeft:5
    }
})  