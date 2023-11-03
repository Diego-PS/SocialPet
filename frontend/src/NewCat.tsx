import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';
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
  const [showModal, setShowModal] = useState(false);

  const navs = useNavigate();

  const closeModal = () => {
    setShowModal(false);
    navs('/Teste');
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCatname(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
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
        formData.append('profilePicture', selectedFile);
      }
      formData.append('name', catname);
      formData.append('nickname', nickname);

      await api.post('/pet/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUserCreated(true);
    } catch (error) {
      console.error('Error creating the post:', error);
    }
  };

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <Header />

      {userCreated && (
        <Modal onClose={closeModal} />
      )}

      <AddCatContainer
        goBack={goBack}
        handleFileChange={handleFileChange}
        imagePreviewUrl={imagePreviewUrl}
        catname={catname}
        nickname={nickname}
        handleUsernameChange={handleUsernameChange}
        handleEmailChange={handleEmailChange}
        handleSubmit={handleSubmit}
      />

      <Footer />
    </div>
  );
}

function Modal({ onClose }: { onClose: () => void }) {
  return (
    <div>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal">
        <p>New cat created successfully!</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

function AddCatContainer({
  goBack,
  handleFileChange,
  imagePreviewUrl,
  catname,
  nickname,
  handleUsernameChange,
  handleEmailChange,
  handleSubmit,
}: {
  goBack: () => void;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  imagePreviewUrl: string | null;
  catname: string;
  nickname: string;
  handleUsernameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
}) {
  return (
    <div className="add-cat-container">
      <ContainerBackAndTitle goBack={goBack} />
      <ImageUpload
        handleFileChange={handleFileChange}
        imagePreviewUrl={imagePreviewUrl}
      />
      <CatForm
        catname={catname}
        nickname={nickname}
        handleUsernameChange={handleUsernameChange}
        handleEmailChange={handleEmailChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

function ContainerBackAndTitle({ goBack }: { goBack: () => void }) {
  return (
    <div className="container-back-and-title">
      <div className="back-button">
        <a href="#" onClick={goBack}>
          <img src={"back-arrow.png"} alt="Back" />
        </a>
      </div>

      <h2>New Cat</h2>
    </div>
  );
}

function ImageUpload({
  handleFileChange,
  imagePreviewUrl,
}: {
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  imagePreviewUrl: string | null;
}) {
  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} id="fileInput" style={{ display: 'none' }} />

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
    </div>
  );
}

function CatForm({
  catname,
  nickname,
  handleUsernameChange,
  handleEmailChange,
  handleSubmit,
}: {
  catname: string;
  nickname: string;
  handleUsernameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
}) {
  return (
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
      <button onClick={handleSubmit}>Add</button>
    </form>
  );
}

export default AddNewCat;
