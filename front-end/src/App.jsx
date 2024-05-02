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

  // get userprofile data to retrieve display name for navbar
  const userProfile = async() => {
    const userProfileData = await getUserProfile(user);
    setUserProfileData(userProfileData)
  }
  
  // useEffect for test connection function
  useEffect(() => {
    
  }, [user]);

  // use effect to run when user and location.pathname is updated 
  useEffect(() => {
    userProfile();

    let nullUserUrls = ["/login", "/signup"];

    // check if current location is allowed
    let isAllowed = nullUserUrls.includes(location.pathname);

    // redirect user to homepage if user is logged in and trying to go to signup/signin
    // redirect user to login/signup page if not logged in 
    if(user && isAllowed) {
      navigate("/events");
    } else if (!user && !isAllowed) {
      navigate("/");
    }
    
    // console.log('user:', user);
  }, [user, location.pathname]);

  return (
    <>
      <MyNavbar user={ user } setUser={ setUser } displayName={userProfileData.display_name}/>
      <Outlet context={{ user, setUser, userProfileData, setUserProfileData }} />
    </>
  )
}

export default App
