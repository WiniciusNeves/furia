import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e0e0e',
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
    textTransform: 'lowercase',
    borderBottomWidth: 1,
    borderBottomColor: '#f90',
    width: '80%',
  },
  emptyText: {
    color: '#888',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
  card: {
    height: 80,
    backgroundColor: '#1c1c1c',
    borderRadius: 10,
    borderColor: '#f90',
    borderWidth: 1,
    flexDirection: 'column',
    marginTop: 15,
    overflow: 'hidden',
  },
  cardText: {
    color: '#fff',
    padding: 10,
    flex: 1,
  },
  cardImage: {
    width: 100,
    height: '100%',
  },
  addButton: {
    backgroundColor: '#f90',
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
    marginTop: 10,
    marginHorizontal: 10,
  },
  
  cardDate: {
    fontSize: 12,
    color: '#ccc',
    marginBottom: 4,
    marginLeft: 5,
  },

});
