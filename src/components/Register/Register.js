import React, { Component } from 'react';
import { ScrollView, TextInput, Button, Picker, ToastAndroid, TouchableOpacity, View, Text } from 'react-native';

import styles from '../Login/LoginCss';
import axios from 'axios';
import KeyboardShift from '../../services/KeyboardShift';
import { Loading } from '../common';

export default class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            surname: '',
            email: '',
            type: 'CUSTOMER',
            username: '',
            password: '',
            job: '',
            loading: false
        };
    }

    onRegister() {
        this.setState({ loading: true });
        const user = {
            name: this.state.name,
            surname: this.state.surname,
            email: this.state.email,
            type: this.state.type,
            username: this.state.username,
            password: this.state.password,
            job: this.state.job
        };
        ToastAndroid.show('Post atıldı!', ToastAndroid.SHORT);
        axios.post('http://192.168.1.25:8080/registration', user).then(resp => {
            ToastAndroid.show('Kayıt Başarılı.', ToastAndroid.SHORT);
            // this.props.navigation.navigate('Login');
            this.props.authSwitch
            this.setState({
                name: '',
                surname: '',
                email: '',
                type: 'CUSTOMER',
                job: '',
                username: '',
                password: '',
                loading: false
            });
        }).catch(error => {
            console.log(error);
            ToastAndroid.show('Kayıt Hatası!', ToastAndroid.SHORT);
            ToastAndroid.show(error.message, ToastAndroid.SHORT);

            this.setState({ loading: false });
        });
    }

    render() {
        return (
            <KeyboardShift>
                {() => (
                    <ScrollView contentContainerStyle={styles.container}>
                        <View style={styles.pickerWrapper}>
                            <Picker selectedValue={this.state.type} style={styles.picker} onValueChange={itemVal => this.setState({ type: itemVal })}>
                                <Picker.Item label="Customer" value="CUSTOMER" />
                                <Picker.Item label="Appointer" value="APPOINTER" />
                            </Picker>
                        </View>
                        <TextInput
                            value={this.state.name}
                            onChangeText={(n) => this.setState({ name: n })}
                            placeholder={'Ad'}
                            style={styles.input}
                            placeholderTextColor="#564848"
                        />
                        <TextInput
                            value={this.state.surname}
                            onChangeText={(n) => this.setState({ surname: n })}
                            placeholder={'Soyad'}
                            style={styles.input}
                            placeholderTextColor="#564848"
                        />
                        <TextInput
                            value={this.state.email}
                            onChangeText={(n) => this.setState({ email: n })}
                            placeholder={'E-Posta'}
                            style={styles.input}
                            placeholderTextColor="#564848"
                        />
                        <TextInput
                            value={this.state.job}
                            onChangeText={(n) => this.setState({ job: n })}
                            placeholder={'Meslek'}
                            style={[styles.input, { display: this.state.type === 'APPOINTER' ? 'flex' : 'none' }]}
                            placeholderTextColor="#564848"
                        />
                        <TextInput
                            value={this.state.username}
                            onChangeText={(n) => this.setState({ username: n })}
                            placeholder={'Kullanıcı Adı'}
                            style={styles.input}
                            placeholderTextColor="#564848"
                        />
                        <TextInput
                            value={this.state.password}
                            onChangeText={(n) => this.setState({ password: n })}
                            placeholder={'Şifre'}
                            secureTextEntry={true}
                            style={styles.input}
                            placeholderTextColor="#564848"
                        />

                        {
                            !this.state.loading ?
                                <TouchableOpacity style={styles.loginBtn} onPress={this.onRegister.bind(this)}>
                                    <Text style={{fontSize: 18}}>Register</Text>
                                </TouchableOpacity>
                                : <Loading size={'large'} />
                        }

                        <View style={styles.register}>
                            <Text style={styles.text} onPress={this.props.authSwitch}>Login</Text>
                        </View>
                    </ScrollView>
                )}
            </KeyboardShift>
        )
    }
}