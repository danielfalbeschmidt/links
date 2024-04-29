import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import './Links.css';

const Links = () => {
    const { t, i18n } = useTranslation();
    const [data, setData] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [message, setMessage] = useState('');

    const fetchLinks = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/links');

            const data = await response.json();
            setData(data);
            console.log('Response from server:', data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }

    const copyToClipboard = (shortUrl) => {
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

    useEffect(() => {
        fetchLinks();
    }, []);

    return (
        <div className='link-container'>
          <h1>{t('links.title')}</h1>
          {/* Check if data array is not empty */}
          {data.length > 0 ? (
            // If data array is not empty, render the list of items
            data.map((item) => (
              <div className='item-container' key={item.id}>
                <div className='item'>
                  <label>{t('links.longUrl')}:</label>
                  <div className='field'>
                    <a href={item.originalUrl} target='_blank'>{item.originalUrl}</a>
                    <img src="./src/assets/clipboard.png" alt="Copy to Clipboard" onClick={() => copyToClipboard(item.originalUrl)} className='clipboard-img' />
                  </div>
                </div>
                <div className='item'>
                  <label>{t('links.shortUrl')}:</label>
                  <div className='field'>
                    <a href={item.workingLink} target='_blank'>{item.workingLink}</a>
                    <img src="./src/assets/clipboard.png" alt="Copy to Clipboard" onClick={() => copyToClipboard(item.workingLink)} className='clipboard-img' />
                  </div>
                </div>
              </div>
            ))
          ) : (
            // If data array is empty, render "No links available" text
            <p>No links available</p>
          )}
        </div>
      );
};

export default Links;
