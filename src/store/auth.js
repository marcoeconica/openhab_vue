
import { reactive } from 'vue';

// Uno store reattivo per gestire lo stato utente
export const authStore = reactive({
  isAuthenticated: false,
  user: null,         // salvare user info
  username: '',
  password: '',
  token: "oh.postman.ZXgXUTkp2nwaLpn6hvptmuwSsDwuIq9u3ZIEeThyPM2ejJQTtSmtNvI3jiqJxFfhcoED6Fy83LgyFMwwUjuQ",
  // Funzione di login
  async login(username, password) {
    try {
      // Test su openHAB Cloud, facendo una chiamata "autenticata" a /rest/items
      const response = await fetch('http://149.62.186.157:3000/rest/items', {
        method: 'GET',
        headers: {
          'Authorization': 'Basic ' + btoa(`${username}:${password}`),
          "Bearer-Token": this.token
        }
      });

      if (!response.ok) {
        throw new Error(`Login failed: ${response.status} ${response.statusText}`);
        console.log("non ok");
      }
      
      // Se la risposta è 200, significa che username e password sono validi
      this.isAuthenticated = true;
      this.username = username;
      this.password = password;
      this.user = { username }; 
      
      // Salva su localStorage se vuoi che la sessione persista
      localStorage.setItem('ohUsername', username);
      localStorage.setItem('ohPassword', password);

      console.log(this.isAuthenticated);

      return true;
    } catch (error) {
      console.error('Errore di login:', error.message);
      this.isAuthenticated = false;
      this.username = '';
      this.password = '';
      this.user = null;
      return false;
    }
  },

  logout() {
    this.isAuthenticated = false;
    this.username = '';
    this.password = '';
    this.user = null;
    
    //console.log(this.isAuthenticated);
    
    localStorage.removeItem('ohUsername');
    localStorage.removeItem('ohPassword');
  },

  // Facoltativo: carica da localStorage
  loadFromLocalStorage() {
    const storedUser = localStorage.getItem('ohUsername');
    const storedPass = localStorage.getItem('ohPassword');
    if (storedUser && storedPass) {
      this.username = storedUser;
      this.password = storedPass;
      this.isAuthenticated = true;
      this.user = { username: storedUser };
    }
  },
});
