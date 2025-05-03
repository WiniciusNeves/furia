import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        flexGrow: 1,
        padding: 20,
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        backgroundColor: '#111',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    avatar: {
        width: 60,
        height: 60,
        marginRight: 16,
        borderRadius: 30,
    },
    nickname: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    title: {
        color: '#C18624',
        fontSize: 14,
    },

    editIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    card: {
        backgroundColor: '#111',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#C18624',
    },
    label: {
        color: '#888',
        fontSize: 12,
        marginBottom: 4,
    },
    value: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorText: {
        color: '#fff',
        textAlign: 'center',
        marginTop: 40,
    },
    inputInline: {
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginTop: 4,
        color: '#fff'
    },
    saveButton: {
        marginTop: 20,
        backgroundColor: '#C18624',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 20,
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    jogarComTime: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    }

});

export default styles;  