import React, { Component } from 'react';
import { View, Button } from 'react-native'
import { withNavigation } from 'react-navigation';

import { Loading } from '../components/common';
import axios from '../services/customAxios';
import AppointerHome from '../components/AppointerHome';
import CustomerHome from '../components/CustomerHome';

class LoggedIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            currentUser: null
        };
    }

    componentDidMount() {
        axios.get("get-current-user").then(resp => {
            this.setState({ currentUser: resp.data });
        }).catch(error => {
            console.log(error);
        });
    }

    showByUserType = () => {
        if (this.state.currentUser && this.state.currentUser.type === "CUSTOMER") {
            return <CustomerHome/>
        } else {
            return <AppointerHome/>
        }
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={styles.container}>
                    <Loading size={'large'} />
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    {this.showByUserType()}
                    <Button onPress={() => this.props.deleteJWT()} title="Log Out" />
                </View >
            );
        }
    }
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center'
    }
};

export default withNavigation(LoggedIn);