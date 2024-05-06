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
  // console.log(userProfileData)







  useEffect(() => {
  const fetchUserProfile = async () => {
    if (user) {
      try {
        const userProfileData = await getUserProfile(user);
        setUserProfileData(userProfileData);
        // console.log('User profile data loaded:', userProfileData);
      } catch (error) {
        console.error('Error fetching user profile data:', error);
      }
    }
  };

  fetchUserProfile();

  let nullUserUrls = ["/login", "/signup"] // should redirect to profile if logged in
  let allowNonUserUrls = ["/login", "/signup", "/", "/events"] // should allow if not logged in

    // check if current url is one that might need to redirect
    let isNullUserUrl = nullUserUrls.includes(location.pathname)
    let isAllownonUserUrl = allowNonUserUrls.includes(location.pathname);


    // redirect to profile page when
    // logged user tries to go to signup, etc
    if(user && isNullUserUrl) {
      navigate("/profile")
    }

    // not logged in user tries to go anywhere BUT signup, login, home or events
    // we redirect because the user needs to log in before they do anything else
    else if (!user && !isAllownonUserUrl){
      navigate("/")
    }

  }, [user, location.pathname]);


  return (
    <>
      <MyNavbar setUserProfileData={setUserProfileData} user={ user } setUser={ setUser } displayName={userProfileData.display_name}/>
      <Outlet context={{ user, setUser, userProfileData, setUserProfileData }} />
    </>
  )
}

export default App
