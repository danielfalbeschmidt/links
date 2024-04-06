import './Home.css';
import { useState } from 'react';

const Home = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  function isValidUrl(url) {
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlPattern.test(url);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidUrl(url)) {
      alert('Invalid URL');
      return;
    }
    try {
      const response = await fetch('http://127.0.0.1:3001/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      setShortUrl(data.shortUrl);
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
    alert('Copied to clipboard!');
  };

    return (
      <>
      <div className="form-container">
          <h2>Home</h2>
          <form onSubmit={handleSubmit}>
            <label style={{ padding: '5px' }}>
              Long Url:
            </label>
              <input
              type="text"
              value={url}
              onChange={handleChange}
              className='input-field'
              />
            <br />
          <button type="submit" className='submit-button'>Submit</button>
          </form>
      </div>
      {shortUrl && (
        <div className='url-container'>
          <label>
            Short Url:
          </label>
          <div className='input-field'>
              <a href={shortUrl} target='_blank'>{shortUrl}</a>
              <img src="./src/assets/clipboard.png" alt="Copy to Clipboard" onClick={copyToClipboard} className='clipboard-img' />
          </div>
        </div>
      )}
      </>
    );
  };

  export default Home;
