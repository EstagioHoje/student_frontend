import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

import AlunoReadUpdateDelete from "./pages/AlunoCrud/AlunoReadUpdateDelete";
import AlunoCreate from "./pages/AlunoCrud/AlunoCreate";

import VagaRead from "./pages/VagasCrud/VagaRead";
import VagaReadComplete from "./pages/VagasCrud/VagaReadComplete";

import RelatorioRead from "./pages/RelatorioCrud/RelatorioRead";
import RelatorioCreate from "./pages/RelatorioCrud/RelatorioCreate";

import AssinaturaRead from "./pages/AssinaturaCrud/AssinaturaRead";
import AssinaturaCreate from "./pages/AssinaturaCrud/AssinaturaCreate";
import AssinaturaReadComplete from "./pages/AssinaturaCrud/AssinaturaReadComplete";

import AlunoLogin from "./pages/AlunoLogin/AlunoLogin";

import './App.css';

const App = () => {
  const [isAuthorized, setAuthorized] = useState(JSON.parse(localStorage.getItem("isAuthorized")));

  useEffect(() => {
    function handleStorage() {
      console.log(localStorage.getItem("isAuthorized"));
      setAuthorized(JSON.parse(localStorage.getItem("isAuthorized")))
      console.log(typeof isAuthorized);
    }

    window.addEventListener('storage', handleStorage);

    return _ => {
      window.removeEventListener('storage', handleStorage);
    }
  })

  return (
    <BrowserRouter>
      <Routes>


        <Route path="/assinatura/read" element={
          <ProtectedRoute isAuthorized={isAuthorized}
            children={<AssinaturaReadComplete
              setAuthorized={setAuthorized} className="teste" />} />
        } />
        <Route path="/assinatura" element={
          <ProtectedRoute isAuthorized={isAuthorized}
            children={<AssinaturaRead
              setAuthorized={setAuthorized} className="teste" />} />
        } />


        <Route path="/relatorio/read" element={
          <ProtectedRoute isAuthorized={isAuthorized}
            children={<RelatorioCreate
              setAuthorized={setAuthorized} className="teste" />} />
        } />
        <Route path="/relatorio/create" element={
          <ProtectedRoute isAuthorized={isAuthorized}
            children={<RelatorioCreate
              setAuthorized={setAuthorized} className="teste" />} />
        } />
        <Route path="/relatorio" element={
          <ProtectedRoute isAuthorized={isAuthorized}
            children={<RelatorioRead
              setAuthorized={setAuthorized} className="teste" />} />
        } />


        <Route path="/vagas/read" element={
          <ProtectedRoute isAuthorized={isAuthorized} children={<VagaReadComplete
            setAuthorized={setAuthorized} className="teste" />} />
        } />
        <Route path="/vagas" element={
          <ProtectedRoute isAuthorized={isAuthorized} children={<VagaRead
            setAuthorized={setAuthorized} className="teste" />} />
        } />


        <Route path="/conta" element={
          <ProtectedRoute isAuthorized={isAuthorized}
            children={<AlunoReadUpdateDelete
              setAuthorized={setAuthorized} className="teste" />} />
        } />


        <Route path="/cadastro" element={<AlunoCreate setAuthorized={setAuthorized} className="teste" />} />

        <Route path="/login" element={<AlunoLogin isAuthorized={isAuthorized} setAuthorized={setAuthorized} className="teste" />} />
        <Route path="/" element={<AlunoLogin isAuthorized={isAuthorized} setAuthorized={setAuthorized} className="teste" />} />

      </Routes>
    </BrowserRouter>
  );
};

render(<App />, document.getElementById("main"));