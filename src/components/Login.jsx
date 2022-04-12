import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  CircularProgress,
  Fade,
  useDisclosure,
} from '@chakra-ui/react';
import { async } from '@firebase/util';

import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { signin } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './../Context/AuthContext';
export default function Login() {
const user= useAuth();
  useLayoutEffect(()=>{
    if(user)
    {
      navigate('/');
    }
  },[])
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading,setIsLoading] = useState(false)

  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate=useNavigate();

  const handleSignIn = async () => {
    setErrorMsg(null)
    setIsLoading(true)
    try {
      const user = await signin(
        emailRef.current.value,
        passwordRef.current.value
      );
      setIsLoading(false)

      navigate('/dashboard');
    } catch (error) {
      setErrorMsg(error.message);
      setIsLoading(false)
    }
  };

  
  return (
    
    <Flex
      minH={'100%'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.400'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" ref={emailRef} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" ref={passwordRef} />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={'blue.400'}>Forgot password?</Link>
              </Stack>
              {errorMsg && <Text color="red.500">{errorMsg}</Text>}
              <Button
                onClick={handleSignIn}
                bg={'green.400'}
                color={'white'}
                _hover={{
                  bg: 'green.500',
                }}
              >
                {isLoading ? <CircularProgress size='30px' isIndeterminate color='green.300' /> : 'Sign In'}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
    
  );
}
