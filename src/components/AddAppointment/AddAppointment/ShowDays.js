import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View, TouchableHighlight } from "react-native";

export default class ShowDays extends Component {
    state = {
      data: []
    };
  
    componentDidMount() {
      this.fetchData();
    }
    
    fetchData = async () => {
      const response = await fetch("http://192.168.1.20:8080/api/v1/appointments/getLocalDateByBetweenTwoDate");
      const json = await response.json();
      this.setState({ data: json });
      console.log(this.state.data);
    };
  
    render() {
      const {navigate} = this.props.navigation;
      const appointerId = this.props.navigation.getParam('appointerId', null);
      return (
        <View style={styles.container}>
          <FlatList
            data={this.state.data}
            keyExtractor={(x,i) => x}
            renderItem={({ item }) =>
            <TouchableHighlight style={styles.input} onPress={() =>  navigate('ShowPeriods',{day: item, appointerId:appointerId})}>
                    <Text>{item} </Text>
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