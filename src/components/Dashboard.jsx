import {
  Box,
  Button,
  calc,
  CircularProgress,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Input,
  Spacer,
  Stack,
  Text,
  Textarea,
  useBoolean,
  useColorModeValue,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import React, { useRef, useState, useEffect } from 'react';
import {
  useAuth,
  getNameFromEmail,
  addNote,
  getAllNotesByUser,
  deleteNote,
} from './../Context/AuthContext';
import {
  doc,
  onSnapshot,
  query,
  collection,
  QuerySnapshot,
} from 'firebase/firestore';
import { database } from '../Firebase/config';
import { auth } from './../Firebase/config';
import NoteItem from './UI/NoteItem';
import EmptyNotes from './UI/EmptyNotes';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import {FcCheckmark} from 'react-icons/fc'
import 'react-loading-skeleton/dist/skeleton.css';

const Dashboard = () => {
  const [noteTitleInput, setNoteTitleInput] = useState('');
  const [noteDetailsInput, setNoteDetailsInput] = useState('');

  const [username, setUserName] = useState();
  const [notesList, setNotesList] = useState([{}]);
  const [addNotesMessage, setAddNotesMessage] = useState('');

  const [isLoading, setIsLoading] = useState(true);

  const user = useAuth();

  useEffect(() => {
    async function getName() {
      const uname = await getNameFromEmail(user);

      setUserName(uname);
    }

    getName().then(() => setIsLoading(false));
  }, [user]);

  useEffect(() => {
    async function getAllNotes() {
      const email = user.email;

      const q = query(collection(database, 'notes', email, 'notes'));

      const unsubscribe = onSnapshot(q, querySnapshot => {
        const notes = [];

        querySnapshot.forEach(doc => {
          notes.push({
            id: doc.id,
            title: doc.data().title,
            details: doc.data().details,
          });
        });

        setNotesList(notes);

      });
    }

    getAllNotes();
  }, []);

  const handleNoteSubmit = async () => {
    if (noteTitleInput.trim() === '' || noteDetailsInput.trim() === '') {
      setAddNotesMessage('Please fill empty fields');
    } else {
      setAddNotesMessage(
        <Flex align="center">
          <CircularProgress
            isIndeterminate
            color="green.300"
            size={'35px'}
            mr={5}
          />
          <Text color={'red'}>Adding Note...</Text>
        </Flex>
      );

      await addNote(noteTitleInput, noteDetailsInput, user.email);
      setNoteTitleInput('');
      setNoteDetailsInput('');
      setAddNotesMessage(<Flex ><FcCheckmark size={'30px'}/><Text ml={4}>Note Added</Text></Flex>);
    }
  };

  const handleDeleteNote = async noteId => {
    await deleteNote(user.email, noteId);
  };

  return (
    <>
      <Flex
        //bg={useColorModeValue('gray.50', 'gray.700')}
        minH={400}
        align={'center'}
        justify={'center'}
        direction={'column'}
      >
        <VStack
          
          rounded={'lg'}
          boxShadow={'xl'}
          minH={'300px'}
          minW={'500px'}
          borderWidth={'1px'}
          borderColor={'green.400'}
          bg={useColorModeValue('white', 'gray.800')}
          
        >
          <Heading fontSize={'3xl'} color={'green.400'} p={6}>
            Add new note...
          </Heading>

          <Stack spacing={3} w={'full'} pl={6} pr={6}>
            <Input
              variant="flushed"
              focusBorderColor="green.400"
              placeholder="Note Title"
              value={noteTitleInput}
              onChange={e => setNoteTitleInput(e.target.value)}
            />

            <Textarea
              resize={'none'}
              focusBorderColor="green.400"
              placeholder={'Note Details'}
              value={noteDetailsInput}
              onChange={e => setNoteDetailsInput(e.target.value)}
            />
            <Box display={'flex'}>
              <Text color={'red'} mr="auto">
                {addNotesMessage}
              </Text>
              <Button
                bgColor={'green.400'}
                color={'white'}
                _hover={{ bgColor: 'green.600' }}
                onClick={handleNoteSubmit}
              >
                Save
              </Button>
            </Box>
          </Stack>
        </VStack>
      </Flex>

      <Flex ml={14} mt={10} >
        {isLoading ? (
          <SkeletonTheme baseColor={'teal'}>
            <p>
              <Skeleton width={300} height={45} />
            </p>
          </SkeletonTheme>
        ) : (
          <Heading >{username}'s Notes</Heading>
        )}
        
      </Flex>
      <br />
      <Flex ml={14}>
        {notesList.length === 0 ? (
          <EmptyNotes />
        ) : (
          <Wrap spacing={0}>
            {notesList.map(item => {
              return (
                <NoteItem
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  details={item.details}
                  onDelete={() => handleDeleteNote(item.id)}
                />
              );
            })}
          </Wrap>
        )}
      </Flex>
    </>
  );
};

export default Dashboard;
