import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { setupSections } from '../data/setupSections';
import type { RootStackParamList } from '../navigation/AppNavigator';

type SetupHomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SetupHome'
>;

export default function SetupHomeScreen() {
  const navigation = useNavigation<SetupHomeScreenNavigationProp>();

  return (
    <View style={styles.screen}>
      <StatusBar style="auto" />
      <ScrollView
        contentContainerStyle={styles.content}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View style={styles.header}>
          <Text style={styles.title}>HACCP Setup</Text>
          <Text style={styles.subtitle}>
            Configure the basic structure of your restaurant.
          </Text>
        </View>

        <View style={styles.cardList}>
          {setupSections.map((section) => (
            <Pressable
              key={section.title}
              style={styles.card}
              accessibilityRole="button"
              onPress={() => navigation.navigate(section.routeName)}
            >
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>{section.title}</Text>
                <Text style={styles.cardDescription}>
                  {section.description}
                </Text>
              </View>
              <Text style={styles.arrow}>›</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f7f8f5',
  },
  content: {
    paddingTop: 64,
    paddingHorizontal: 20,
    paddingBottom: 32,
    gap: 28,
  },
  header: {
    gap: 8,
  },
  title: {
    color: '#162115',
    fontSize: 32,
    fontWeight: '700',
  },
  subtitle: {
    color: '#5d675b',
    fontSize: 16,
    lineHeight: 23,
  },
  cardList: {
    gap: 12,
  },
  card: {
    minHeight: 88,
    padding: 18,
    borderWidth: 1,
    borderColor: '#e2e6dd',
    borderRadius: 14,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  cardText: {
    flex: 1,
    gap: 5,
  },
  cardTitle: {
    color: '#1f2a1d',
    fontSize: 17,
    fontWeight: '700',
  },
  cardDescription: {
    color: '#677163',
    fontSize: 14,
    lineHeight: 20,
  },
  arrow: {
    color: '#8c9786',
    fontSize: 28,
    fontWeight: '300',
  },
});
