import { Alert, Pressable, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function showAlert(message) {
  Alert.alert(message);
}

const app = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.herotitle}>FastNotes</Text>
      <Text style={styles.subherotitle}>Your easy to use notes app</Text>
      <Pressable
            onPress={() => showAlert("A new note has been created")}
            style={({ pressed }) => [
              styles.newNoteButton,
              {backgroundColor: "#F5B727"}, 
              pressed && styles.pressedButton]}>
              <Text style={styles.buttonText}>{"+"}</Text>
              </Pressable>
      <Text style={styles.descriptiveText}>Notes:</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#212020'
  },
  herotitle: {
    color: 'white',
    fontSize: 38,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  subherotitle: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center'
  },
  newNoteButton: {
    opacity: 100,
    margin: 15,
    borderRadius: 15,
    borderColor: '#F4AE0B',
  },
  buttonText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  pressedButton: {
    opacity: 60
  },
  descriptiveText: {
    marginLeft: 15,
    fontSize: 18,
    color: "#DADADA",
  }
});

export default app