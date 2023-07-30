import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

import About from '../src/pages/About';
import Profile from './pages/profile';
import Home from './pages/Home';
import Thread from './pages/thread/Thread';
import Feed from './pages/feed/Feed';
import Notifications from './pages/notifications/Notifications';
import Settings from './pages/settings/Settings';
import Following from './pages/following/Following';
import Collection from './pages/collections/Collection';
import Chat from './pages/Chat/Chat';
import Signup from './pages/SignUp/Signup';
import Signin from './pages/signin/Signin';
import Testing from './pages/testing/Testing';


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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/:uname' element={<Profile />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />

          <Route path='/thread' element={<Thread />} />
          <Route path='/feed' element={<Feed />} />
          <Route path='/notifications' element={<Notifications />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/following' element={<Following />} />
          <Route path='/collection' element={<Collection />} />
          <Route path='/chat' element={<Chat />} />

          
          <Route path='/testing' element={<Testing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
