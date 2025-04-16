// Importar los componentes
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Iniciogoogle from './components/Iniciogoogle';
import Loginsesion from './components/Loginsesion';
import Lecciones from './components/Lecciones';
import Ranking from './components/Ranking';
import Insignias from './components/Insignias'; 
import Nivel1 from './components/Nivel1';
import Examen from './components/Examen';
import Examen2 from './components/Examen2';
import Examen3 from './components/Examen3';
import Examennivel1 from './components/Examennivel1';
import Examennivel2 from './components/Examennivel2';
import Examennivel3 from './components/Examennivel3';
import Condicionales from './components/Condicionales';
import Unotest from './components/Unotest';
import Chatbot from './components/Chatbot'; 

import Enunciado1 from './components/Nivel1/Enunciados/enunciado1';
import Enunciado3 from './components/Nivel1/Enunciados/enunciado3';
import Enunciado4 from './components/Nivel1/Enunciados/enunciado4';
import Enunciado5 from './components/Nivel1/Enunciados/enunciado5';
import Enunciado6 from './components/Nivel1/Enunciados/enunciado6';
import Enunciado7 from './components/Nivel1/Enunciados/enunciado7';
import Enunciado8 from './components/Nivel1/Enunciados/enunciado8';
import Enunciado9 from './components/Nivel1/Enunciados/enunciado9';
import Enunciado10 from './components/Nivel1/Enunciados/enunciado10';
import Enunciado11 from './components/Nivel1/Enunciados/enunciado11';
import Enunciado12 from './components/Nivel1/Enunciados/enunciado12';
import Enunciado13 from './components/Nivel1/Enunciados/enunciado13';
import Enunciado14 from './components/Nivel1/Enunciados/enunciado14';
import Enunciado15 from './components/Nivel1/Enunciados/enunciado15';
import Enunciado16 from './components/Nivel1/Enunciados/enunciado16';
import Enunciado17 from './components/Nivel1/Enunciados/enunciado17';
import Enunciado18 from './components/Nivel1/Enunciados/enunciado18';
import Enunciado19 from './components/Nivel1/Enunciados/enunciado19';
import Enunciado20 from './components/Nivel1/Enunciados/enunciado20';
import Enunciado21 from './components/Nivel1/Enunciados/enunciado21';
import Enunciado22 from './components/Nivel1/Enunciados/enunciado22';
import Enunciado23 from './components/Nivel1/Enunciados/enunciado23';
import Enunciado24 from './components/Nivel1/Enunciados/enunciado24';
import Enunciado25 from './components/Nivel1/Enunciados/enunciado25';
import Enunciado26 from './components/Nivel1/Enunciados/enunciado26';
import Enunciado27 from './components/Nivel1/Enunciados/enunciado27';
import Enunciado28 from './components/Nivel1/Enunciados/enunciado28';
import Enunciado29 from './components/Nivel1/Enunciados/enunciado29';
import Enunciado30 from './components/Nivel1/Enunciados/enunciado30';
import Enunciado31 from './components/Nivel1/Enunciados/enunciado31';
import Enunciado32 from './components/Nivel1/Enunciados/enunciado32';
import Enunciado33 from './components/Nivel1/Enunciados/enunciado33';
import Enunciado34 from './components/Nivel1/Enunciados/enunciado34';
import Enunciado35 from './components/Nivel1/Enunciados/enunciado35';
import Enunciado36 from './components/Nivel1/Enunciados/enunciado36';
import Enunciado37 from './components/Nivel1/Enunciados/enunciado37';
import Enunciado38 from './components/Nivel1/Enunciados/enunciado38';
import Enunciado39 from './components/Nivel1/Enunciados/enunciado39';
import Enunciado40 from './components/Nivel1/Enunciados/enunciado40';
import Enunciado41 from './components/Nivel1/Enunciados/enunciado41';
import Enunciado42 from './components/Nivel1/Enunciados/enunciado42';
import Enunciado43 from './components/Nivel1/Enunciados/enunciado43';
import Enunciado44 from './components/Nivel1/Enunciados/enunciado44';
import Enunciado45 from './components/Nivel1/Enunciados/enunciado45';
import Enunciado46 from './components/Nivel1/Enunciados/enunciado46';
import Enunciado47 from './components/Nivel1/Enunciados/enunciado47';
import Enunciado48 from './components/Nivel1/Enunciados/enunciado48';
import Enunciado49 from './components/Nivel1/Enunciados/enunciado49';
import Enunciado50 from './components/Nivel1/Enunciados/enunciado50';
import Dos from './components/Nivel1/Basicos/2'
import Tres from './components/Nivel1/Basicos/3';
import Cuatro from './components/Nivel1/Basicos/4';
import Cinco from './components/Nivel1/Basicos/5';
import Seis from './components/Nivel1/Basicos/6';
import Siete from './components/Nivel1/Basicos/7';
import Ocho from './components/Nivel1/Basicos/8';
import Nueve from './components/Nivel1/Basicos/9';
import Diez from './components/Nivel1/Basicos/10';
import Once from './components/Nivel1/Basicos/11';
import Doce from './components/Nivel1/Intermedios/12';
import Trece from './components/Nivel1/Intermedios/13';
import Catorce from './components/Nivel1/Intermedios/14';
import Quince from './components/Nivel1/Intermedios/15';
import Dieciséis from './components/Nivel1/Intermedios/16';
import Diecisiete from './components/Nivel1/Intermedios/17';
import Dieciocho from './components/Nivel1/Intermedios/18';
import Diecinueve from './components/Nivel1/Basicos/19';
import Veinte from './components/Nivel1/Basicos/20';
import Veintiuno from './components/Nivel1/Seleccion/21';
import Veintidos  from './components/Nivel1/Seleccion/22';
import Veintitres from './components/Nivel1/Seleccion/23';
import Veinticuatro from './components/Nivel1/Seleccion/24';
import Veinticinco from './components/Nivel1/Seleccion/25';
import Veintiseis from './components/Nivel1/Seleccion/26';
import Veintisiete from './components/Nivel1/Seleccion/27';
import Veintiocho from './components/Nivel1/Seleccion/28';
import Veintinueve from './components/Nivel1/Intermedios/29';
import Trientauno from './components/Nivel1/Intermedios/31';
import Trientados from './components/Nivel1/Intermedios/32';
import Trientatres from './components/Nivel1/Intermedios/33';
import Trientacuatro from './components/Nivel1/Intermedios/34';
import Trientacinco from './components/Nivel1/Intermedios/35';
import Trientaseis from './components/Nivel1/Intermedios/36';
import Trientasiete from './components/Nivel1/Intermedios/37';
import Trientaocho from './components/Nivel1/Intermedios/38';
import Trientanueve from './components/Nivel1/Intermedios/39';
import Cuarenta from './components/Nivel1/Memoria/40';
import Cuarentauno from './components/Nivel1/Memoria/41';
import Cuarentados from './components/Nivel1/Memoria/42';
import Cuarentatres from './components/Nivel1/Memoria/43';
import Cuarentacuatro from './components/Nivel1/Memoria/44';
import Cuarentacinco from './components/Nivel1/Memoria/45';
import Cuarentaseis from './components/Nivel1/Memoria/46';
import Cuarentasiete from './components/Nivel1/Memoria/47';
import Cuarentaocho from './components/Nivel1/Memoria/48';
import Cuarentanueve from './components/Nivel1/Memoria/49';
import Cuarentacincuenta from './components/Nivel1/Memoria/50';
import Uno from './components/Nivel1/Basicos/1'
import Foro from './components/foro';
import Dashboard from './components/Dashboard';
import Header from './components/Header'; 
import Challenges from './components/Challenges'; 
import Avances from './components/Avances'; 
import Nivel2 from './components/Nivel2'; 
import Nivel3 from './components/Nivel3'; 
import React from 'react';
import UnoNivel2 from './components/Nivel2/Basicos/1'
import DosNivel2 from './components/Nivel2/Basicos/2'
import TresNivel2 from './components/Nivel2/Basicos/3'
import CuatroNivel2 from './components/Nivel2/Basicos/4'
import CincoNivel2 from './components/Nivel2/Basicos/5'
import SeisNivel2 from './components/Nivel2/Basicos/6'
import SieteNivel2 from './components/Nivel2/Basicos/7'
import OchoNivel2 from './components/Nivel2/Basicos/8'
import NueveNivel2 from './components/Nivel2/Basicos/9'
import DiezNivel2 from './components/Nivel2/Basicos/10'
import OnceNivel2 from './components/Nivel2/Basicos/11'
import DoceNivel2 from './components/Nivel2/Basicos/12'
import TreceNivel2 from './components/Nivel2/Basicos/13'
import CatorceNivel2 from './components/Nivel2/Basicos/14'
import QuinceNivel2 from './components/Nivel2/Basicos/15'

import DieciséisNivel2 from './components/Nivel2/Intermedios/16';
import DiecisieteNivel2 from './components/Nivel2/Intermedios/17';
import DieciochoNivel2 from './components/Nivel2/Intermedios/18';
import DiecinueveNivel2 from './components/Nivel2/Intermedios/19';
import VeinteNivel2 from './components/Nivel2/Intermedios/20';
import VeintiunoNivel2 from './components/Nivel2/Intermedios/21';
import VeintidosNivel2  from './components/Nivel2/Intermedios/22';
import VeintitresNivel2 from './components/Nivel2/Intermedios/23';
import VeinticuatroNivel2 from './components/Nivel2/Intermedios/24';
import VeinticincoNivel2 from './components/Nivel2/Intermedios/25';
import VeintiseisNivel2 from './components/Nivel2/Intermedios/26';
import VeintisieteNivel2 from './components/Nivel2/Intermedios/27';
import VeintiochoNivel2 from './components/Nivel2/Intermedios/28';
import VeintinueveNivel2 from './components/Nivel2/Intermedios/29';
import TreintaNivel2 from './components/Nivel2/Intermedios/30';

import TreintaunoNivel2 from './components/Nivel2/Seleccion/31';
import TreintadosNivel2 from './components/Nivel2/Seleccion/32';
import TreintatresNivel2 from './components/Nivel2/Seleccion/33';
import TreintacuatroNivel2 from './components/Nivel2/Seleccion/34';
import TreintacincoNivel2 from './components/Nivel2/Seleccion/35';
import TreintaseisNivel2 from './components/Nivel2/Seleccion/36';
import TreintasieteNivel2 from './components/Nivel2/Seleccion/37';
import TreintaochoNivel2 from './components/Nivel2/Seleccion/38';
import TreintanueveNivel2 from './components/Nivel2/Seleccion/39';
import CuarentaNivel2 from './components/Nivel2/Seleccion/40';

import CuarentaUnoNivel2 from './components/Nivel2/Memoria/41';
import CuarentaDosNivel2 from './components/Nivel2/Memoria/42';
import CuarentaTresNivel2 from './components/Nivel2/Memoria/43';
import CuarentaCuatroNivel2 from './components/Nivel2/Memoria/44';
import CuarentaCincoNivel2 from './components/Nivel2/Memoria/45';
import CuarentaSeisNivel2 from './components/Nivel2/Memoria/46';
import CuarentaSieteNivel2 from './components/Nivel2/Memoria/47';
import CuarentaOchoNivel2 from './components/Nivel2/Memoria/48';
import CuarentaNueveNivel2 from './components/Nivel2/Memoria/49';
import CincuentaNivel2 from './components/Nivel2/Memoria/50';



import UnoNivel3 from './components/Nivel3/Basicos/1'
import DosNivel3 from './components/Nivel3/Basicos/2'
import TresNivel3 from './components/Nivel3/Basicos/3'
import CuatroNivel3 from './components/Nivel3/Basicos/4'
import CincoNivel3 from './components/Nivel3/Basicos/5'
import SeisNivel3 from './components/Nivel3/Basicos/6'
import SieteNivel3 from './components/Nivel3/Basicos/7'
import OchoNivel3 from './components/Nivel3/Basicos/8'
import NueveNivel3 from './components/Nivel3/Basicos/9'
import DiezNivel3 from './components/Nivel3/Basicos/10'
import OnceNivel3 from './components/Nivel3/Basicos/11'
import DoceNivel3 from './components/Nivel3/Basicos/12'
import TreceNivel3 from './components/Nivel3/Basicos/13'
import CatorceNivel3 from './components/Nivel3/Basicos/14'
import QuinceNivel3 from './components/Nivel3/Basicos/15'

import DieciséisNivel3 from './components/Nivel3/Intermedios/16';
import DiecisieteNivel3 from './components/Nivel3/Intermedios/17';
import DieciochoNivel3 from './components/Nivel3/Intermedios/18';
import DiecinueveNivel3 from './components/Nivel3/Intermedios/19';
import VeinteNivel3 from './components/Nivel3/Intermedios/20';
import VeintiunoNivel3 from './components/Nivel3/Intermedios/21';
import VeintidosNivel3  from './components/Nivel3/Intermedios/22';
import VeintitresNivel3 from './components/Nivel3/Intermedios/23';
import VeinticuatroNivel3 from './components/Nivel3/Intermedios/24';
import VeinticincoNivel3 from './components/Nivel3/Intermedios/25';
import VeintiseisNivel3 from './components/Nivel3/Intermedios/26';
import VeintisieteNivel3 from './components/Nivel3/Intermedios/27';
import VeintiochoNivel3 from './components/Nivel3/Intermedios/28';
import VeintinueveNivel3 from './components/Nivel3/Intermedios/29';
import TreintaNivel3 from './components/Nivel3/Intermedios/30';


import TreintaunoNivel3 from './components/Nivel3/Seleccion/31';
import TreintadosNivel3 from './components/Nivel3/Seleccion/32';
import TreintatresNivel3 from './components/Nivel3/Seleccion/33';
import TreintacuatroNivel3 from './components/Nivel3/Seleccion/34';
import TreintacincoNivel3 from './components/Nivel3/Seleccion/35';
import TreintaseisNivel3 from './components/Nivel3/Seleccion/36';
import TreintasieteNivel3 from './components/Nivel3/Seleccion/37';
import TreintaochoNivel3 from './components/Nivel3/Seleccion/38';
import TreintanueveNivel3 from './components/Nivel3/Seleccion/39';
import CuarentaNivel3 from './components/Nivel3/Seleccion/40';

import CuarentaUnoNivel3 from './components/Nivel3/Memoria/41';
import CuarentaDosNivel3 from './components/Nivel3/Memoria/42';
import CuarentaTresNivel3 from './components/Nivel3/Memoria/43';
import CuarentaCuatroNivel3 from './components/Nivel3/Memoria/44';
import CuarentaCincoNivel3 from './components/Nivel3/Memoria/45';
import CuarentaSeisNivel3 from './components/Nivel3/Memoria/46';
import CuarentaSieteNivel3 from './components/Nivel3/Memoria/47';
import CuarentaOchoNivel3 from './components/Nivel3/Memoria/48';
import CuarentaNueveNivel3 from './components/Nivel3/Memoria/49';
import CincuentaNivel3 from './components/Nivel3/Memoria/50';

import Enunciado1Nivel2 from './components/Nivel2/Enunciados/enunciado1';
import Enunciado2Nivel2 from './components/Nivel2/Enunciados/enunciado2';
import Enunciado3Nivel2 from './components/Nivel2/Enunciados/enunciado3';
import Enunciado4Nivel2 from './components/Nivel2/Enunciados/enunciado4';
import Enunciado5Nivel2 from './components/Nivel2/Enunciados/enunciado5';
import Enunciado6Nivel2 from './components/Nivel2/Enunciados/enunciado6';
import Enunciado7Nivel2 from './components/Nivel2/Enunciados/enunciado7';
import Enunciado8Nivel2 from './components/Nivel2/Enunciados/enunciado8';
import Enunciado9Nivel2 from './components/Nivel2/Enunciados/enunciado9';
import Enunciado10Nivel2 from './components/Nivel2/Enunciados/enunciado10';
import Enunciado11Nivel2 from './components/Nivel2/Enunciados/enunciado11';
import Enunciado12Nivel2 from './components/Nivel2/Enunciados/enunciado12';
import Enunciado13Nivel2 from './components/Nivel2/Enunciados/enunciado13';
import Enunciado14Nivel2 from './components/Nivel2/Enunciados/enunciado14';
import Enunciado15Nivel2 from './components/Nivel2/Enunciados/enunciado15';


import Enunciado16Nivel2 from './components/Nivel2/Enunciados/enunciado16';
import Enunciado17Nivel2 from './components/Nivel2/Enunciados/enunciado17';
import Enunciado18Nivel2 from './components/Nivel2/Enunciados/enunciado18';
import Enunciado19Nivel2 from './components/Nivel2/Enunciados/enunciado19';
import Enunciado20Nivel2 from './components/Nivel2/Enunciados/enunciado20';
import Enunciado21Nivel2 from './components/Nivel2/Enunciados/enunciado21';
import Enunciado22Nivel2 from './components/Nivel2/Enunciados/enunciado22';
import Enunciado23Nivel2 from './components/Nivel2/Enunciados/enunciado23';
import Enunciado24Nivel2 from './components/Nivel2/Enunciados/enunciado24';
import Enunciado25Nivel2 from './components/Nivel2/Enunciados/enunciado25';
import Enunciado26Nivel2 from './components/Nivel2/Enunciados/enunciado26';
import Enunciado27Nivel2 from './components/Nivel2/Enunciados/enunciado27';
import Enunciado28Nivel2 from './components/Nivel2/Enunciados/enunciado28';
import Enunciado29Nivel2 from './components/Nivel2/Enunciados/enunciado29';
import Enunciado30Nivel2 from './components/Nivel2/Enunciados/enunciado30';


import Enunciado31Nivel2 from './components/Nivel2/Enunciados/enunciado31';
import Enunciado32Nivel2 from './components/Nivel2/Enunciados/enunciado32';
import Enunciado33Nivel2 from './components/Nivel2/Enunciados/enunciado33';
import Enunciado34Nivel2 from './components/Nivel2/Enunciados/enunciado34';
import Enunciado35Nivel2 from './components/Nivel2/Enunciados/enunciado35';
import Enunciado36Nivel2 from './components/Nivel2/Enunciados/enunciado36';
import Enunciado37Nivel2 from './components/Nivel2/Enunciados/enunciado37';
import Enunciado38Nivel2 from './components/Nivel2/Enunciados/enunciado38';
import Enunciado39Nivel2 from './components/Nivel2/Enunciados/enunciado39';
import Enunciado40Nivel2 from './components/Nivel2/Enunciados/enunciado40';

import Enunciado41Nivel2 from './components/Nivel2/Enunciados/enunciado41';
import Enunciado42Nivel2 from './components/Nivel2/Enunciados/enunciado42';
import Enunciado43Nivel2 from './components/Nivel2/Enunciados/enunciado43';
import Enunciado44Nivel2 from './components/Nivel2/Enunciados/enunciado44';
import Enunciado45Nivel2 from './components/Nivel2/Enunciados/enunciado45';
import Enunciado46Nivel2 from './components/Nivel2/Enunciados/enunciado46';
import Enunciado47Nivel2 from './components/Nivel2/Enunciados/enunciado47';
import Enunciado48Nivel2 from './components/Nivel2/Enunciados/enunciado48';
import Enunciado49Nivel2 from './components/Nivel2/Enunciados/enunciado49';
import Enunciado50Nivel2 from './components/Nivel2/Enunciados/enunciado50';




import Enunciado1Nivel3 from './components/Nivel3/Enunciados/enunciado1';
import Enunciado2Nivel3 from './components/Nivel3/Enunciados/enunciado2';
import Enunciado3Nivel3 from './components/Nivel3/Enunciados/enunciado3';
import Enunciado4Nivel3 from './components/Nivel3/Enunciados/enunciado4';
import Enunciado5Nivel3 from './components/Nivel3/Enunciados/enunciado5';
import Enunciado6Nivel3 from './components/Nivel3/Enunciados/enunciado6';
import Enunciado7Nivel3 from './components/Nivel3/Enunciados/enunciado7';
import Enunciado8Nivel3 from './components/Nivel3/Enunciados/enunciado8';
import Enunciado9Nivel3 from './components/Nivel3/Enunciados/enunciado9';
import Enunciado10Nivel3 from './components/Nivel3/Enunciados/enunciado10';
import Enunciado11Nivel3 from './components/Nivel3/Enunciados/enunciado11';
import Enunciado12Nivel3 from './components/Nivel3/Enunciados/enunciado12';
import Enunciado13Nivel3 from './components/Nivel3/Enunciados/enunciado13';
import Enunciado14Nivel3 from './components/Nivel3/Enunciados/enunciado14';
import Enunciado15Nivel3 from './components/Nivel3/Enunciados/enunciado15';

import Enunciado16Nivel3 from './components/Nivel3/Enunciados/enunciado16';
import Enunciado17Nivel3 from './components/Nivel3/Enunciados/enunciado17';
import Enunciado18Nivel3 from './components/Nivel3/Enunciados/enunciado18';
import Enunciado19Nivel3 from './components/Nivel3/Enunciados/enunciado19';
import Enunciado20Nivel3 from './components/Nivel3/Enunciados/enunciado20';
import Enunciado21Nivel3 from './components/Nivel3/Enunciados/enunciado21';
import Enunciado22Nivel3 from './components/Nivel3/Enunciados/enunciado22';
import Enunciado23Nivel3 from './components/Nivel3/Enunciados/enunciado23';
import Enunciado24Nivel3 from './components/Nivel3/Enunciados/enunciado24';
import Enunciado25Nivel3 from './components/Nivel3/Enunciados/enunciado25';
import Enunciado26Nivel3 from './components/Nivel3/Enunciados/enunciado26';
import Enunciado27Nivel3 from './components/Nivel3/Enunciados/enunciado27';
import Enunciado28Nivel3 from './components/Nivel3/Enunciados/enunciado28';
import Enunciado29Nivel3 from './components/Nivel3/Enunciados/enunciado29';
import Enunciado30Nivel3 from './components/Nivel3/Enunciados/enunciado30';


import Enunciado31Nivel3 from './components/Nivel3/Enunciados/enunciado31';
import Enunciado32Nivel3 from './components/Nivel3/Enunciados/enunciado32';
import Enunciado33Nivel3 from './components/Nivel3/Enunciados/enunciado33';
import Enunciado34Nivel3 from './components/Nivel3/Enunciados/enunciado34';
import Enunciado35Nivel3 from './components/Nivel3/Enunciados/enunciado35';
import Enunciado36Nivel3 from './components/Nivel3/Enunciados/enunciado36';
import Enunciado37Nivel3 from './components/Nivel3/Enunciados/enunciado37';
import Enunciado38Nivel3 from './components/Nivel3/Enunciados/enunciado38';
import Enunciado39Nivel3 from './components/Nivel3/Enunciados/enunciado39';
import Enunciado40Nivel3 from './components/Nivel3/Enunciados/enunciado40';

import Enunciado41Nivel3 from './components/Nivel3/Enunciados/enunciado41';
import Enunciado42Nivel3 from './components/Nivel3/Enunciados/enunciado42';
import Enunciado43Nivel3 from './components/Nivel3/Enunciados/enunciado43';
import Enunciado44Nivel3 from './components/Nivel3/Enunciados/enunciado44';
import Enunciado45Nivel3 from './components/Nivel3/Enunciados/enunciado45';
import Enunciado46Nivel3 from './components/Nivel3/Enunciados/enunciado46';
import Enunciado47Nivel3 from './components/Nivel3/Enunciados/enunciado47';
import Enunciado48Nivel3 from './components/Nivel3/Enunciados/enunciado48';
import Enunciado49Nivel3 from './components/Nivel3/Enunciados/enunciado49';
import Enunciado50Nivel3 from './components/Nivel3/Enunciados/enunciado50';

import Sidebar from './components/Sidebar';
import Treinta from './components/Nivel1/Intermedios/30';
import Perfil from './components/Perfil';
import EditarUsuario from './components/EditarUsuario';
import ListarUsuario from './components/ListarUsuario';
import RegistroUsuario from './components/RegistroUsuario';
import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {

  return (
    
    <Router>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/iniciogoogle" element={<Iniciogoogle />} />
        <Route path="/loginsesion" element={<Loginsesion />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/lecciones" element={<Lecciones />} />
        <Route path="/nivel1" element={<Nivel1 />} />
        <Route path="/enunciado1" element={<Enunciado1 />} />
        <Route path="/basicos/1" element={<Uno />} />
        <Route path="/basicos/2" element={<Dos />} />
        <Route path="/basicos/3" element={<Tres />} />
        <Route path="/basicos/4" element={<Cuatro />} />
        <Route path="/basicos/5" element={<Cinco />} />
        <Route path="/basicos/6" element={<Seis />} />
        <Route path="/basicos/7" element={<Siete />} />
        <Route path="/basicos/8" element={<Ocho />} />
        <Route path="/basicos/9" element={<Nueve />} />
        <Route path="/basicos/10" element={<Diez />} />
        <Route path="/basicos/11" element={<Once />} />
        <Route path="/intermedios/12" element={<Doce />} />
        <Route path="/intermedios/13" element={<Trece />} />
        <Route path="/intermedios/14" element={<Catorce />} />
        <Route path="/intermedios/15" element={<Quince />} />
        <Route path="/intermedios/16" element={<Dieciséis />} />
        <Route path="/intermedios/17" element={<Diecisiete />} />
        <Route path="/intermedios/18" element={<Dieciocho />} />
        <Route path="/basicos/19" element={<Diecinueve />} />
        <Route path="/basicos/20" element={<Veinte />} />
        <Route path="/seleccion/21" element={<Veintiuno />} />
        <Route path="/seleccion/22" element={<Veintidos />} />
        <Route path="/seleccion/23" element={<Veintitres/>} />
        <Route path="/seleccion/24" element={<Veinticuatro/>} />
        <Route path="/seleccion/25" element={<Veinticinco/>} />
        <Route path="/seleccion/26" element={<Veintiseis/>} />
        <Route path="/seleccion/27" element={<Veintisiete/>} />
        <Route path="/seleccion/28" element={<Veintiocho/>} />
        <Route path="/intermedios/29" element={<Veintinueve/>} />
        <Route path="/intermedios/30" element={<Treinta/>} />
        <Route path="/intermedios/31" element={<Trientauno/>} />
        <Route path="/intermedios/32" element={<Trientados/>} />
        <Route path="/intermedios/33" element={<Trientatres/>} />
        <Route path="/intermedios/34" element={<Trientacuatro/>} />
        <Route path="/intermedios/35" element={<Trientacinco/>} />
        <Route path="/intermedios/36" element={<Trientaseis/>} />
        <Route path="/intermedios/37" element={<Trientasiete/>} />
        <Route path="/intermedios/38" element={<Trientaocho/>} />
        <Route path="/intermedios/39" element={<Trientanueve/>} />
        <Route path="/memoria/40" element={<Cuarenta/>} />
        <Route path="/memoria/41" element={<Cuarentauno/>} />
        <Route path="/memoria/42" element={<Cuarentados/>} />
        <Route path="/memoria/43" element={<Cuarentatres/>} />
        <Route path="/memoria/44" element={<Cuarentacuatro/>} />
        <Route path="/memoria/45" element={<Cuarentacinco/>} />
        <Route path="/memoria/46" element={<Cuarentaseis/>} />
        <Route path="/memoria/47" element={<Cuarentasiete/>} />
        <Route path="/memoria/48" element={<Cuarentaocho/>} />
        <Route path="/memoria/49" element={<Cuarentanueve/>} />
        <Route path="/memoria/50" element={<Cuarentacincuenta/>} />
    (/*Nivel2*/)
        <Route path="/Nivel2/basicos/1" element={<UnoNivel2 />} />
        <Route path="/Nivel2/basicos/2" element={<DosNivel2 />} />
        <Route path="/Nivel2/basicos/3" element={<TresNivel2 />} />
        <Route path="/Nivel2/basicos/4" element={<CuatroNivel2 />} />
        <Route path="/Nivel2/basicos/5" element={<CincoNivel2 />} />
        <Route path="/Nivel2/basicos/6" element={<SeisNivel2 />} />
        <Route path="/Nivel2/basicos/7" element={<SieteNivel2 />} />
        <Route path="/Nivel2/basicos/8" element={<OchoNivel2 />} />
        <Route path="/Nivel2/basicos/9" element={<NueveNivel2 />} />
        <Route path="/Nivel2/basicos/10" element={<DiezNivel2 />} />
        <Route path="/Nivel2/basicos/11" element={<OnceNivel2 />} />
        <Route path="/Nivel2/basicos/12" element={<DoceNivel2 />} />
        <Route path="/Nivel2/basicos/13" element={<TreceNivel2 />} />
        <Route path="/Nivel2/basicos/14" element={<CatorceNivel2 />} />
        <Route path="/Nivel2/basicos/15" element={<QuinceNivel2 />} />

        <Route path="/Nivel2/intermedios/16" element={<DieciséisNivel2 />} />
        <Route path="/Nivel2/intermedios/17" element={<DiecisieteNivel2 />} />
        <Route path="/Nivel2/intermedios/18" element={<DieciochoNivel2 />} />
        <Route path="/Nivel2/intermedios/19" element={<DiecinueveNivel2 />} />
        <Route path="/Nivel2/intermedios/20" element={<VeinteNivel2 />} />
        <Route path="/Nivel2/intermedios/21" element={<VeintiunoNivel2 />} />
        <Route path="/Nivel2/intermedios/22" element={<VeintidosNivel2 />} />
        <Route path="/Nivel2/intermedios/23" element={<VeintitresNivel2/>} />
        <Route path="/Nivel2/intermedios/24" element={<VeinticuatroNivel2/>} />
        <Route path="/Nivel2/intermedios/25" element={<VeinticincoNivel2/>} />
        <Route path="/Nivel2/intermedios/26" element={<VeintiseisNivel2/>} />
        <Route path="/Nivel2/intermedios/27" element={<VeintisieteNivel2/>} />
        <Route path="/Nivel2/intermedios/28" element={<VeintiochoNivel2/>} />
        <Route path="/Nivel2/intermedios/29" element={<VeintinueveNivel2/>} />
        <Route path="/Nivel2/intermedios/30" element={<TreintaNivel2/>} />

        <Route path="/Nivel2/seleccion/31" element={<TreintaunoNivel2/>} />
        <Route path="/Nivel2/seleccion/32" element={<TreintadosNivel2/>} />
        <Route path="/Nivel2/seleccion/33" element={<TreintatresNivel2/>} />
        <Route path="/Nivel2/seleccion/34" element={<TreintacuatroNivel2/>} />
        <Route path="/Nivel2/seleccion/35" element={<TreintacincoNivel2/>} />
        <Route path="/Nivel2/seleccion/36" element={<TreintaseisNivel2/>} />
        <Route path="/Nivel2/seleccion/37" element={<TreintasieteNivel2/>} />
        <Route path="/Nivel2/seleccion/38" element={<TreintaochoNivel2/>} />
        <Route path="/Nivel2/seleccion/39" element={<TreintanueveNivel2/>} />
        <Route path="/Nivel2/seleccion/40" element={<CuarentaNivel2/>} />
        <Route path="/Nivel2/memoria/41" element={<CuarentaUnoNivel2 />} />
        <Route path="/Nivel2/memoria/42" element={<CuarentaDosNivel2 />} />
        <Route path="/Nivel2/memoria/43" element={<CuarentaTresNivel2 />} />
        <Route path="/Nivel2/memoria/44" element={<CuarentaCuatroNivel2 />} />
        <Route path="/Nivel2/memoria/45" element={<CuarentaCincoNivel2 />} />
        <Route path="/Nivel2/memoria/46" element={<CuarentaSeisNivel2 />} />
        <Route path="/Nivel2/memoria/47" element={<CuarentaSieteNivel2 />} />
        <Route path="/Nivel2/memoria/48" element={<CuarentaOchoNivel2 />} />
        <Route path="/Nivel2/memoria/49" element={<CuarentaNueveNivel2 />} />
        <Route path="/Nivel2/memoria/50" element={<CincuentaNivel2 />} />

        <Route path="/prueba" element={<Unotest />} />

        (/*Nivel3*/)
        <Route path="/Nivel3/basicos/1" element={<UnoNivel3 />} />
        <Route path="/Nivel3/basicos/2" element={<DosNivel3 />} />
        <Route path="/Nivel3/basicos/3" element={<TresNivel3 />} />
        <Route path="/Nivel3/basicos/4" element={<CuatroNivel3 />} />
        <Route path="/Nivel3/basicos/5" element={<CincoNivel3 />} />
        <Route path="/Nivel3/basicos/6" element={<SeisNivel3 />} />
        <Route path="/Nivel3/basicos/7" element={<SieteNivel3 />} />
        <Route path="/Nivel3/basicos/8" element={<OchoNivel3 />} />
        <Route path="/Nivel3/basicos/9" element={<NueveNivel3/>} />
        <Route path="/Nivel3/basicos/10" element={<DiezNivel3 />} />
        <Route path="/Nivel3/basicos/11" element={<OnceNivel3 />} />
        <Route path="/Nivel3/basicos/12" element={<DoceNivel3 />} />
        <Route path="/Nivel3/basicos/13" element={<TreceNivel3 />} />
        <Route path="/Nivel3/basicos/14" element={<CatorceNivel3 />} />
        <Route path="/Nivel3/basicos/15" element={<QuinceNivel3 />} />


        <Route path="/Nivel3/intermedios/16" element={<DieciséisNivel3/>} />
        <Route path="/Nivel3/intermedios/17" element={<DiecisieteNivel3 />} />
        <Route path="/Nivel3/intermedios/18" element={<DieciochoNivel3 />} />
        <Route path="/Nivel3/intermedios/19" element={<DiecinueveNivel3 />} />
        <Route path="/Nivel3/intermedios/20" element={<VeinteNivel3 />} />
        <Route path="/Nivel3/intermedios/21" element={<VeintiunoNivel3 />} />
        <Route path="/Nivel3/intermedios/22" element={<VeintidosNivel3 />} />
        <Route path="/Nivel3/intermedios/23" element={<VeintitresNivel3/>} />
        <Route path="/Nivel3/intermedios/24" element={<VeinticuatroNivel3/>} />
        <Route path="/Nivel3/intermedios/25" element={<VeinticincoNivel3/>} />
        <Route path="/Nivel3/intermedios/26" element={<VeintiseisNivel3/>} />
        <Route path="/Nivel3/intermedios/27" element={<VeintisieteNivel3/>} />
        <Route path="/Nivel3/intermedios/28" element={<VeintiochoNivel3/>} />
        <Route path="/Nivel3/intermedios/29" element={<VeintinueveNivel3/>} />
        <Route path="/Nivel3/intermedios/30" element={<TreintaNivel3/>} />


        <Route path="/Nivel3/seleccion/31" element={<TreintaunoNivel3/>} />
        <Route path="/Nivel3/seleccion/32" element={<TreintadosNivel3/>} />
        <Route path="/Nivel3/seleccion/33" element={<TreintatresNivel3/>} />
        <Route path="/Nivel3/seleccion/34" element={<TreintacuatroNivel3/>} />
        <Route path="/Nivel3/seleccion/35" element={<TreintacincoNivel3/>} />
        <Route path="/Nivel3/seleccion/36" element={<TreintaseisNivel3/>} />
        <Route path="/Nivel3/seleccion/37" element={<TreintasieteNivel3/>} />
        <Route path="/Nivel3/seleccion/38" element={<TreintaochoNivel3/>} />
        <Route path="/Nivel3/seleccion/39" element={<TreintanueveNivel3/>} />
        <Route path="/Nivel3/seleccion/40" element={<CuarentaNivel3/>} />


        <Route path="/Nivel3/memoria/41" element={<CuarentaUnoNivel3 />} />
        <Route path="/Nivel3/memoria/42" element={<CuarentaDosNivel3 />} />
        <Route path="/Nivel3/memoria/43" element={<CuarentaTresNivel3 />} />
        <Route path="/Nivel3/memoria/44" element={<CuarentaCuatroNivel3 />} />
        <Route path="/Nivel3/memoria/45" element={<CuarentaCincoNivel3 />} />
        <Route path="/Nivel3/memoria/46" element={<CuarentaSeisNivel3 />} />
        <Route path="/Nivel3/memoria/47" element={<CuarentaSieteNivel3 />} />
        <Route path="/Nivel3/memoria/48" element={<CuarentaOchoNivel3 />} />
        <Route path="/Nivel3/memoria/49" element={<CuarentaNueveNivel3 />} />
        <Route path="/Nivel3/memoria/50" element={<CincuentaNivel3 />} />

    (/*Nivel2-enunciados*/)
        <Route path="/Nivel2/enunciado1" element={<Enunciado1Nivel2 />} />
        <Route path="/Nivel2/enunciado2" element={<Enunciado2Nivel2 />} />
        <Route path="/Nivel2/enunciado3" element={<Enunciado3Nivel2 />} />
        <Route path="/Nivel2/enunciado4" element={<Enunciado4Nivel2 />} />
        <Route path="/Nivel2/enunciado5" element={<Enunciado5Nivel2 />} />
        <Route path="/Nivel2/enunciado6" element={<Enunciado6Nivel2 />} />
        <Route path="/Nivel2/enunciado7" element={<Enunciado7Nivel2 />} />
        <Route path="/Nivel2/enunciado8" element={<Enunciado8Nivel2 />} />
        <Route path="/Nivel2/enunciado9" element={<Enunciado9Nivel2 />} />
        <Route path="/Nivel2/enunciado10" element={<Enunciado10Nivel2 />} />
        <Route path="/Nivel2/enunciado11" element={<Enunciado11Nivel2 />} />
        <Route path="/Nivel2/enunciado12" element={<Enunciado12Nivel2 />} />
        <Route path="/Nivel2/enunciado13" element={<Enunciado13Nivel2 />} />
        <Route path="/Nivel2/enunciado14" element={<Enunciado14Nivel2 />} />
        <Route path="/Nivel2/enunciado15" element={<Enunciado15Nivel2 />} />
        <Route path="/Nivel2/enunciado16" element={<Enunciado16Nivel2 />} />
        <Route path="/Nivel2/enunciado17" element={<Enunciado17Nivel2 />} />
        <Route path="/Nivel2/enunciado18" element={<Enunciado18Nivel2 />} />
        <Route path="/Nivel2/enunciado19" element={<Enunciado19Nivel2 />} />
        <Route path="/Nivel2/enunciado20" element={<Enunciado20Nivel2 />} />
        <Route path="/Nivel2/enunciado21" element={<Enunciado21Nivel2 />} />
        <Route path="/Nivel2/enunciado22" element={<Enunciado22Nivel2 />} />
        <Route path="/Nivel2/enunciado23" element={<Enunciado23Nivel2 />} />
        <Route path="/Nivel2/enunciado24" element={<Enunciado24Nivel2 />} />
        <Route path="/Nivel2/enunciado25" element={<Enunciado25Nivel2 />} />
        <Route path="/Nivel2/enunciado26" element={<Enunciado26Nivel2 />} />
        <Route path="/Nivel2/enunciado27" element={<Enunciado27Nivel2 />} />
        <Route path="/Nivel2/enunciado28" element={<Enunciado28Nivel2 />} />
        <Route path="/Nivel2/enunciado29" element={<Enunciado29Nivel2 />} />
        <Route path="/Nivel2/enunciado30" element={<Enunciado30Nivel2 />} />
        <Route path="/Nivel2/enunciado31" element={<Enunciado31Nivel2 />} />
        <Route path="/Nivel2/enunciado32" element={<Enunciado32Nivel2 />} />
        <Route path="/Nivel2/enunciado33" element={<Enunciado33Nivel2 />} />
        <Route path="/Nivel2/enunciado34" element={<Enunciado34Nivel2 />} />
        <Route path="/Nivel2/enunciado35" element={<Enunciado35Nivel2 />} />
        <Route path="/Nivel2/enunciado36" element={<Enunciado36Nivel2 />} />
        <Route path="/Nivel2/enunciado37" element={<Enunciado37Nivel2 />} />
        <Route path="/Nivel2/enunciado38" element={<Enunciado38Nivel2 />} />
        <Route path="/Nivel2/enunciado39" element={<Enunciado39Nivel2 />} />
        <Route path="/Nivel2/enunciado40" element={<Enunciado40Nivel2 />} />
        <Route path="/Nivel2/enunciado41" element={<Enunciado41Nivel2 />} />
        <Route path="/Nivel2/enunciado42" element={<Enunciado42Nivel2 />} />
        <Route path="/Nivel2/enunciado43" element={<Enunciado43Nivel2 />} />
        <Route path="/Nivel2/enunciado44" element={<Enunciado44Nivel2 />} />
        <Route path="/Nivel2/enunciado45" element={<Enunciado45Nivel2 />} />
        <Route path="/Nivel2/enunciado46" element={<Enunciado46Nivel2 />} />
        <Route path="/Nivel2/enunciado47" element={<Enunciado47Nivel2 />} />
        <Route path="/Nivel2/enunciado48" element={<Enunciado48Nivel2 />} />
        <Route path="/Nivel2/enunciado49" element={<Enunciado49Nivel2 />} />
        <Route path="/Nivel2/enunciado50" element={<Enunciado50Nivel2 />} />



        
    (/*Nivel3-enunciados*/)
        <Route path="/Nivel3/enunciado1" element={<Enunciado1Nivel3 />} />
        <Route path="/Nivel3/enunciado2" element={<Enunciado2Nivel3 />} />
        <Route path="/Nivel3/enunciado3" element={<Enunciado3Nivel3 />} />
        <Route path="/Nivel3/enunciado4" element={<Enunciado4Nivel3 />} />
        <Route path="/Nivel3/enunciado5" element={<Enunciado5Nivel3 />} />
        <Route path="/Nivel3/enunciado6" element={<Enunciado6Nivel3 />} />
        <Route path="/Nivel3/enunciado7" element={<Enunciado7Nivel3 />} />
        <Route path="/Nivel3/enunciado8" element={<Enunciado8Nivel3 />} />
        <Route path="/Nivel3/enunciado9" element={<Enunciado9Nivel3 />} />
        <Route path="/Nivel3/enunciado10" element={<Enunciado10Nivel3 />} />
        <Route path="/Nivel3/enunciado11" element={<Enunciado11Nivel3 />} />
        <Route path="/Nivel3/enunciado12" element={<Enunciado12Nivel3 />} />
        <Route path="/Nivel3/enunciado13" element={<Enunciado13Nivel3 />} />
        <Route path="/Nivel3/enunciado14" element={<Enunciado14Nivel3 />} />
        <Route path="/Nivel3/enunciado15" element={<Enunciado15Nivel3 />} />
        <Route path="/Nivel3/enunciado16" element={<Enunciado16Nivel3 />} />
        <Route path="/Nivel3/enunciado17" element={<Enunciado17Nivel3 />} />
        <Route path="/Nivel3/enunciado18" element={<Enunciado18Nivel3 />} />
        <Route path="/Nivel3/enunciado19" element={<Enunciado19Nivel3 />} />
        <Route path="/Nivel3/enunciado20" element={<Enunciado20Nivel3 />} />
        <Route path="/Nivel3/enunciado21" element={<Enunciado21Nivel3 />} />
        <Route path="/Nivel3/enunciado22" element={<Enunciado22Nivel3 />} />
        <Route path="/Nivel3/enunciado23" element={<Enunciado23Nivel3 />} />
        <Route path="/Nivel3/enunciado24" element={<Enunciado24Nivel3 />} />
        <Route path="/Nivel3/enunciado25" element={<Enunciado25Nivel3 />} />
        <Route path="/Nivel3/enunciado26" element={<Enunciado26Nivel3 />} />
        <Route path="/Nivel3/enunciado27" element={<Enunciado27Nivel3 />} />
        <Route path="/Nivel3/enunciado28" element={<Enunciado28Nivel3 />} />
        <Route path="/Nivel3/enunciado29" element={<Enunciado29Nivel3 />} />
        <Route path="/Nivel3/enunciado30" element={<Enunciado30Nivel3 />} />
        <Route path="/Nivel3/enunciado31" element={<Enunciado31Nivel3 />} />
        <Route path="/Nivel3/enunciado32" element={<Enunciado32Nivel3 />} />
        <Route path="/Nivel3/enunciado33" element={<Enunciado33Nivel3 />} />
        <Route path="/Nivel3/enunciado34" element={<Enunciado34Nivel3 />} />
        <Route path="/Nivel3/enunciado35" element={<Enunciado35Nivel3 />} />
        <Route path="/Nivel3/enunciado36" element={<Enunciado36Nivel3 />} />
        <Route path="/Nivel3/enunciado37" element={<Enunciado37Nivel3 />} />
        <Route path="/Nivel3/enunciado38" element={<Enunciado38Nivel3 />} />
        <Route path="/Nivel3/enunciado39" element={<Enunciado39Nivel3 />} />
        <Route path="/Nivel3/enunciado40" element={<Enunciado40Nivel3 />} />
        <Route path="/Nivel3/enunciado41" element={<Enunciado41Nivel3 />} />
        <Route path="/Nivel3/enunciado42" element={<Enunciado42Nivel3 />} />
        <Route path="/Nivel3/enunciado43" element={<Enunciado43Nivel3 />} />
        <Route path="/Nivel3/enunciado44" element={<Enunciado44Nivel3 />} />
        <Route path="/Nivel3/enunciado45" element={<Enunciado45Nivel3 />} />
        <Route path="/Nivel3/enunciado46" element={<Enunciado46Nivel3 />} />
        <Route path="/Nivel3/enunciado47" element={<Enunciado47Nivel3 />} />
        <Route path="/Nivel3/enunciado48" element={<Enunciado48Nivel3 />} />
        <Route path="/Nivel3/enunciado49" element={<Enunciado49Nivel3 />} />
        <Route path="/Nivel3/enunciado50" element={<Enunciado50Nivel3 />} />

        <Route path="/examen" element={<Examen />} />
        <Route path="/examen2" element={<Examen2 />} />
        <Route path="/examen3" element={<Examen3 />} />
        <Route path="/examennivel1" element={<Examennivel1 />} />
        <Route path="/examennivel2" element={<Examennivel2 />} />
        <Route path="/examennivel3" element={<Examennivel3 />} />
        <Route path="/condicionales" element={<Condicionales />} />
        <Route path="/enunciado3" element={<Enunciado3 />} />
        <Route path="/enunciado4" element={<Enunciado4 />} />
        <Route path="/enunciado5" element={<Enunciado5 />} />
        <Route path="/enunciado6" element={<Enunciado6 />} />
        <Route path="/enunciado7" element={<Enunciado7 />} />
        <Route path="/enunciado8" element={<Enunciado8 />} />
        <Route path="/enunciado9" element={<Enunciado9 />} />
        <Route path="/enunciado10" element={<Enunciado10 />} />
        <Route path="/enunciado11" element={<Enunciado11 />} />
        <Route path="/enunciado12" element={<Enunciado12 />} />
        <Route path="/enunciado13" element={<Enunciado13 />} />
        <Route path="/enunciado14" element={<Enunciado14 />} />
        <Route path="/enunciado15" element={<Enunciado15 />} />
        <Route path="/enunciado16" element={<Enunciado16 />} />
        <Route path="/enunciado17" element={<Enunciado17 />} />
        <Route path="/enunciado18" element={<Enunciado18 />} />
        <Route path="/enunciado19" element={<Enunciado19 />} />
        <Route path="/enunciado20" element={<Enunciado20 />} />
        <Route path="/enunciado21" element={<Enunciado21 />} />
        <Route path="/enunciado22" element={<Enunciado22 />} />
        <Route path="/enunciado23" element={<Enunciado23 />} />
        <Route path="/enunciado24" element={<Enunciado24 />} />
        <Route path="/enunciado25" element={<Enunciado25 />} />
        <Route path="/enunciado26" element={<Enunciado26 />} />
        <Route path="/enunciado27" element={<Enunciado27 />} />
        <Route path="/enunciado28" element={<Enunciado28 />} />
        <Route path="/enunciado29" element={<Enunciado29 />} />
        <Route path="/enunciado30" element={<Enunciado30 />} />
        <Route path="/enunciado31" element={<Enunciado31 />} />
        <Route path="/enunciado32" element={<Enunciado32 />} />
        <Route path="/enunciado33" element={<Enunciado33 />} />
        <Route path="/enunciado34" element={<Enunciado34/>} />
        <Route path="/enunciado35" element={<Enunciado35/>} />
        <Route path="/enunciado36" element={<Enunciado36/>} />
        <Route path="/enunciado37" element={<Enunciado37/>} />
        <Route path="/enunciado38" element={<Enunciado38/>} />
        <Route path="/enunciado39" element={<Enunciado39/>} />
        <Route path="/enunciado40" element={<Enunciado40/>} />
        <Route path="/enunciado41" element={<Enunciado41/>} />
        <Route path="/enunciado42" element={<Enunciado42/>} />
        <Route path="/enunciado43" element={<Enunciado43/>} />
        <Route path="/enunciado44" element={<Enunciado44/>} />
        <Route path="/enunciado45" element={<Enunciado45/>} />
        <Route path="/enunciado46" element={<Enunciado46/>} />
        <Route path="/enunciado47" element={<Enunciado47/>} />
        <Route path="/enunciado48" element={<Enunciado48/>} />
        <Route path="/enunciado49" element={<Enunciado49/>} />
        <Route path="/enunciado50" element={<Enunciado50/>} />
        <Route path="/foro" element={<Foro />} />
        <Route path="/ranking" exact element={<Ranking />} />
        <Route path="/insignias" element={<Insignias />} /> 
        <Route path="/header" element={<Header />} />
        <Route path="/sidebar" element={<Sidebar />} /> 
        <Route path="/challenges" element={<Challenges />} /> 
        <Route path="/avances" element={<Avances />} /> 
        <Route path="/nivel2" element={<Nivel2 />} /> 
        <Route path="/nivel3" element={<Nivel3 />} /> 
        <Route path="/editar-usuario/:user_id" element={<EditarUsuario />} />
        <Route path="/listar-usuarios" element={<ListarUsuario />} />
        <Route path="/crear-usuario" element={<RegistroUsuario />} />

      </Routes>
    </Router>
  );
};

export default App;
