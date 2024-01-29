import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useContext } from 'react';
import { Clases } from '../Clases/Clases';
import { AppContext } from '../Context/AppContext';
import { Inicio } from '../Inicio/Inicio';
import { Login } from '../Login/Login';
import { Registro } from '../Login/Registro';
import { Materias } from '../Materias/Materias';
import { Clase } from '../Clases/Clase';
import { Resumen } from '../Clases/Resumen';
const Tab = createMaterialTopTabNavigator();
const LoginStack = createStackNavigator();
const ClasesStack = createStackNavigator();

const ClasesStackNavigator = () => {
    return (
        <ClasesStack.Navigator
            screenOptions={{
                headerShown: false, 
            }}>
            <ClasesStack.Screen name='ClasesTab' component={Clases} />
            <ClasesStack.Screen name='Clase' component={Clase} />
            <ClasesStack.Screen name='Resumen' component={Resumen} />
        </ClasesStack.Navigator>
    )
}
export function MyTabs() {
    const contexto = useContext(AppContext);

    return (
        <>
            {
                contexto.usuario.email != ""
                    ?
                    <Tab.Navigator
                        screenOptions={{
                            tabBarActiveTintColor: 'black',
                            tabBarInactiveTintColor: 'black',
                            tabBarLabelStyle: { fontWeight: 'bold', color: '#fff' },
                            tabBarStyle: { backgroundColor: '#004484' },
                            tabBarIndicatorStyle: { backgroundColor: 'white', height: 5 },
                        }}
                    >
                        <Tab.Screen name="Home" component={Inicio} />
                        <Tab.Screen name="Materias" component={Materias} />
                        <Tab.Screen name="Clases" component={ClasesStackNavigator} />
                    </Tab.Navigator>
                    :
                    <LoginStack.Navigator
                        screenOptions={{
                            headerShown: false
                        }}

                    >
                        <LoginStack.Screen
                            name='Login'
                            component={Login}
                        />
                        <LoginStack.Screen
                            name='Registro'
                            component={Registro}
                        />
                    </LoginStack.Navigator>
            }
        </>

    );
}