import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from './src/constants/Colors';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Pet Shop App Initialized!
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center'
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary
  }
});
