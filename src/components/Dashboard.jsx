import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Input,
  Spacer,
  Stack,
  Text,
  Textarea,
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
import NotesList from './UI/NotesList';

const Dashboard = () => {
  const [noteTitleInput, setNoteTitleInput] = useState('');
  const [noteDetailsInput, setNoteDetailsInput] = useState('');

  const [username, setUserName] = useState();
  const [notesList, setNotesList] = useState([{}]);
  const [addNotesMessage, setAddNotesMessage] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const user = useAuth();

  useEffect(() => {
    async function getName() {
      const uname = await getNameFromEmail(user);

      setUserName(uname);
    }

    getName();
  }, []);

  useEffect(() => {
    async function getAllNotes() {
      setIsLoading(true);
      const email = user.email;

      const q = query(collection(database, 'notes', email, 'notes'));

      const unsubscribe = onSnapshot(q, querySnapshot => {
        const notes = [];

        querySnapshot.forEach(doc => {
          console.log(
            '🚀 ~ file: Dashboard.jsx ~ line 70 ~ getAllNotes ~ doc',
            doc.id
          );

          notes.push({
            id: doc.id,
            title: doc.data().title,
            details: doc.data().details,
          });
        });

        setNotesList(notes);
      });

      setIsLoading(false);
    }

    getAllNotes();
  }, []);

  const handleNoteSubmit = async () => {
    if (noteTitleInput.trim() === '' || noteDetailsInput.trim() === '') {
      setAddNotesMessage('Please fill empty fields');
    } else {
      setAddNotesMessage('Adding Note...');

      await addNote(noteTitleInput, noteDetailsInput, user.email);
      setNoteTitleInput('');
      setNoteDetailsInput('');
      setAddNotesMessage('Note Added');
    }
  };

  const handleDeleteNote = async noteId => {
    await deleteNote(user.email, noteId);
  };

  return (
    <>
      <Flex
        bg={useColorModeValue('gray.50', 'gray.800')}
        minH={'100%'}
        align={'center'}
        justify={'center'}
        direction={'column'}
      >
        <VStack
          mt={10}
          rounded={'lg'}
          boxShadow={'lg'}
          minH={'300px'}
          minW={'500px'}
          borderWidth={'1px'}
          borderColor={'green.400'}
          bg={useColorModeValue('white', 'gray.700')}
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
      <Flex ml={14}>
        <Heading>{username}'s Notes</Heading>
      </Flex>
      <br />
      <Flex ml={14}>
        <Wrap spacing={0}>
          {notesList.map(item => {
            return (
              <NotesList
                key={item.id}
                id={item.id}
                title={item.title}
                details={item.details}
                onDelete={() => handleDeleteNote(item.id)}
              />
            );
          })}
        </Wrap>
      </Flex>
    </>
  );
};

export default Dashboard;
