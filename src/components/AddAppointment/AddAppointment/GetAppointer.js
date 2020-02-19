import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View, TouchableHighlight } from "react-native";


export default class GetAppointer extends Component {
    state = {
      data: []
    };
  
    componentDidMount() {
      this.fetchData();
    }
    
    fetchData = async () => {
      const response = await fetch("http://192.168.1.20:8080/getAllAppointer");
      const json = await response.json();
      this.setState({ data: json });
      console.log(this.state.data);
      
    };
  
    render() {
      const {navigate} = this.props.navigation;
      return (
        <View style={styles.container}>
          <FlatList
            data={this.state.data}
            keyExtractor={(x) => x}
            renderItem={({ item }) =>
            <TouchableHighlight style={styles.input} onPress={() =>  navigate('ShowDays', {appointerId: item.userId})}>
            <Text> {`${item.name} ${item.surname}`} </Text>
   
                </TouchableHighlight> 
            
              }
          />
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      marginTop: 15,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F5FCFF"
    }
  });