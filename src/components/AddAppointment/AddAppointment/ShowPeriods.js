import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View, TouchableHighlight, Alert, ToastAndroid } from "react-native";
import axios from '../../CustomAxios';

export default class ShowPeriods extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appointerid: props.navigation.getParam('appointerId'),
      localdate: props.navigation.getParam('day'),
      period: '',
      periodlist: [],
      appointmet: [],

    };
    this.getPeriods();
  }

  static navigationOptions = {
    title: '',
  };

  requestAppointmentByCustomer(period) {
    const response = axios.get('api/v1/appointments/getAppointmentByBAppointer/', this.state.appointerid + '/' + this.state.localdate + '/' + period).then(resp => {
      this.setState({ appointment: resp.data })
      axios.get('api/v1/appointments/requestAppointmentbyCustomer/' + this.state.appointment.appointmentId)
    }).catch(error => {
      console.log(error);
      ToastAndroid.show('Kayıtta bir hata oluştu!', ToastAndroid.SHORT);
    });
  }
  getPeriods() {
    axios.get('api/v1/appointments/getappointmentCandidateList/' + this.state.appointerid + '/' + this.state.localdate).then(resp => {
      this.setState({ periodlist: resp.data });
      console.log(resp.data);
    }).catch(error => {
      console.log(error);
      Alert.alert('Başarısız!')
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.periodlist}
          keyExtractor={(x, i) => x}
          renderItem={({ data }) =>
            <TouchableHighlight style={styles.input} onPress={() => this.requestAppointmentByCustomer(data)}>
              <Text>{data} </Text>
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
    alignItems: "center"
  }, 
  input: {
    backgroundColor: 'lightblue',
    color: '#000',
    width: 40
  }
});