const theme = 'blue';

const presets = {
  theme: `${theme}`,
  appTitle: 'Restaurant ERP',
  images: {
    logo: 'https://as2.ftcdn.net/v2/jpg/02/40/95/67/1000_F_240956779_TjhLeVqmRmWny6TcdmoWVjhCfNhtVDDp.jpg',
    loginFondo: 'https://www.posist.com/restaurant-times/wp-content/uploads/2023/07/10-consejos-probados-de-servicio-al-cliente-en-restaurante-para-atraer-mas-clientes.jpg',
    welcomeFondo: 'https://www.via-asesores.com/backgrounds/smartproject/smartproject_bg02.jpg'
  },
  locations: {
    login: '/login',
    companiasUsuario: '/welcome',
    welcome: '/companiasUsuario',
    profile: '/miPerfil',
    welcomeTemp: '/welcome'
  },
  toaster: {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'light'
  }
};

export default presets;
