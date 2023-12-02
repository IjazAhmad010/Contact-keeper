import react, { useReducer } from 'react';
import uuid from 'uuid';
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
        type: 'proffesional',
      },
    ],
  };
  const [state, dispatch] = useReducer(ContactReducer, initialState);

  //Add contact

  //Delete Contact

  //set Current Contact

  //Clear current Contact

  //update Contact

  //Filter Contact

  //Clear Filter

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
