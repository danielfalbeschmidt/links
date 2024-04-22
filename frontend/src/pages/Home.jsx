import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Home.css';

const Home = () => {
  const { t } = useTranslation();
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');

  function isValidUrl(url) {
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlPattern.test(url);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidUrl(url)) {
      setMessage(t('home.invalidUrl'));
      showSnackbar();
      return;
    }
    try {
      const response = await fetch('http://127.0.0.1:5000/api/links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      setShortUrl(data.workingLink);
      console.log('Response from server:', data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setMessage(t('home.copiedToClipboard'));
    showSnackbar();
  };

  const showSnackbar = () => {
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };

  return (
    <>
      <div className="form-container">
      <h1>{t('home.title')}</h1>
        <form onSubmit={handleSubmit}>
          <div className='long-url-container'>
            <label style={{ padding: '5px' }}>
              {t('home.longUrl')}:
            </label>
            <input
              type="text"
              value={url}
              onChange={handleChange}
              className='input-field'
            />
          </div>
          <br />
          {shortUrl && (
            <div className='short-url-container'>
              <label>
                {t('home.shortUrl')}:
              </label>
              <div className='input-field'>
                <a href={shortUrl} target='_blank'>{shortUrl}</a>
                <img src="./src/assets/clipboard.png" alt="Copy to Clipboard" onClick={copyToClipboard} className='clipboard-img' />
              </div>
            </div>
          )}
          <button type="submit" className='submit-button'>{t('home.submit')}</button>
        </form>
        <div className={`snackbar ${isVisible ? 'show' : ''}`}>{message}</div>
      </div>
    </>
  );
};

export default Home;
