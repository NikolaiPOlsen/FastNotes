import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { Pressable, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function HomeScreen( {navigation} ) {
    return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.herotitle}>FastNotes</Text>
      <Text style={styles.subherotitle}>Your easy to use notes app</Text>
      <Text style={styles.descriptiveText}>Notes:</Text>
    <SafeAreaView style={styles.pageSpace} edges={['bottom']}>
        <Pressable
              onPress={() => navigation.navigate("New Note")} 
              style={({ pressed }) => [
                styles.newNoteButton,
                {backgroundColor: "#735530"}, 
                pressed && styles.pressedButton]}>
                    <Text style={styles.buttonText}>{"New note"}</Text>
                    <MaterialIcons name="article" size={22} color="white"/>
        </Pressable>
    </SafeAreaView>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  herotitle: {
    fontSize: 38,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  subherotitle: {
    fontSize: 14,
    textAlign: 'center'
  },
  descriptiveText: {
    marginLeft: '5%',
    marginRight: '5%',
    fontSize: 18,
    borderBottomWidth: 1,
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  pressedButton: {
    opacity: 60
  },
  newNoteButton: {
    margin: 15,
    width: '90%',
    borderRadius: 15,
    borderColor: '#735530',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  pageSpace: {
    alignItems: 'center'
  },
  
});