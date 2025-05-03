import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
  },
  chatArea: {
    padding: 16,
    paddingBottom: 80,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
    maxWidth: '80%',
  },
  messageText: {
    color: '#fff',
    fontSize: 14,
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 16,
  },
  bot: {
    alignSelf: 'flex-start',
  },
  user: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  },
  botIcon: {
    width: 36,
    height: 36,
    marginRight: 6,
  },
  inputArea: {
    position: 'absolute',
    bottom: 65,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    padding: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    padding: 8,
    fontStyle: 'italic',
  },
  sendButton: {
    marginLeft: 12,
  },
  sendText: {
    fontSize: 20,
    color: '#ff9900',
  },
});
