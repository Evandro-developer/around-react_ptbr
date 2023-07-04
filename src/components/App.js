import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { CurrentUserContext } from "./contexts/CurrentUserContext";
import Header from "./Header";
import Main from "./Main";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmationPopup from "./ConfirmationPopup";
import Footer from "./Footer";

function App() {
  const [activePopup, setActivePopup] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCardsList] = useState([]);
  const [cardToDelete, setCardToDelete] = useState(null);

  useEffect(() => {
    api.getCardsList().then((response) => {
      setCardsList(response);
    });
  }, []);

  useEffect(() => {
    api.getUserInfo().then((response) => {
      setCurrentUser(response);
    });
  }, []);

  const handleEditAvatarClick = () => {
    setActivePopup("editAvatar");
  };

  const handleEditProfileClick = () => {
    setActivePopup("editProfile");
  };

  const handleAddPlaceClick = () => {
    setActivePopup("addPlace");
  };

  const closeAllPopups = () => {
    setActivePopup(null);
  };

  const handleUpdateUser = (newUser) => {
    api.setUserInfo(newUser.name, newUser.about).then((updatedUser) => {
      setCurrentUser(updatedUser);
      closeAllPopups();
    });
  };

  const handleUpdateAvatar = (newAvatar) => {
    api.setUserAvatar(newAvatar.avatar).then((updatedUser) => {
      setCurrentUser(updatedUser);
      closeAllPopups();
    });
  };

  const handleAddPlace = (newCard) => {
    api.addNewCard(newCard.name, newCard.link).then((newCard) => {
      setCardsList([newCard, ...cards]);
      closeAllPopups();
    });
  };

  const handleCardDeleteClick = (card) => {
    setCardToDelete(card);
    setActivePopup("confirmation");
  };

  const handleCardDeleteConfirm = async () => {
    if (cardToDelete) {
      await api.deleteCard(cardToDelete._id);
      setCardsList((state) => state.filter((c) => c._id !== cardToDelete._id));
      setCardToDelete(null);
      closeAllPopups();
    }
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="root">
          <Header
            currentUser={currentUser}
            onEditAvatarClick={handleEditAvatarClick}
            onEditProfileClick={handleEditProfileClick}
            onAddPlaceClick={handleAddPlaceClick}
          />
          <Main
            api={api}
            onCardTrashClick={handleCardDeleteClick}
            cards={cards}
            setCardsList={setCardsList}
            selectedCard={selectedCard}
            setSelectedCard={setSelectedCard}
          />
          {activePopup === "editProfile" && (
            <EditProfilePopup
              isOpen={true}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />
          )}
          {activePopup === "editAvatar" && (
            <EditAvatarPopup
              isOpen={true}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />
          )}
          {activePopup === "addPlace" && (
            <AddPlacePopup
              isOpen={true}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlace}
            />
          )}
          {activePopup === "confirmation" && (
            <ConfirmationPopup
              isOpen={true}
              onClose={closeAllPopups}
              onConfirm={handleCardDeleteConfirm}
            />
          )}
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
