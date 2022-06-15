import React, { useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import { Channel } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { ChannelContainer, ChannelListContainer, Auth } from "./components";

import 'stream-chat-react/dist/css/index.css';
import './App.css';


const cookies = new Cookies();
const apiKey = "xt5w3qtaunuh";
const authToken = cookies.get('token');
const client  = StreamChat.getInstance(apiKey);

if(authToken){
  client.connectUser({
    name: cookies.get("username"),
    fullName: cookies.get("fullName"),
    id: cookies.get("userId"),
    phoneNumber: cookies.get("phoneNumber"),
    iamge: cookies.get("avatarURL"),
    hashedPassword: cookies.get("hashedPassword")
  }, authToken)
}
// const authToken = false;
const App = () => {
  const [createType, setCreateType] = useState('');
  const[isCreating, setIsCreating] = useState(false);
  const[isEditing, setIsEditing] = useState(false);



  if (!authToken) return <Auth />

  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        <ChannelListContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setIsEditing={setIsEditing}
          setCreateType={setCreateType}
        />
        <ChannelContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setIsEditing={setIsEditing}
          isEditing={isEditing}
          createType={createType}
        />
      </Chat>
    </div>
  );
}

export default App