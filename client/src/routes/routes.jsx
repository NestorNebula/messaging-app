import App from '../App';
import Auth from '../components/auth/Auth';
import Signup from '../components/auth/signup/Signup';
import Login from '../components/auth/login/Login';
import Messaging from '../components/messaging/Messaging';
import { appLoader, authLoader } from '../helpers/loaders';
import { signUpAction, logInAction, messagingAction } from '../helpers/actions';

const routes = [
  {
    path: '/',
    element: <App />,
    loader: appLoader,
    children: [
      {
        index: true,
        element: <Messaging />,
        action: messagingAction,
      },
    ],
  },
  {
    path: '/auth',
    element: <Auth />,
    loader: authLoader,
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
