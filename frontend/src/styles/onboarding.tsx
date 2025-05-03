import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 0,
        padding: 0,
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    mainImage:{
        width:"90%",
        height: "50%",
        position: 'absolute',
        top: '20%',
        marginHorizontal: "5%", 
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default styles;