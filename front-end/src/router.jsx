import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Homepage from './pages/Homepage/Homepage';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import ErrorPage from './pages/ErrorPage';
import CreateEvent from './pages/CreateEvent';
import EditEventDetails from './pages/EditEventDetails';
import EditUserProfile from './pages/EditUserProfile';
import EventDetails from './pages/EventDetails';
import SearchEvents from './pages/SearchEvents/SearchEvents';
import EventDirections from './pages/EventDirections';
import UserProfile from './pages/UserProfile/UserProfile';
import AdminPage from './pages/AdminPage';
import FAQ from './pages/FAQ';

import { userConfirmation } from './utilities';
import EventCollab from './pages/EventCollab';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: userConfirmation,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <LogIn />,
      },
      {
        path: "/profile",
        element: <UserProfile />,
      },
      {
        path: "/editprofile",
        element: <EditUserProfile />,
      },
      {
        path: "/event/:eventID",
        element: <EventDetails />,
      },
      {
        path: "/eventdirections",
        element: <EventDirections />,
      },
      {
        path: "/createevent",
        element: <CreateEvent />,
      },
      {
        path: "/editevent/:eventID",
        element: <EditEventDetails />,
      },
      {
        path: "/events",
        element: <SearchEvents />,
      },
      {
        path: "/collab/:eventID",
        element: <EventCollab />,
      },
      {
        path: "/admin/:eventID", 
        element: <AdminPage />,
      },
      {
        path: "/FAQ", 
        element: <FAQ />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

export default router;