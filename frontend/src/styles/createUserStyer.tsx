import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B2B2B',
  },
  headerBackground: {
    width: '100%',
    height: 200,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'absolute',
    bottom: -50,
    zIndex: 1,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#F59014',
    backgroundColor: '#1a1a1a',
  },
  card: {
    marginTop: 60,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#C18624',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: '#C18624',
    paddingVertical: 10,
  },
  forgotText: {
    color: '#C18624',
    textAlign: 'right',
    marginBottom: 40,
  },
  loginButton: {
    backgroundColor: '#C18624',
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  loginButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  backText: {
    color: '#C18624',
    marginTop: 20,
    textAlign: 'center',
  },
});
