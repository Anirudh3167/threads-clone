import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

import HomeNavbar from './components/HomeNavbar';

import About from '../src/pages/About';
import Profile from './pages/profile';
import Home from './pages/Home';
import Thread from './pages/thread/Thread';
import Feed from './pages/feed/Feed';
import Notifications from './pages/notifications/Notifications';
import Settings from './pages/settings/Settings';
import FindFriends from './pages/friends/FindFriends';


function App() {
  // Test API Call
  // function getAPI() {
  //   console.log("clicked");
  //   fetch("http://127.0.0.1:8080/hello-World/12/234", { mode: "cors" })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.text();
  //     })
  //     .then((data) => console.log(data))
  //     .catch((error) => console.log(error));
  // }
  
  return (
    <div className="App">
      <HomeNavbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path='/profile' element={<Profile />} />

          <Route path='/thread' element={<Thread />} />
          <Route path='/feed' element={<Feed />} />
          <Route path='/notifications' element={<Notifications />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/find-friends' element={<FindFriends />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
