import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsOps";
import css from "./ContactForm.module.css";

const ContactsForm = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !number) {
      setError("fill in the field");
      return;
    }
    const newContact = {
      id: Date.now().toString(),
      name,
      number,
    };
    dispatch(addContact(newContact));
    setName("");
    setNumber("");
    setError("");
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        className={css.field}
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className={css.field}
        type="text"
        placeholder="Phone number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      {error && <p className={css.error}>{error}</p>}
      <button className={css.btn} type="submit">
        Add Contact
      </button>
    </form>
  );
};

export default ContactsForm;
