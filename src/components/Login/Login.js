import React, { Component } from 'react';
import { TouchableOpacity, TextInput, View, ToastAndroid, AsyncStorage, Image, Text } from 'react-native';
import axios from 'axios';
import { Notifications, Permissions } from 'expo';

import styles from './LoginCss';
import logo from '../../../assets/user.png';
import { Loading } from '../common';
import KeyboardShift from '../../services/KeyboardShift';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            loading: false
        };
    }

    askPermissions = async () => {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        if (existingStatus !== granted) {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }
        if (finalStatus !== granted) {
            return false;
        }
        return true;
    };

    sendNotificationImmediately = async () => {
        let notificationId = await Notifications.presentLocalNotificationAsync({
            title: 'This is crazy',
            body: 'Your mind will blow after reading this',
            sound: 'default',
            _displayInForeground: true,
            channelId: 'Default'
        });
        console.log(notificationId); // can be saved in AsyncStorage or send to server
    };

    scheduleNotification = async () => {
        let notificationId = Notifications.scheduleLocalNotificationAsync(
            {
                title: "I'm Scheduled",
                body: 'Wow, I can show up even when app is closed',
            },
            {
                repeat: 'minute',
                time: new Date().getTime(),
            },
        );
        console.log(notificationId);
    };

    onLogin() {
        this.setState({ loading: true });
        axios.get('http://192.168.1.25:8080/oauth/token?grant_type=password&username=' + this.state.username + '&password=' + this.state.password, {
            auth: { username: 'stajokulu', password: '123456' }
        }).then(resp => {
            ToastAndroid.show('Giriş Başarılı.', ToastAndroid.SHORT);
            AsyncStorage.setItem('token', JSON.stringify(resp.data));
            this.setState({ loading: false });
            this.props.newJWT(resp.data.access_token);
            // this.props.navigation.navigate('Home');
        }).catch(error => {
            ToastAndroid.show('Giriş Yapılamadı!', ToastAndroid.SHORT);
            console.log(error);
            this.setState({ loading: false });
        });
    }

    render() {
        return (
            <KeyboardShift>
                {() => (
                    <View style={styles.container}>
                        <View style={styles.logoContainer}>
                            <Image source={logo} style={styles.logoImage} />
                            <Text style={styles.logoText}>Randevum Giriş</Text>
                        </View>

                        <View style={styles.formContainer}>
                            <TextInput
                                value={this.state.username}
                                onChangeText={(u) => this.setState({ username: u })}
                                placeholder={'Username'}
                                style={styles.input}
                                placeholderTextColor="#564848"
                            />
                            <TextInput
                                value={this.state.password}
                                onChangeText={(p) => this.setState({ password: p })}
                                placeholder={'Password'}
                                secureTextEntry={true}
                                style={styles.input}
                                placeholderTextColor="#564848"
                            />
                            {
                                !this.state.loading ?
                                    <TouchableOpacity style={styles.loginBtn} onPress={this.onLogin.bind(this)}>
                                        <Text style={{fontSize: 18}}>Login</Text>
                                    </TouchableOpacity>
                                    : <Loading size={'large'} />
                            }

                        </View>
                        <View style={styles.register}>
                            <Text style={styles.text} onPress={this.props.authSwitch}>Create Account</Text>
                            <Text style={styles.text}>Forgot Password?</Text>
                        </View>
                    </View>
                )}
            </KeyboardShift>
        );
    }
}