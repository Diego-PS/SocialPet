import { useState, ChangeEvent } from 'react';
//import { useNavigate } from 'react-router-dom';
//import api from './api'; // Import your API instance
import { Header, Footer } from './Header-footer';
//import './ImageUploadPage.css';
//import './BackButton.css';
import './Search.css';

function SearchUser() {
  const [textContent, setTextContent] = useState<string>('');

  const handleTextContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextContent(e.target.value);
  };

  return (
    <div>
      <Header />
      
      <div id="search-user">
                
        <textarea 
          placeholder="Search..."
          value={textContent}
          onChange={handleTextContentChange}
        />
 
      </div>
      <Footer />
    </div>
  );
}

export default SearchUser;
