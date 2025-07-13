import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {Provider} from "react-redux";
import {store} from "@/store.ts";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Admin} from "../pages/admin.tsx";

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/1"/>}/>
        <Route path="/:id" element={<App/>}/>
        <Route path="admin" element={<Admin/>}/>
      </Routes>
    </BrowserRouter>
  </Provider>
)
