import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AppSettingsScreen from '../screens/AppSettingsScreen';
import ControlTypesScreen from '../screens/ControlTypesScreen';
import DepartmentsScreen from '../screens/DepartmentsScreen';
import EquipmentScreen from '../screens/EquipmentScreen';
import HaccpZonesScreen from '../screens/HaccpZonesScreen';
import RestaurantProfileScreen from '../screens/RestaurantProfileScreen';
import SetupHomeScreen from '../screens/SetupHomeScreen';
import SuppliersScreen from '../screens/SuppliersScreen';
import UsersRolesScreen from '../screens/UsersRolesScreen';

export type RootStackParamList = {
  SetupHome: undefined;
  RestaurantProfile: undefined;
  Departments: undefined;
  HaccpZones: undefined;
  Equipment: undefined;
  Suppliers: undefined;
  UsersRoles: undefined;
  ControlTypes: undefined;
  AppSettings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SetupHome"
        screenOptions={{
          contentStyle: { backgroundColor: '#f7f8f5' },
          headerBackTitle: 'Back',
        }}
      >
        <Stack.Screen
          name="SetupHome"
          component={SetupHomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RestaurantProfile"
          component={RestaurantProfileScreen}
          options={{ title: 'Restaurant Profile' }}
        />
        <Stack.Screen
          name="Departments"
          component={DepartmentsScreen}
          options={{ title: 'Departments' }}
        />
        <Stack.Screen
          name="HaccpZones"
          component={HaccpZonesScreen}
          options={{ title: 'HACCP Zones' }}
        />
        <Stack.Screen
          name="Equipment"
          component={EquipmentScreen}
          options={{ title: 'Equipment' }}
        />
        <Stack.Screen
          name="Suppliers"
          component={SuppliersScreen}
          options={{ title: 'Suppliers' }}
        />
        <Stack.Screen
          name="UsersRoles"
          component={UsersRolesScreen}
          options={{ title: 'Users & Roles' }}
        />
        <Stack.Screen
          name="ControlTypes"
          component={ControlTypesScreen}
          options={{ title: 'Control Types' }}
        />
        <Stack.Screen
          name="AppSettings"
          component={AppSettingsScreen}
          options={{ title: 'App Settings' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
