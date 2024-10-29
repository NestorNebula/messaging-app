import App from '../App';
import Auth from '../components/auth/Auth';
import Signup from '../components/auth/signup/Signup';
import { signUpAction } from '../helpers/actions';

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
    ],
  },
];

export default routes;
