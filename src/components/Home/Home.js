import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import axios from '../../services/customAxios';
import Appointment from './Appointment';

class Home extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Home',
            headerTitleStyle: {color: '#000'},
            headerRight: (
                <Button
                    onPress={navigation.getParam('handleLogout')}
                    title="Out"
                    color="#fff"
                />
            ),
        };
    }

    componentDidMount() {
        this.props.navigation.setParams({ title: 'HomE' });
        axios.get('appointments/waitforapproval').then(resp => {
            this.setState({ appointmentList: resp.data.slice(0, 10) });
        }).catch(error => console.log(error))
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.addAppoBtn} onPress={() => this.props.navigation.navigate('AddAppointment')}>
                    <Text>+</Text>
                </TouchableOpacity >
                <FlatList style={styles.list} keyExtractor={ite => ite.appointmentId.toString()} data={this.state.appointmentList} renderItem={({item}) => <Appointment item={item}/>} />
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
    addAppoBtn: {
        position: 'absolute',
        right: 0,
        top: 0,
        padding: 10,
        backgroundColor: 'lightblue',
        textAlign: 'center',
        width: 50,
        height: 50,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 30
    },
    list: {
        marginTop: 40
    }
});

export default withNavigation(Home);