import react, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from '../types';

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Jill Johnson',
        email: 'jill@gmail.com',
        phone: '111-111-111',
        type: 'Personal',
      },
      {
        id: 2,
        name: 'Sara Watson',
        email: 'sara@gmail.com',
        phone: '222-222-222',
        type: 'Personal',
      },
      {
        id: 3,
        name: 'Harry white',
        email: 'harry@gmail.com',
        phone: '333-333-333',
        type: 'professional',
      },
    ],
    current: null,
    filtered: null,
  };
  const [state, dispatch] = useReducer(ContactReducer, initialState);

  //Add contact
  const addContact = contact => {
    contact.id = uuidv4();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };
  //Delete Contact
  const deleteContact = id => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };
  //set Current Contact
  const setCurrent = contact => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };
  //Clear current Contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };
  //update Contact
  const updateContact = contact => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };
  //Filter Contact
  const filterContacts = text => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };

  //Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
