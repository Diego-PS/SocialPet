import React, { useState, ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllPets, GetAllPetsResBody, IPet } from './api/pet/getAllPets';
import api from './api'; // Import your API instance
import { Header, Footer } from './Header-footer';
import './ImageUploadPage.css';
import './BackButton.css';

function CreatePost() {
  const [textContent, setTextContent] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [petNicknames, setPetNicknames] = useState<string[]>([]);
  const [selectedPetNickname, setSelectedPetNickname] = useState<string>('');

  const handleTextContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextContent(e.target.value);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = (event) => {
        if (event.target) {
          setImagePreviewUrl(event.target.result as string);
        }
      };
  
      reader.readAsDataURL(file);
      setSelectedFile(file);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      
      if (selectedFile) {
        formData.append('media', selectedFile);
      }
      formData.append('petPublicId', selectedPetNickname);
      formData.append('textContent', textContent);

      await api.post('/post/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Optionally, you can redirect the user or perform other actions after a successful post creation.
    } catch (error) {
      console.error('Error creating the post:', error);
    }
  };

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchPetNicknames = async () => {
      try {
        const response = await getAllPets();
        setPetNicknames(response.data.pets.map((pet: IPet) => pet.nickname));
      } catch (error) {
        console.error('Error fetching pet nicknames:', error);
      }
    };

    fetchPetNicknames();
  }, []);

  return (
    <div>
      <Header />
      
      <div className="create-post-container">
        
        <div className="container-back-and-title">
          <div className="back-button">
            <a href="#" onClick={goBack}>
              <img src={"back-arrow.png"} alt="Back" />
            </a>
          </div>

          <h2>New Post</h2>
        </div>

        <input type="file" accept="image/*" onChange={handleFileChange} id="fileInput" style={{ display: 'none' }} />

        {imagePreviewUrl ? (
          <div className="image-preview">
            <img src={imagePreviewUrl} alt="Uploaded" />
          </div>
        ) : (
          <label className="upload-button" htmlFor="fileInput">
            Choose file...
          </label>
        )}

        <text> What pet is in this image?</text>

        <div className="pet-selection">
          <label htmlFor="petNickname"></label>
          <select
            id="petNickname"
            value={selectedPetNickname}
            onChange={(e) => setSelectedPetNickname(e.target.value)}
          >
            <option value="">-- Select a pet --</option>
            {petNicknames.map((nickname) => (
              <option key={nickname} value={nickname}>
                {nickname}
              </option>
            ))}
          </select>
        </div>
        
        <textarea 
          placeholder="Enter your caption..."
          value={textContent}
          onChange={handleTextContentChange}
        />
        
        <button onClick={handleSubmit}>Add</button>
      </div>
      <Footer />
    </div>
  );
}

export default CreatePost;
