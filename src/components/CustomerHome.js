import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet, TouchableOpacity, TextInput, ToastAndroid } from 'react-native';
import { withNavigation } from 'react-navigation';

import axios from '../services/customAxios';
import Appointment from './Home/Appointment';

class CustomerHome extends Component {

    state = {
        appointmentList: [],
        tabType: 'approval',
        selectedAppointment: null
    }

    componentDidMount() {
        this.getAppointments('approval');
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.getAppointments('approval');
        })
    }

    componentWillUnmount() {
        this.getAppointments('approval');
    }

    getAppointments = (type) => {
        let type1 = type;
        this.setState({tabType: type1}, () => {
            axios.get('appointments/'+this.state.tabType).then(resp => {
                this.setState({ appointmentList: resp.data });
            }).catch(error => {
                console.log(error);
                ToastAndroid.show('Randevular getirilirken bir hata oluştu!', ToastAndroid.SHORT);
            })
        });
        
    }

    selectAppointment = (appointment) => {
        this.setState({selectedAppointment: appointment}, () => {});
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.addAppoBtn} onPress={() => this.props.navigation.navigate('GetAppointer')}>
                    <Text style={{fontSize: 24}}>+</Text>
                </TouchableOpacity >
                <FlatList style={styles.appointmentList} keyExtractor={ite => ite.appointmentId.toString()} data={this.state.appointmentList} renderItem={({ item }) =>
                    <Appointment item={item} selectAppointment={() => this.selectAppointment(item)} showSelectBtn={false} type="customer" />} ListEmptyComponent={() => (<Text>Liste boş...</Text>)}
                />
                <View style={styles.tabWrapper}>
                    <TouchableOpacity style={[styles.tab, styles.tab1, this.state.tabType === 'approval' ? styles.selectedTab : '']} onPress={() => this.getAppointments("approval")}><Text>Onaylanmış</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.tab, styles.tab2, this.state.tabType === 'waitforapproval' ? styles.selectedTab : '']} onPress={() => this.getAppointments("waitforapproval")}><Text>Onay Bekleyen</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.tab, styles.tab3, this.state.tabType === 'denied' ? styles.selectedTab : '']} onPress={() => this.getAppointments("denied")}><Text>Reddedilen</Text></TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1
    },
    addAppoBtn: {
        position: 'absolute',
        right: 0,
        bottom: 50,
        padding: 10,
        backgroundColor: 'lightblue',
        textAlign: 'center',
        width: 50,
        height: 50,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 30,
        zIndex: 5
    },
    tabWrapper: {
        bottom: 0,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        position: 'absolute',
        width: '100%'
    },
    tab: {
        textAlign: 'center',
        fontSize: 22,
        padding: 10,
        backgroundColor: 'powderblue',
    },
    tab1: {
        flexGrow: 1
    },
    tab2: {
        flexGrow: 1
    },
    tab3: {
        flexGrow: 1
    },
    selectedTab: {
        backgroundColor: 'skyblue',
        color: '#fff',
        borderWidth: 1,
        borderColor: 'steelblue'
    },
    appointmentList: {
        width: '100%'
    }
});

export default withNavigation(CustomerHome);