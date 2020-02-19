import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import LoggedIn from '../../screens/LoggedIn';
import deviceStorage from '../../services/deviceStorage';
import Auth from '../../screens/Auth';

export default class Layout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            jwt: ''
        };
        this.newJWT = this.newJWT.bind(this);
        this.deleteJWT = deviceStorage.deleteJWT.bind(this);
        this.loadJWT = deviceStorage.loadJWT.bind(this);
    }

    newJWT(jwt) {
        this.setState({ jwt: jwt });
    }

    render() {
         if (!this.state.jwt) {
            return (
                <Auth newJWT={this.newJWT} />
            );
        } else if (this.state.jwt) {
            return (
                <LoggedIn deleteJWT={this.deleteJWT} />
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});