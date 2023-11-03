import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Page1.css';

const TwoButtons: React.FC = () => {
  useEffect(() => {
    document.body.className = 'page1'; // Adicione a classe 'page1' ao body
    return () => {
      document.body.className = ''; // Remova a classe quando o componente for desmontado
    };
  }, []);

  const navs = useNavigate();

  const handleButtonClick = (buttonName: string) => {
    navs('/Teste');
  };

  return (
    <div className="page1">
      <img className="logo" src="snapcat.png" />

      <div className="button-container">
        <button className="button" onClick={() => handleButtonClick('Button 1')}>enter</button>
      </div>
    </div>
  );
};

export default TwoButtons;
