import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import apiClient from '../services/api-client';

export type Contact = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  photo: string;
};

// Types
type User = {
  status: 'idle' | 'loading' | 'success' | 'failed';
  contacts: Contact[];
};

type Status = {
  status: 'idle' | 'loading' | 'success' | 'failed';
};

type InitialState = {
  error: string | null | undefined;
  data: User;
  newUser: User;
  deleteUser: Status;
  updateUser: Status;
};

// Initial State
const initialState: InitialState = {
  error: null,
  data: {
    status: 'idle',
    contacts: [],
  },
  newUser: {
    status: 'idle',
    contacts: [],
  },
  deleteUser: {
    status: 'idle',
  },
  updateUser: {
    status: 'idle',
  },
};

// Async Thunks
export const fetchUserContact = createAsyncThunk('contactDetail', async () => {
  const response = await apiClient.get('https://contact.herokuapp.com/contact');
  return response;
});

export const createUserContact = createAsyncThunk(
  'users/new',
  async (payload: Omit<any, 'status'>) => {
    const response = await apiClient.post(
      'https://contact.herokuapp.com/contact',
      payload,
    );
    return response;
  },
);

export const deleteUserContact = createAsyncThunk(
  'users/delete',
  async (id: string) => {
    const response = await apiClient.delete(
      `https://contact.herokuapp.com/contact/${id}`,
    );
    return response;
  },
);

export const updateUserContact = createAsyncThunk(
  'users/update',
  async (payload: Omit<any, 'status'>) => {
    const response = await apiClient.put(
      `https://contact.herokuapp.com/contact/${payload.id}`,
      payload,
    );
    return response;
  },
);

// Slice
const dummyNetwokSlice = createSlice({
  name: 'dummyNetworkSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // data - for GET example
      .addCase(fetchUserContact.pending, state => {
        state.data.status = 'loading';
      })
      .addCase(fetchUserContact.fulfilled, (state, action) => {
        state.data.status = 'success';
        const data = action.payload.data.data;
        state.data.contacts = action.payload.data.data;
      })
      .addCase(fetchUserContact.rejected, (state, action) => {
        state.data.status = 'failed';
        state.error = action.error.message;
      })
      // newUser - POST example
      .addCase(createUserContact.pending, state => {
        state.newUser.status = 'loading';
      })
      .addCase(createUserContact.fulfilled, (state, action) => {
        state.newUser.status = 'success';
      })
      .addCase(createUserContact.rejected, (state, action) => {
        state.newUser.status = 'failed';
        state.error = action.error.message;
      })

      // deleteUser - DELETE example
      .addCase(deleteUserContact.pending, state => {
        state.deleteUser.status = 'loading';
      })
      .addCase(deleteUserContact.fulfilled, (state, action) => {
        state.deleteUser.status = 'success';
      })
      .addCase(deleteUserContact.rejected, (state, action) => {
        state.deleteUser.status = 'failed';
        state.error = action.error.message;
      })

      // updateeUser - Update example
      .addCase(updateUserContact.pending, state => {
        state.updateUser.status = 'loading';
      })
      .addCase(updateUserContact.fulfilled, (state, action) => {
        state.updateUser.status = 'success';
      })
      .addCase(updateUserContact.rejected, (state, action) => {
        state.updateUser.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {} = dummyNetwokSlice.actions;

export default dummyNetwokSlice.reducer;
