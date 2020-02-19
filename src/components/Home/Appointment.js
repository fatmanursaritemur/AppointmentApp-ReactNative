import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';

import { CustomButton } from '../common';

const appointment = (props) => {
    if (props.type === "appointer") {
        return (
            <View style={styles.item}>
                <Text style={styles.title}>{props.item.appointmentId}</Text>
                <View>
                    <Text style={styles.customer}>{props.item.customer ? props.item.customer.name +' '+ props.item.customer.surname : ''}
                </Text>
                </View>
                {/* <Text style={styles.customer}>{props.item.customer.name} {props.item.customer.surname}</Text>
                <Text style={styles.customer}>{props.item.appointmentDate.localDate}/{props.item.appointmentDate.period}</Text> */}
                <CustomButton click={props.selectAppointment} show={props.showSelectBtn} title="Onayla" />
                <CustomButton click={props.rejectAppointment} show={props.showSelectBtn} title="Reddet" />
            </View>
        )
    } else {
        return (
            <View style={styles.item}>
                <Text style={styles.title}>{props.item.appointmentId}</Text>
                <Text style={styles.customer}>{props.item.appointer.name} {props.item.appointer.surname}</Text>
                <Text style={styles.customer}>{props.item.appointmentDate.localDate}/{props.item.appointmentDate.period}</Text>
                <CustomButton click={props.selectAppointment} show={props.showSelectBtn} title="Seç" />
            </View>
        )
    }
};

export default appointment;

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#f9c2ff',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: WIDTH
    },
    title: {
        fontSize: 32,
        flexGrow: 1
    },
    customer: {
        flexGrow: 8,
        fontSize: 18
    },
});