import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    height: '30%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: '#C18624',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#C18624',
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  cancelText: {
    marginTop: 10,
    color: '#C18624',
    fontSize: 16,
  },
  
});

export default styles;

