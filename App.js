import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './src/components/Home/Home';
import AddAppointment from './src/components/AddAppointment/AddAppointment';
import Layout from './src/containers/Layout/Layout';

import { decode, encode } from 'base-64';

if (!global.btoa) {
    global.btoa = encode;
}

if (!global.atob) {
    global.atob = decode;
}

const MainNav = createStackNavigator({
    AddAppointment: {
        screen: AddAppointment,
        navigationOptions: {
            title: 'Randevu Al',
            headerStyle: {
              backgroundColor: '#00bfff',
            }
        }
    },
    Layout: {
        screen: Layout,
        navigationOptions: {
            title: 'Layout',
            headerStyle: {
              backgroundColor: '#d60c9d',
            }
        }
    }
}, {
    initialRouteName: 'Layout'
})

export default createAppContainer(MainNav);
