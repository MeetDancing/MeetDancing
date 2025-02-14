import { Login } from '@mui/icons-material';
import { Avatar, Badge, styled } from '@mui/material';
import { useContext } from 'react';
import { LoginContextP } from '../../context/loginContextPrueba';

export default function AvatarComponent() {
   const {profileDetails,isLoggedIn} = useContext(LoginContextP)

   const StyledBadge = styled(Badge)(({ theme }) => ({
      '& .MuiBadge-badge': {
         backgroundColor: '#44b700',
         color: '#44b700',
         boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
         '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
         },
      },
      '@keyframes ripple': {
         '0%': {
            transform: 'scale(.8)',
            opacity: 1,
         },
         '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
         },
      },
   }));
    
   return (

      <StyledBadge
         overlap="circular"
         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
         variant="dot"
         invisible={!isLoggedIn}
      >
         <Avatar src={profileDetails.imgProfile} sx={{ width: 60, height: 60, bgcolor: ' background.avatar' }} />
      </StyledBadge>
   )
}
