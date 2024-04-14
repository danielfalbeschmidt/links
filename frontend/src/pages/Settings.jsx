import React from 'react';
import { useTranslation } from 'react-i18next';

const Settings = ({ onLanguageChange }) => {
  const { t, i18n } = useTranslation();

  const handleChange = (e) => {
    const newLanguage = e.target.value;
    i18n.changeLanguage(newLanguage);
    onLanguageChange(newLanguage);
    console.log(newLanguage);
  };

  return (
    <div>
      <h1>{t('settings.title')}</h1>
      <select value={i18n.language} onChange={handleChange}>
        <option value="en">English</option>
        <option value="fi">Suomi</option>
      </select>
    </div>
  );
};

export default Settings;
