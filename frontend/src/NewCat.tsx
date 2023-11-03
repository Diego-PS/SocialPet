import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api'; // Import your API instance
import { Header, Footer } from './Header-footer';
import './ImageUploadPage.css';
import './BackButton.css';
import './NewCat.css';

function AddNewCat() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [catname, setCatname] = useState<string>('');
  const [nickname, setNickName] = useState<string>('');
  const [userCreated, setUserCreated] = useState(false);
  const [_, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
    navs('/Teste');
  };

  const navs = useNavigate();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCatname(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };  

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = (event) => {
        if (event.target) {
          // Atualiza o estado da imagem com a URL da imagem carregada
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
        formData.append('profilePicture', selectedFile);
      }
      formData.append('name', catname);
      formData.append('nickname', nickname);

      await api.post('/pet/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Optionally, you can redirect the user or perform other actions after a successful post creation.
      setUserCreated(true);
      //navs('/Teste');
    } catch (error) {
      console.error('Error creating the post:', error);
    }

    console.log('Cat name:', catname);
    console.log('Cat age:', nickname);
  };

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Isso vai navegar de volta para a página anterior
  };

  return (
    <div>
      <Header />

      {userCreated && (
      <div>
        <div className="modal-overlay" onClick={closeModal}></div>
        <div className="modal">
          <p>New cat created successfully!</p>
          <button onClick={closeModal}>Close</button>
        </div>
      </div>
    )}
      
      <div className="add-cat-container">
        
        <div className="container-back-and-title">
          <div className="back-button">
            <a href="#" onClick={goBack}>
              <img src={"back-arrow.png"} alt="Back"/>
            </a>
          </div>

          <h2>New Cat</h2>
        </div>

        {/* Input de arquivo oculto */}
        <input type="file" accept="image/*" onChange={handleFileChange} id="fileInput" style={{ display: 'none' }} />

        {/* Exibir a imagem carregada ou o botão de upload */}
        {imagePreviewUrl ? (
          <div className="cat-image-preview">
            <img src={imagePreviewUrl} alt="Uploaded" />
          </div>
        ) : (
          <label className="upload-cat-button" htmlFor="fileInput">
            <div className="button-content">
              <img src="uploadcat.png" alt="Upload Button" />
              <p>Add a cat profile photo</p>
            </div>
          </label>
        )}

        <form onSubmit={handleSubmit}>
        
            <div className="form-group">
            <input
                type="text"
                id="catsname"
                name="catsname"
                placeholder="Cat's name"
                value={catname}
                onChange={handleUsernameChange}
                required
            />
            </div>

            <div className="form-group">
            <input
                type="text"
                id="username"
                name="username"
                placeholder="Nickname"
                value={nickname}
                onChange={handleEmailChange}
                required
            />
            </div>
        </form>
        
        <button onClick={handleSubmit}>Add</button>
      </div>
      <Footer />
    </div>
  );
}

export default AddNewCat;
