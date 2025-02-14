import * as React from 'react';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { LocationContext } from '../../context/locationContext';
import { Chip, Stack } from '@mui/material';
import { RepeatButton } from './CommonButton';
import { useContext } from 'react';

export function LocationsComponent({ name,address,_id,events,photoURL}) {
  
   const{click_Buttons_Events}=useContext(LocationContext)
   const uniqueTypeOfDancing = new Set(events.map(event => event.typeOfDancing))

   return (
      <Card sx={{color: 'primary.main',fontWeight: 'bold',
         transitionDuration: '2s',
         maxWidth: 450,
         minWidth: 450,
         minHeight: 580,
         boxShadow: '8px 6px 9px #9ec5c0',
         position: 'relative',
       
         '&:hover': {
            transition: ' all 1s ease-in-out',
            transform: 'scale(1.05)',
         },

      }}>
         <CardHeader
            avatar={
               <Avatar sx={{ bgcolor:'primary.main',color:'white' }} >
                  {name.slice(0,2)}
               </Avatar>
            }
           
            titleTypographyProps={{ sx: { fontSize: '1.20rem', fontWeight: 'bold'} }}
            subheaderTypographyProps={{ sx: {fontSize: '0.9rem',fontStyle:'italic'} }}
            title={name}
            subheader={address}
         />
         <CardMedia
            component="img"
            height="225"
            image={photoURL[0]}
            alt="Foto de centro"
         />
        
         <CardContent>

            {events.length>0 ?(

               <>
                  <Stack direction="row"  sx={{ flexWrap: 'wrap' }}> 

                     {[...uniqueTypeOfDancing].map((typeOfDancing,index) => 

                        <Chip key={index}
   
                           sx={{ color:'white', m:0.6,  bgcolor:index % 2 === 0 ? 'stack.secondary' : 'stack.primary'} }
                           label={typeOfDancing}
   
                        />

                     )}
                  </Stack> 
                  <Typography variant='h7' color="primary.main">
        Este espacio cuenta con eventos donde practicar cualquiera de estos tipos de baile. Haz click en el botón de abajo para encontrar tu pareja de baile.
                  </Typography>

               </>
            ):(
               <Typography variant='h7' color="primary.main">
           No hay eventos disponibles
               </Typography>
            )}

         </CardContent>

         <CardActions sx={{justifyContent: 'center',position:'absolute',left: '50%',transform:'translateX(-50%)',  bottom: 10}} >

            <RepeatButton onClick={()=>click_Buttons_Events(_id)} name='Ver eventos'></RepeatButton>
          
         </CardActions>
         
      </Card>

   );
        
}
