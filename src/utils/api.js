export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  async getUserInfo() {
    try {
      const response = await fetch(`${this._baseUrl}/users/me`, {
        method: "GET",
        headers: this._headers,
      });
      return response.ok
        ? await response.json()
        : Promise.reject(new Error(`Error: ${response.status}`));
    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
      throw error;
    }
  }

  async setUserInfo(name, job) {
    try {
      const response = await fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          about: job,
        }),
      });
      return response.ok
        ? await response.json()
        : Promise.reject(new Error(`Error: ${response.status}`));
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      throw error;
    }
  }

  async setUserAvatar(link) {
    try {
      const response = await fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: link,
        }),
      });
      return response.ok
        ? await response.json()
        : Promise.reject(new Error(`Error: ${response.status}`));
    } catch (error) {
      console.error("Erro ao atualizar avatar:", error);
      throw error;
    }
  }

  async getCardsList() {
    try {
      const response = await fetch(`${this._baseUrl}/cards`, {
        method: "GET",
        headers: this._headers,
      });
      return response.ok
        ? await response.json()
        : Promise.reject(new Error(`Error: ${response.status}`));
    } catch (error) {
      console.error("Erro ao carregar cards:", error);
      throw error;
    }
  }

  async addNewCard(name, link) {
    try {
      const response = await fetch(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name,
          link,
        }),
      });
      return response.ok
        ? await response.json()
        : Promise.reject(new Error(`Error: ${response.status}`));
    } catch (error) {
      console.error("Erro ao criar um novo card:", error);
      throw error;
    }
  }

  async deleteCard(cardId) {
    try {
      const response = await fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
      });
      return response.ok
        ? await response.json()
        : Promise.reject(new Error(`Error: ${response.status}`));
    } catch (error) {
      console.error("Erro ao excluir card:", error);
      throw error;
    }
  }

  async addLike(cardId) {
    try {
      const response = await fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: this._headers,
      });
      return response.ok
        ? await response.json()
        : Promise.reject(new Error(`Error: ${response.status}`));
    } catch (error) {
      console.error("Erro ao adicionar curtida:", error);
      throw error;
    }
  }

  async removeLike(cardId) {
    try {
      const response = await fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
      });
      return response.ok
        ? await response.json()
        : Promise.reject(new Error(`Error: ${response.status}`));
    } catch (error) {
      console.error("Erro ao remover curtida:", error);
      throw error;
    }
  }
}

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web_ptbr_04",
  headers: {
    authorization: "d4755444-b3df-4e41-b8f5-5d31e60bfcca",
    "Content-Type": "application/json; charset=UTF-8",
  },
});

export default api;
