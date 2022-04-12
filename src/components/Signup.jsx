import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  CircularProgress,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link as RouterLink, Navigate, useNavigate } from 'react-router-dom';
import emailValidator from 'email-validator';
import passwordValidator from 'password-validator';
import { signup } from './../Context/AuthContext';
import { database } from '../Firebase/config';
import { collection,addDoc, setDoc } from 'firebase/firestore';
import { auth } from './../Firebase/config';
import { doc } from 'firebase/firestore';

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  

  let nameRef = useRef();
  let emailRef = useRef();
  let passwordRef = useRef();

  let navigate = useNavigate();

  const validateForm = event => {
    let passwordSchema = new passwordValidator(); //Validate password
    passwordSchema
      .is()
      .min(6)
      .is()
      .max(100)

      .has()
      .not()
      .spaces();

    let nameSchema = new passwordValidator(); //Validate name
    nameSchema.is().max(30).has().not().digits();

    const isPasswordValid = passwordSchema.validate(passwordRef.current.value);

    const isEmailValid = emailValidator.validate(emailRef.current.value);

    const isNameValid = nameSchema.validate(nameRef.current.value);

    if (isPasswordValid && isEmailValid && isNameValid) {
      handleSignUp(emailRef.current.value, passwordRef.current.value);
    } else {
      setStatusMsg('Please fill all details correctly');
    }
  };

  const handleSignUp = async (email, password) => {
    setStatusMsg(null);

    try {
      setIsLoading(true);
      const user = await signup(email, password);

      await setDoc(doc(database,'users',email),{
        name: nameRef.current.value,
        email:email,
        registered: Date() 
      })


      setIsLoading(false);
      setStatusMsg('User Registered. Please Login.');
      navigate('/dashboard');
    } catch (error) {
      setStatusMsg(error.message);
      setIsLoading(false);
    } finally {
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
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.400'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
          w="400px"
        >
          <Stack spacing={4}>
            <Box>
              <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input type="text" ref={nameRef} />
              </FormControl>
            </Box>

            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" ref={emailRef} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  ref={passwordRef}
                  placeholder="minimum 6 characters"
                />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword(showPassword => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'green.400'}
                color={'white'}
                _hover={{
                  bg: 'green.500',
                }}
                onClick={validateForm}
              >
                {isLoading ? (
                  <CircularProgress
                    size="30px"
                    isIndeterminate
                    color="green.300"
                  />
                ) : (
                  'Sign Up'
                )}
              </Button>
              {statusMsg && <Text color="yellow.500">{statusMsg}</Text>}
            </Stack>
            <Stack pt={6} direction="row" justify={'center'}>
              <Text align={'center'}>
                Already a user? <></>
              </Text>
              <RouterLink to="/login">
                <Text color="blue.400">Login</Text>
              </RouterLink>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
