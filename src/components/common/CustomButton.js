import React from 'react';
import { TouchableHighlight, Text, StyleSheet } from 'react-native'

const CustomButton = (props) => {
    return (
        <TouchableHighlight style={[styles.selectBtn, {display: props.show ? 'flex' : 'none'}]} onPress={props.click}>
            <Text style={styles.font20}>{props.title}</Text>
        </TouchableHighlight>
    );
}

export { CustomButton };

const styles = StyleSheet.create({
    font20: {
        fontSize: 20
    },
    selectBtn: {
        padding: 5,
        borderWidth: 1,
        borderColor: 'lightblue',
        marginRight: 10,
        backgroundColor: 'rgba(255,255,255,0.4)',
    }
});