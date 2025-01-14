
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usersApi from '../apiServices/usersApi';

export const UserContext = React.createContext();

export const UserContextProvider = ({ children }) => {
   const [users, setUsers] = useState([])
   const [userDetail, setUserDetail] = useState(null);
 
   const [error, setError] = useState('')
   const [editPass, setEditPass] = useState(false);
   const [navProfile, setNavProfile] = useState(false);
    
   const navigate = useNavigate()

   //Informacion del usuario de interes

   const getUserDetail = async (id) => {
      try {
         const detailUser = await usersApi.detailByIdUser(id);
 
         setUserDetail(detailUser);
         
         navigate(`/profile/${id}`)
      } catch (err) {
         alert('Ha ocurrido el siguiente error: ' + err.message);
      }
   }
    
   const getOneUser= async (userId)=>{ 
      const user= await usersApi.detailByIdUser (userId)
      if(user.error) setError(user.error)
      return user
    
   } 

   ///controler de userSettings
   const handleNavProfile = () => {
      setNavProfile(true)
      navigate('/profile')
   }

   const handleSwitchNav = () => {
      setNavProfile(false)
      navigate('/profile')
   }

   const handleNavConfig = () => {
  
      navigate('/profile')
      setNavProfile(true)
   }
   const userContextValue = {
      users,
      userDetail,
      setUserDetail,
      getUserDetail,
      getOneUser, 
      editPass,
      setEditPass,
      navProfile,
      setNavProfile,
      handleNavProfile,
      handleSwitchNav,
      navigate,
      handleNavConfig
  
   }
  
   return (
      <UserContext.Provider value={userContextValue} >
         {children}
      </UserContext.Provider>
   )
    
}