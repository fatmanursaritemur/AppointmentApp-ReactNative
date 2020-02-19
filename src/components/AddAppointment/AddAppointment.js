import React, { Component } from 'react';
import { ToastAndroid, ScrollView, TextInput, FlatList, StyleSheet, View, Text, Modal, Alert, TouchableHighlight } from 'react-native';

import axios from '../../services/customAxios';
import KeyboardShift from '../../services/KeyboardShift';
import Appointer from '../Appointer';
import Appointment from '../Home/Appointment';

export default class AddAppointment extends Component {
    state = {
        token: null,
        appointers: [],
        selectedAppointer: '',
        showAppointers: false,
        showAppointments: false,
        selectedAppointment: null,
        appointments: [],
        modalVisible: false
    }

    searchAppointer = (searchKey) => {
        this.setState({ showAppointers: true });
        axios.get('search-appointer/' + searchKey).then(resp => {
            this.setState({ appointers: resp.data });
        }).catch(error => {
            console.log(error);
        })
    }

    selectAppointer = (appo) => {
        this.setState({ selectedAppointer: appo, showAppointers: false, showAppointments: true }, () => {
            this.getAppointmentsByAppointer();
        });
    }

    addAppointment = () => {
        axios.post('appointments/requestAppointmentbyCustomer', this.state.selectedAppointment).then(resp => {
            ToastAndroid.show('Randevu talebiniz alındı.', ToastAndroid.SHORT);
            this.props.navigation.goBack();
        }).catch(error => {
            console.log(error);
            ToastAndroid.show('Kayıtta bir hata oluştu!', ToastAndroid.SHORT);
        })
    }

    selectAppointment = (appointment) => {
        this.setState({ selectedAppointment: appointment, showAppointments: false, modalVisible: true }, () => { });
    }

    getAppointmentsByAppointer = () => {
        axios.get("appointments/getAppointmentByBetweenTwoDate/" + this.state.selectedAppointer.userId).then(resp => {
            this.setState({ appointments: resp.data });
        }).catch(error => console.log(error));
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible, showAppointments: true });
    }

    render() {
        let appointers = null;
        if (this.state.showAppointers) {
            appointers = <FlatList style={styles.appointerList} keyExtractor={ite => ite.userId.toString()} data={this.state.appointers} renderItem={({ item }) =>
                <Appointer item={item} selectAppointer={() => this.selectAppointer(item)} />}
            />
        }
        let appointmentList = null;
        if (this.state.showAppointments) {
            appointmentList = <FlatList style={styles.appointmentList} keyExtractor={ite => ite.appointmentId.toString()} data={this.state.appointments} renderItem={({ item }) =>
                <Appointment item={item} selectAppointment={() => this.selectAppointment(item)} showSelectBtn={true} type="customer" />} ListEmptyComponent={() => (<Text>Liste boş...</Text>)}
            />
        }
        let modal = null;
        if (this.state.modalVisible) {
            modal =
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={{ flex: 1, marginTop: 22 }}>
                        <View style={styles.modalContainer}>
                            <Text style={[styles.appointerName]}>~~ {this.state.selectedAppointer.name} {this.state.selectedAppointer.surname} ~~</Text>
                            <Text style={styles.font18}>kişisinden {this.state.selectedAppointment.appointmentDate.localDate} - {this.state.selectedAppointment.appointmentDate.period} tarihine randevu talebi hazır.</Text>

                            <View style={styles.modalBtnWrapper}>
                                <TouchableHighlight style={[styles.modalBtn, styles.btnCancel]} onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                }}>
                                    <Text style={styles.font18}>İptal</Text>
                                </TouchableHighlight>
                                <TouchableHighlight style={[styles.modalBtn, styles.btnSubmit]} onPress={this.addAppointment}>
                                    <Text style={styles.font18}>Randevu Al</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </Modal>
        }
        return (
            <KeyboardShift>
                {() => (
                    <ScrollView contentContainerStyle={styles.container}>
                        <View style={styles.searchInputWrapper}>
                            <TextInput placeholder="Kişi Ara..." keyboardType="default" onChangeText={(text) => this.searchAppointer(text)} />
                        </View>
                        {appointers}
                        <Text style={[styles.appointerName, { display: this.state.selectedAppointer ? 'flex' : 'none' }]}>~~ {this.state.selectedAppointer.name} {this.state.selectedAppointer.surname} ~~</Text>
                        {appointmentList}
                        {modal}
                    </ScrollView>
                )}
            </KeyboardShift>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    appointerList: {
        borderWidth: 1,
        width: '90%',
        zIndex: 5,
        padding: 10,
        flexGrow: 0
    },
    appointerName: {
        textAlign: 'center',
        color: 'lightblue',
        fontSize: 30
    },
    searchInputWrapper: {
        borderWidth: 1,
        borderColor: '#000',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 10,
        width: '90%',
        margin: 10,
        marginBottom: 0
    },
    input: {
        width: 200,
        height: 44,
        padding: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
        borderRadius: 10,
        color: '#000',
        backgroundColor: 'rgba(255, 255, 255, 0.2)'
    },
    appointmentList: {
        width: '100%'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        top: '40%'
    },
    modalBtnWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    modalBtn: {
        padding: 20,
        borderWidth: 1,
        height: 50,
        flexGrow: 1,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnCancel: {
        backgroundColor: '#c21500'
    },
    btnSubmit: {
        backgroundColor: '#AAFFA9'
    },
    font18: {
        fontSize: 18
    }
});