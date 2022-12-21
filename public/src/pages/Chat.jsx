import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";

export default function Chat() {
     const navigate = useNavigate();
     const [contacts, setContacts] = useState([]);
     const [currentChat, setCurrentChat] = useState(undefined);


     const [currentUser, setCurrentUser] = useState();


     useEffect(() => {
      console.log('logggggg');
          const user = JSON.parse(localStorage.getItem('chat-app-user'));
          if (user) {
               setCurrentUser(user);
              console.log(`item is ${user._id}`);
              if (user.isAvatarImageSet) {
              fetchData(user._id).catch(console.error);
             } else {
                navigate("/setAvatar");
             }

          }else{
            navigate('/login')
          }
        }, []);


        const fetchData = async (id) => {
          const data = await axios.get(`${allUsersRoute}/${id}`);
          setContacts(data.data);
          console.log("contacts are "+data.data);

                  }   

 
        const handleChatChange = (chat) => {
          setCurrentChat(chat);
        };
 
        
        return (
          <>
            <Container>
              <div className="container">
                <Contacts contacts={contacts} changeChat={handleChatChange} />
                {currentChat === undefined ? (
                  <Welcome />
                ) : (
                  <div>
                  {/* <ChatContainer currentChat={currentChat} socket={socket} /> */}
                  </div>
                )}
              </div>
            </Container>
          </>
        );
      }
      
      const Container = styled.div`
        height: 100vh;
        width: 100vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1rem;
        align-items: center;
        background-color: #131324;
        .container {
          height: 85vh;
          width: 85vw;
          background-color: #00000076;
          display: grid;
          grid-template-columns: 25% 75%;
          @media screen and (min-width: 720px) and (max-width: 1080px) {
            grid-template-columns: 35% 65%;
          }
        }
      `;
