import {
  Flex,
  Heading,
  Box,
  Text,
  Center,
  VStack,
  HStack,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { FaGithub } from 'react-icons/fa';

const About = () => {
  const handleOnClickGithub = () => {
    window.open('https://github.com/prantik007/pnotes', '_blank');
  };

  return (
    <Flex direction={'column'} justify={'center'} align="center" mt={10}>
      <Box d="flex" alignItems="center">
        <Heading fontSize="7xl" color="green.400">
          P
        </Heading>
        <Heading fontWeight="light" fontSize="5xl">
          -Notes{' '}
        </Heading>
      </Box>
      <VStack spacing={16} justify={'center'}>
        <Text fontSize={'2xl'} w={500} mt={16}>
          P-Notes is a simple note-taking website which can sync notes across
          various devices. 🗒️
        </Text>

        <HStack>
          <Text fontSize={'3xl'} >
            Made by
          </Text>
          <Text fontSize={'3xl'} color={useColorModeValue('green.700','blue.300')}>Prantik Chakraborty</Text>
        </HStack>

        <Text fontSize={'2xl'}>
          React JS, react-router-dom, Chakra-UI, Firebase
        </Text>

        <HStack>
          <Button
            onClick={handleOnClickGithub}
            leftIcon={<FaGithub />}
            bgColor={useColorModeValue('green.400', 'blue.600')}
          >
            GitHub
          </Button>
        </HStack>
      </VStack>
    </Flex>
  );
};

export default About;
