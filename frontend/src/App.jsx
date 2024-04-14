import React, { useEffect } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from './i18n';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import ErrorPage from "./pages/ErrorPage";
import Cookies from 'js-cookie';

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const savedLanguage = Cookies.get('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  const handleLanguageChange = (newLanguage) => {
    i18n.changeLanguage(newLanguage);
    Cookies.set('language', newLanguage, { expires: 365 });
  };

  return (
    <>
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="settings" element={<Settings onLanguageChange={handleLanguageChange}/>} />
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </Routes>
        </I18nextProvider>
      </BrowserRouter>
    </>
  )
}

export default App;
