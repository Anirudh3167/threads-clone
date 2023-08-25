import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

import About from './pages/About/About';
import Profile from './pages/profile/profile';
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
import Search from './pages/Search/Search';
import { useEffect } from 'react';


function App() {
  // Address initiation
  const address = process.env.REACT_APP_BACKEND_URL;
  const socketPort = process.env.PORT || 3001;
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home address={address} />} />
          <Route path="/about" element={<About address={address} />} />
          <Route path='/search' element={<Search address={address} />} />
          <Route path='/profile' element={<Profile address={address} />} />
          <Route path='/profile/:uname' element={<Profile address={address} />} />
          <Route path='/signup' element={<Signup address={address} />} />
          <Route path='/signin' element={<Signin address={address} />} />

          <Route path='/thread' element={<Thread />} />
          <Route path='/feed' element={<Feed address={address} />} />
          <Route path='/notifications' element={<Notifications address={address} />} />
          <Route path='/settings' element={<Settings address={address} />} />
          <Route path='/following' element={<Following address={address} />} />
          <Route path='/collection' element={<Collection address={address} />} />
          <Route path='/chat' element={<Chat address={address} socketPort={socketPort} />} />

          
          <Route path='/testing' element={<Testing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
