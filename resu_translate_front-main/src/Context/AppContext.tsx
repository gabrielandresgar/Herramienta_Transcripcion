import {  useState, createContext } from "react";
import { Usuario } from "../Model/Usuario";
import { AppContextState } from "./ContextState"
type Props = {
    children: React.ReactNode
}
export const AppContext = createContext({} as AppContextState);


const AppProvider: React.FC<Props> = ({ children }) => {
    const [usuario, setUsuario] = useState<Usuario>({
        id: "",
        email: "",
        tipo: "",
        cedula: "",
        contrasenia: ""
    });
    const [render, setRender] = useState(false);
    const [par, setPar] = useState(0);
    const [idVideo, setIdVideo] = useState("");
    const [textoWhisper, setTextoWhisper] = useState("");
    const [lenuaje, setLenguaje] = useState("Spanish");
    const [idClase, setIdClase] = useState("");
    return (
        <AppContext.Provider
            value={{
                usuario: usuario,
                setUsuario: setUsuario,
                render: render,
                setRender: setRender,
                par: par,
                setPar: setPar,
                idVideo: idVideo,
                setIdVideo: setIdVideo,
                textoWhisper: textoWhisper,
                setTextoWhisper: setTextoWhisper,
                lenguaje: lenuaje,
                setLenguaje: setLenguaje,
                idClase: idClase,
                setIdClase: setIdClase
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
export default AppProvider;