import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CustomButton } from './common';

const Appointer = (props) => {
    return (
        <View style={styles.item}>
            <Text style={styles.font20}>{props.item.name} {props.item.surname}</Text>
            <Text style={styles.font20}>{props.item.job}</Text>
            <CustomButton click={props.selectAppointer} show={true} title="Seç" />
        </View>
    );
}

export default Appointer;

const styles = StyleSheet.create({
    item: {
        width: '100%',
        padding: 5,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#ffa0ff'
    },
    font20: {
        fontSize: 20
    },
});