import App from '../App';
import Auth from '../components/auth/Auth';
import Signup from '../components/auth/signup/Signup';
import Login from '../components/auth/login/Login';
import Messaging from '../components/messaging/Messaging';
import Account from '../components/account/Account';
import UserProfile from '../components/profile/UserProfile';
import ErrorElement from '../components/elements/ErrorElement';
import { appLoader, authLoader } from '../helpers/loaders';
import {
  signUpAction,
  logInAction,
  messagingAction,
  accountAction,
  userProfileAction,
} from '../helpers/actions';

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
      {
        path: '/account',
        element: <Account />,
        action: accountAction,
      },
      {
        path: '/profile/:userId',
        element: <UserProfile />,
        action: userProfileAction,
      },
    ],
    errorElement: <ErrorElement />,
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
    errorElement: <ErrorElement />,
  },
];

export default routes;
