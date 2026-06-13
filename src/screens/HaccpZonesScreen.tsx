import { StyleSheet, Text, View } from 'react-native';

export default function HaccpZonesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>HACCP Zones</Text>
      <Text style={styles.placeholder}>Coming soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f7f8f5',
    gap: 8,
  },
  title: {
    color: '#162115',
    fontSize: 28,
    fontWeight: '700',
  },
  placeholder: {
    color: '#5d675b',
    fontSize: 16,
  },
});
