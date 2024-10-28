import App from '../App';
import Auth from '../components/auth/Auth';

const routes = [
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/auth',
    element: <Auth />,
  },
];

export default routes;
