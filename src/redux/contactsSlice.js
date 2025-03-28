import { createSlice, createSelector } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from "./contactsOps";
import { selectFilterName } from "../redux/filtersSlice";

const handlePending = (state) => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};
const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const index = state.items.findIndex(
          (contact) => contact.id === action.payload.id
        );
        state.items.splice(index, 1);
      });
  },
});

export const selectContacts = (state) => state.contacts.items;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilterName],
  (contacts, filterName) => {
    if (filterName) {
      return contacts.filter((contact) =>
        contact.name.toLowerCase().includes(filterName.toLowerCase())
      );
    }
    return contacts;
  }
);

export default contactsSlice.reducer;

export const selectLoading = (state) => state.contacts.loading;
export const selectError = (state) => state.contacts.error;

export const selectContactCount = createSelector(
  [selectContacts],
  (contacts) => {
    return contacts.reduce(
      (count, contact) => {
        if (contact.completed) {
          count.completed += 1;
        } else {
          count.active += 1;
        }
        return count;
      },
      { active: 0, completed: 0 }
    );
  }
);
