import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import { withNavigation } from 'react-navigation';

import axios from '../services/customAxios';
import Appointment from './Home/Appointment';

class AppointerHome extends Component {
    state = {
        appointmentList: [],
        tabType: 'approval'
    }

    componentDidMount() {
        this.getAppointments('approval');
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.getAppointments('approval');
        });
    }

    getAppointments = (type) => {
        let type1 = type;
        this.setState({tabType: type1}, () => {
            axios.get('appointments/'+this.state.tabType).then(resp => {
                this.setState({ appointmentList: resp.data });
                console.log(resp.data)
            }).catch(error => {
                console.log(error);
                ToastAndroid.show('Randevular getirilirken bir hata oluştu!', ToastAndroid.SHORT);
            })
        });        
    }

    submitAppointment = (item) => {
        axios.post('appointments/saveappointment/'+ item).then(resp => {
            ToastAndroid.show('Randevu Ayarlandı.', ToastAndroid.SHORT);
            this.getAppointments('waitforapproval');
        }).catch(error => {
            console.log(error);
            ToastAndroid.show('Kayıtta bir hata oluştu!', ToastAndroid.SHORT);
        })
    }

    rejectAppointment = (item) => {
        axios.get('appointments/denidappointment/'+item.appointmentId).then(resp => {
            ToastAndroid.show('Randevu Reddedildi.', ToastAndroid.SHORT);
            this.getAppointments('waitforapproval');
        }).catch(error => {
            console.log(error);
            ToastAndroid.show('Kayıtta bir hata oluştu!', ToastAndroid.SHORT);
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList style={styles.appointmentList} keyExtractor={ite => ite.appointmentId.toString()} data={this.state.appointmentList} renderItem={({ item }) =>
                    <Appointment item={item} selectAppointment={() => this.submitAppointment(item)} rejectAppointment={() => this.rejectAppointment(item)} showSelectBtn={this.state.tabType==='wait-for-approval'} type="appointer" />} ListEmptyComponent={() => (<Text>Liste boş...</Text>)}
                />
                <View style={styles.tabWrapper}>
                    <TouchableOpacity style={[styles.tab, styles.tab1, this.state.tabType === 'approval' ? styles.selectedTab : '']} onPress={() => this.getAppointments("approval")}><Text>Randevular</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.tab, styles.tab2, this.state.tabType === 'waitforapproval' ? styles.selectedTab : '']} onPress={() => this.getAppointments("waitforapproval")}><Text>Randevu İstekleri</Text></TouchableOpacity>
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

export default withNavigation(AppointerHome);