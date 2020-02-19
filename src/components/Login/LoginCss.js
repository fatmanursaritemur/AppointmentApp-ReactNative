import { StyleSheet, Dimensions } from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
   
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center' 
    },
    logoContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoImage: {
        width: 100,
        height: 100,
    },
    logoText: {
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        marginTop: 20,
        fontSize: 18
    },
    formContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        width: '70%',
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
        borderRadius: 20,
        color: '#fff',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        fontSize: 18
    },
    pickerWrapper: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '70%',
        height: 44,
        padding: 0,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
        marginTop: 50,
        borderRadius: 20,
        color: '#fff',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        fontSize: 18
    },
    picker: {
        height: '100%',
        width: '100%',
        padding: 10,
        marginBottom: 10,
        color: '#fff',
    },
    text: {
        color: 'white',
        backgroundColor: 'transparent',
        fontSize: 18
    },
    loginBtn: {
        width: '70%',
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
        borderRadius: 20,
        color: '#fff',
        backgroundColor: '#d60c9d',
        alignItems: 'center'
    },
    register: {
        flex: 1,
        top: 65,
        width: DEVICE_WIDTH,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});

export default styles;