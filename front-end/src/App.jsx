import './App.css'
import { useEffect, useState } from 'react'
import { Outlet, useNavigate, useLocation, useLoaderData } from 'react-router-dom'
import MyNavbar from './components/Navbar'
import { getUserProfile } from './utilities/UserProfileUtilities'

function App() {
  // vars for user, navigate, and location
  const [user, setUser] = useState(useLoaderData());
  const [userProfileData, setUserProfileData] = useState([])
  // vars for navigate and location
  const navigate = useNavigate();
  const location = useLocation();
  console.log(userProfileData)

  useEffect(() => {
  const fetchUserProfile = async () => {
    if (user && userProfileData.length === 0) {
      try {
        const userProfileData = await getUserProfile(user);
        setUserProfileData(userProfileData);
        console.log('User profile data loaded:', userProfileData);
      } catch (error) {
        console.error('Error fetching user profile data:', error);
      }
    }
  };

  fetchUserProfile();

  }, [user, location.pathname, userProfileData]);


  return (
    <>
      <MyNavbar user={ user } setUser={ setUser } displayName={userProfileData.display_name}/>
      <Outlet context={{ user, setUser, userProfileData, setUserProfileData }} />
    </>
  )
}

export default App
