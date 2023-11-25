import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Inicio } from '../Inicio/Inicio';
import { Materias } from '../Materias/Materias';

const Tab = createMaterialTopTabNavigator();

export function MyTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Inicio} />
            <Tab.Screen name="Materias" component={Materias} />
        </Tab.Navigator>
    );
}