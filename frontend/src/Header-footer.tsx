import { useNavigate } from 'react-router-dom';
import './Header-footer.css';

function Header() {
  return (
    <header className="fixed-header">
        <img className="logo-header" src="logo-header.png" />
    </header>
  );
}

function Footer() {

  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate('/Teste');
  };

  const goToAddPage = () => {
    navigate('/UploadPage');
  };

  const goToNewCatPage = () => {
    navigate('/NewCat');
  }

  return (
    <header className="fixed-footer">
        <div className="icons">

          <div className="home-button">
            <a href="#" onClick={goToHomePage}>
              <img src={"home.png"} alt="Home icon"/>
            </a>
          </div>

          <div className="add-button">
            <a href="#" onClick={goToAddPage}>
              <img src={"add.png"} alt="Add icon"/>
            </a>
          </div>

          <div className="add-cat-button">
            <a href="#" onClick={goToNewCatPage}>
              <img src={"addcat.png"} alt="Add cat icon"/>
            </a>
          </div>

        </div>
    </header>
  );
}

export { Header, Footer };
