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
            const response = await fetch('http://127.0.0.1:5000/api/links/1');

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
    <div>
        <div className='link-container'>
        <h1>{t('links.title')}</h1>
            {data.map((item) =>
                <div className='item-container' key={item.id}>
                    <div className='item'>
                        <label>
                            {t('links.name')}:
                        </label>
                        <div className='field'>
                            <p>{item.name}</p>
                        </div>
                    </div>
                    <div className='item'>
                        <label>
                            {t('links.longUrl')}:
                        </label>
                        <div className='field'>
                            <a href={item.originalUrl} target='_blank'>{item.originalUrl}</a>
                            <img src="./src/assets/clipboard.png" alt="Copy to Clipboard" onClick={() => copyToClipboard(item.originalUrl)} className='clipboard-img' />
                        </div>
                    </div>
                    <div className='item'>
                        <label>
                            {t('links.shortUrl')}:
                        </label>
                        <div className='field'>
                            <a href={item.workingLink} target='_blank'>{item.workingLink}</a>
                            <img src="./src/assets/clipboard.png" alt="Copy to Clipboard" onClick={() => copyToClipboard(item.workingLink)} className='clipboard-img' />
                        </div>
                    </div>
                </div>
            )}
        </div>
        <div className={`snackbar ${isVisible ? 'show' : ''}`}>{message}</div>
    </div>
    );
};

export default Links;
