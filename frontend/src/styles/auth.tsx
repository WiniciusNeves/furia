import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D0D0D', // fundo preto
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    logo: {
        width: "75%",
        height: "11%",
        position: 'absolute',
        top: '5%',
        left: '10%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        position: 'absolute',
        top: '20%',
    },
    subtitle: {
        color: '#aaa',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        paddingHorizontal: 20,
        position: 'absolute',
        top: '25%',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#111',
        borderColor: '#C18624',
        borderWidth: 1,
        borderRadius: 8,
        marginVertical: 15,
        paddingHorizontal: 10,
        width: '90%',
        height: 50,
    },
    icon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        color: '#fff',
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 20,
        marginRight: '5%',
    },
    forgotPasswordText: {
        color: '#fff',
        fontSize: 16,
    },
    googleButton: {
        flexDirection: 'row',
        backgroundColor: '#1E90FF',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 15,
    },
    googleButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    loginButton: {
        width: '60%',
        backgroundColor: '#C18624',
        paddingVertical: 12,
        paddingHorizontal: 50,
        borderRadius: 8,
        marginBottom: 20,
    },
    loginButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
        alignSelf: 'center',
    },
    registerContainer: {
        marginTop: 10,
      },
      registerText: {
        color: '#fff',
        fontSize: 20,
      },
});

export default styles;