import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import usersApi from '../apiServices/usersApi';

//Se crea el contexto
export const LoginContextP = React.createContext();

//se crea un componente funcional donde se insertan los contextos.Este componente se encargará de pasar dicha información otros componentes con los que
//se desee interactuar (siempre y cuando sean componentes hijos de este componente LoginContextProvider), por ello se completa el nombre con la palabra provider.
//Aqui se incluye toda la logica, funciones etc.
export const LoginContextProviderP = ({ children }) => {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [error, setError] = useState('');
   const [profileDetails, setProfileDetails] = useState();

   const navigate = useNavigate();
   let tokenRecoveryparams = useParams();
   const urlLocation = useLocation();
   const checkForPageLogin = urlLocation.pathname.includes('/login')
   console.log('cjeck',checkForPageLogin)
   useEffect(() => {
      // Si la URL no incluye '/reset-password/', ejecuta checkToken
      if (!urlLocation.pathname.includes('/reset-password/')) {
         checkToken();
      }
   }, []);

   const checkToken = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
         navigate('/');
         return;
      }
      try {
         const response = await usersApi.getMyprofile();
         const auth = localStorage.getItem('auth');
         if (token && !response.error) {
            setIsLoggedIn(true);
            setProfileDetails(response);
            navigate('/home')
            if (auth === 'true') {
               if (urlLocation.pathname === '/') {
                  setIsLoggedIn(true);
                  setProfileDetails(response);
                  navigate('/home');
               }
               setProfileDetails(response);
               return;
            } else {
               localStorage.setItem('auth', true);
               setIsLoggedIn(true);
               navigate('/home');
            }
         } else {
            navigate('/');
         }
      } catch (error) {
         console.log('esto es el error de la petecion de checkToken', error);
      }
   };

   const login = async (email, password) => {
      const response = await usersApi.login(email, password);

      if (response.error) setError(response.error);
      else {
         const token = response.data;
         const userdetails = response.userDetails;
         localStorage.setItem('access_token', token);
         console.log('Cuales son los datos del usuario logeado', userdetails);
         navigate('/home');
         setProfileDetails(userdetails);
         console.log('esto es login abajo', profileDetails);
      }
      setIsLoggedIn(true);
   };

   const logout = () => {
      console.log('cerrando session')
      localStorage.removeItem('access_token')
      localStorage.setItem('auth', false)
      setIsLoggedIn(false)
      navigate('/')
   }
   
   const loginContextValue = {
      isLoggedIn,
      error,
      setError,
      login,
      profileDetails,
      setProfileDetails,
      logout,
      tokenRecoveryparams,
      checkToken
   };

   return (
      <LoginContextP.Provider value={loginContextValue}>
         {children}
      </LoginContextP.Provider>
   );
};