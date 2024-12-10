import { StyleSheet } from "react-native-web";

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#E5EBEA',
  },
  appHeader: {
    backgroundColor: '#B098A4',
    padding: 45,
  },
  appTitle: {
    fontSize: 50,
    color: '#2C2C2C',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  appButtonContainer: {
    margin: 50,
    marginTop: 60,
    justifyContent: 'center',
  },
  appButton: {
    backgroundColor: '#2C2C2C',
    padding: 35,
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10,
  },
  appButtonText: {
    color: '#E5EBEA',
    fontSize: 25,
    fontWeight: 'bold',
  },
  appButtonPressed: {
    backgroundColor: '#7B8C7C', // New color when pressed
  },
  appNavBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#45503B',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 40,
  },
  appNavText: {
    fontSize: 16,
    color: '#e3dbdf',
    fontWeight: 'bold',
  },
  createHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    backgroundColor: '#B098A4',
    padding: 45,
    color: '#2C2C2C',
  },
  createContainer: {
    flex: 1,
    backgroundColor: '#E5EBEA',
  },
  questionContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 50,
    width: '100%',
  },
  label: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 50,
    color: '#333',
    textAlign: 'center',
  },
  goalInput: {
    height: 60,
    borderColor: '#B098A4',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 15,
    width: '90%',
    borderRadius: 10,
    fontSize: 18,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  summaryCaption: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 18,
    marginBottom: 5,
    textAlign: 'center',
    color: '#555',
  },
  createButton: {
    backgroundColor: '#2C2C2C',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    margin: 5,
    width: '40%',
    alignItems: 'center',
  },
  createButtonText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end', 
    marginTop: 20,
    width: '100%',
  },
  nextButton: {
    marginLeft: 'auto', 
  },
  trackContainer: {
    flex: 1,
    backgroundColor: '#E5EBEA',
  },
  trackHeader: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    backgroundColor: '#B098A4',
    padding: 45,
    color: '#2C2C2C',
  },
  goalsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  goalsStacked: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredGoalContainer: {
    width: '80%',
    marginBottom: 20,
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  editText: {
    fontSize: 16,
  },
  goalContainer: {
    width: '30%',
    marginBottom: 20,
    alignItems: 'center',
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#2C2C2C',
  },
  goalTotal: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    color: '#2C2C2C',
  },
  boxPlot: {
    width: '50%',
    height: 200,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginBottom: 10,
    position: 'relative',
    alignSelf: 'center',
  },
  progressBar: {
    width: '100%',
    backgroundColor: '#5f8575',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    position: 'absolute',
    bottom: 0,
  },
  progressText: {
    color: 'white',
    fontWeight: 'bold',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -10 }],
  },
  trackInput: {
    backgroundColor: '#FFF',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: '#2C2C2C',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  backButton: {
    backgroundColor: '#2C2C2C',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: 'white',
    fontSize: 18,
  },
  editButtonText: {
    color: 'white',
    fontSize: 18,
  },
  addButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  addButton: {
    backgroundColor: '#2C2C2C',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#E5EBEA',
    fontSize: 18,
  },
  removeButton: {
    backgroundColor: '#5f8575',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#E5EBEA',
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectButton: {
    backgroundColor: '#5f8575',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  selectSelect: {
    backgroundColor: 'E5EBEA'
  },
  selectButtonText: {
    color: '#E5EBEA',
    fontSize: 16,
    fontWeight: 'bold',
  },
  planHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    backgroundColor: '#B098A4',
    padding: 45,
    color: '#2C2C2C',
  },
  planContainer: {
    padding: 2,
    flex: 8,
    backgroundColor: '#E5EBEA',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  planTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  planInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  planLabel: {
    fontSize: 16,
    width: 150,
    marginRight: 10,
  },
  planInput: {
    backgroundColor: '#FFF',
    flex: 1,
    height: 30,
    borderWidth: 1,
    padding: 6,
    fontSize: 16,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '50%',
  },
  planButton: {
    backgroundColor: '#2C2C2C',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  planButtonText: {
    color: '#E5EBEA',
    fontSize: 16,
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    width: 300,
    minHeight: 500,
    backgroundColor: "#45503B",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'center',
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 19,
    fontWeight: 'bold',
    color: '#e3dbdf',
  },
  modalSubtitle: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 17,
    fontWeight: 'bold',
    color: '#e3dbdf',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: '#E5EBEA',
  },
  buttonClose: {
    backgroundColor: "#e3dbdf",
    color: '#2C2C2C',
    fontWeight: 'bold',
  },
  errorInput: {
    borderColor: 'red',
    borderWidth: 1
  },
  planLabel: {
    fontWeight: 'bold',
  }
});
export default styles;
