import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';

import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import wallpaper from '../../assets/wallpaper.png';

export default class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLogin: true
        };
        this.whichForm = this.whichForm.bind(this);
        this.authSwitch = this.authSwitch.bind(this);
    }

    authSwitch() {
        this.setState({
            showLogin: !this.state.showLogin
        });
    }

    whichForm() {
        if (!this.state.showLogin) {
            return (
                <View style={styles.container}>
                    <Register authSwitch={this.authSwitch} newJWT={this.props.newJWT} />
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <Login authSwitch={this.authSwitch} newJWT={this.props.newJWT} />
                </View>
            );
        }
    }

    render() {
        return (
            <ImageBackground source={wallpaper} style={styles.picture}>
                {this.whichForm()}
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    picture: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    },
});
