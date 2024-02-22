import { SetStateAction, Dispatch } from "react"
import { Usuario } from "../Model/Usuario";



export type AppContextState = {
    usuario: Usuario;
    setUsuario: Dispatch<React.SetStateAction<Usuario>>;
    render: boolean;
    setRender: Dispatch<React.SetStateAction<boolean>>;
    par: number;
    setPar: Dispatch<React.SetStateAction<number>>;
    idVideo: string;
    setIdVideo: Dispatch<React.SetStateAction<string>>;
    textoWhisper: string;
    setTextoWhisper: Dispatch<React.SetStateAction<string>>;
    lenguaje: string;
    setLenguaje: Dispatch<React.SetStateAction<string>>;
};