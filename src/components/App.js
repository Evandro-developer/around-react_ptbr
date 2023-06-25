import React, { useState, useEffect } from "react";
import api from "../utils/api";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isAddConfirmationPopupOpen, setIsAddConfirmationPopupOpen] =
    useState(false);

  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState();

  useEffect(() => {
    api.getUserInfo().then((response) => {
      setUserName(response.name);
      setUserDescription(response.about);
      setUserAvatar(response.avatar);
    });
  }, []);

  useEffect(() => {
    api.getInitialCards().then((response) => {
      setCards(response);
    });
  }, []);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleConfirmationClick = () => {
    setIsAddConfirmationPopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsAddConfirmationPopupOpen(false);
  };

  const handleCardImageClick = (card) => {
    setSelectedCard(card);
  };

  const closeImagePopup = () => {
    setSelectedCard(null);
  };

  return (
    <>
      <div className="page">
        <div className="root">
          <Header
            onEditProfileClick={handleEditProfileClick}
            onEditAvatarClick={handleEditAvatarClick}
            onAddPlaceClick={handleAddPlaceClick}
            onAddConfirmationPopupOpen={handleConfirmationClick}
            userName={userName}
            userDescription={userDescription}
            userAvatar={userAvatar}
          />
          <Main
            isEditProfilePopupOpen={isEditProfilePopupOpen}
            isEditAvatarPopupOpen={isEditAvatarPopupOpen}
            isAddPlacePopupOpen={isAddPlacePopupOpen}
            isAddConfirmationPopupOpen={isAddConfirmationPopupOpen}
            selectedCard={selectedCard}
            cards={cards}
            closeAllPopups={closeAllPopups}
            onClose={closeImagePopup}
            onCardImageClick={handleCardImageClick}
            onCardTrashClick={handleConfirmationClick}
          />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
