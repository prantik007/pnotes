import React from 'react';
import {
  WrapItem,
  Box,
  Heading,
  Text,
  Button,
  useColorModeValue,
  Divider,
} from '@chakra-ui/react';

const NotesList = ({ id, title, details, onDelete }) => {
  const handleClick = id => {
    onDelete(id);
  };
  return (
    <WrapItem key={id}>
      <Box
        display={'flex'}
        flexDirection={'column'}
        minW={'400px'}
        
        
        rounded={'lg'}
        m={3}
        p={2}
       bgColor={useColorModeValue('gray.50','gray.800')}
        backdropBlur={'20px'}
        boxShadow={'xl'}
      >
        <Heading fontSize={'2xl'} p={2} mb={2} color={useColorModeValue('green.500','green.300')}>
          {title}
        </Heading>
        <Divider/>
        <Text minH="105px" p={3}>{details}</Text>
        <Button
          bgColor={useColorModeValue('red.500', 'red.800')}
          color={useColorModeValue('white', 'white')}
          justifySelf={'flex-end'}
          alignSelf={'flex-end'}
          onClick={handleClick}
        >
          Delete
        </Button>
      </Box>
    </WrapItem>
  );
};

export default NotesList;
