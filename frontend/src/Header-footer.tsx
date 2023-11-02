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

  const goToSearchPage = () => {
    navigate('/Search');
  };

  const goToProfilePage = () => {
    navigate('/Profile');
  };

  const goToAddPage = () => {
    navigate('/UploadPage');
  };

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

          <div className="search-button">
            <a href="#" onClick={goToSearchPage}>
              <img src={"search.png"} alt="Search icon"/>
            </a>
          </div>

          <div className="profile-button">
            <a href="#" onClick={goToProfilePage}>
              <img src={"profile.png"} alt="Profile icon"/>
            </a>
          </div>

        </div>
    </header>
  );
}

export { Header, Footer };
