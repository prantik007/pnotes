import React from 'react';
import {
  WrapItem,
  Box,
  Heading,
  Text,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';

const NotesList = ({ id, title, details, onDelete }) => {
  const handleClick = id => {
    onDelete(id);
  };
  return (
    <WrapItem>
      <Box
        display={'flex'}
        flexDirection={'column'}
        minW={'400px'}
        minH={'200px'}
        border={'solid 1px'}
        rounded={'lg'}
        m={3}
        p={2}
      >
        <Heading fontSize={'2xl'} mb={2}>
          {title}
        </Heading>
        <Text minH="105px">{details}</Text>
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
