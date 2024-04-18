import { useTranslation } from 'react-i18next';
import './Settings.css';

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
      <div className="settings-container">
        <h1>{t('settings.title')}</h1>
        <div className="item-container">
          <div className="item">
          <label>
            {t('settings.language')}:
          </label>
          <select className='custom-select' value={i18n.language} onChange={handleChange}>
            <option value="en">English</option>
            <option value="fi">Suomi</option>
          </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
