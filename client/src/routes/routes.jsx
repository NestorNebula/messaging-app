import App from '../App';
import Auth from '../components/auth/Auth';
import Signup from '../components/auth/signup/Signup';
import Login from '../components/auth/login/Login';
import { signUpAction, logInAction } from '../helpers/actions';

const routes = [
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/auth',
    element: <Auth />,
    children: [
      {
        path: 'signup',
        element: <Signup />,
        action: signUpAction,
      },
      {
        path: 'login',
        element: <Login />,
        action: logInAction,
      },
    ],
  },
];

export default routes;
