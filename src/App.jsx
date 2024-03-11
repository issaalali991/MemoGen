// MemeGenerator component
import { useState, useEffect } from 'react';
import axios from 'axios';

const MemeGenerator = () => {
  const [memeTemplates, setMemeTemplates] = useState([]);
  const [currentMemeIndex, setCurrentMemeIndex] = useState(0);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');

  const fetchMemeTemplates = async () => {
    try {
      const response = await axios.get('https://api.imgflip.com/get_memes');
      setMemeTemplates(response.data.data.memes);
    } catch (error) {
      console.error('Error fetching meme templates:', error);

    }
  };

  useEffect(() => {
    fetchMemeTemplates();
  }, []);

  const handleNextMeme = () => {
    setCurrentMemeIndex(currentMemeIndex < 99 ? currentMemeIndex + 1 : 99);
  };

  const handlePreviousMeme = () => {
    setCurrentMemeIndex(currentMemeIndex > 0 ? currentMemeIndex - 1 : 0);
  };

  return (
    <div className='top'>
      <p className='bottom'> oben</p>
      <img
        src={memeTemplates[currentMemeIndex]?.url}
        alt="Current Meme"
        style={{ width: '25rem' }} 
        className="meme-generator-image"
      />
      <p> unter</p>


      <input
        type="text"
        value={topText}
        onChange={(e) => setTopText(e.target.value)}
        placeholder="Top Text"
      />
      <input
        type="text"
        value={bottomText}
        onChange={(e) => setBottomText(e.target.value)}
        placeholder="Bottom Text"
      />
      <button onClick={handlePreviousMeme}>Previous</button>
      <button onClick={handleNextMeme}>Next</button>
    </div>
  );
};

export default MemeGenerator;
