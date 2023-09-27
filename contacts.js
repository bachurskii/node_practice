"use strict";

import fs from "fs/promises";
import path from "path";

const contactPath = path.resolve("db", "contacts.json");

export async function listContact() {
  try {
    const data = await fs.readFile(contactPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {}
}

export async function getContactsById(contactId) {
  try {
    const contacts = await listContact();
    const contact = contacts.find((contact) => contact.id === contactId);
    return contact !== undefined ? contact : null;
  } catch (error) {}
}

export async function removeContact(contactId) {
  try {
    const contacts = await listContact();
    const contactIndex = contacts.findIndex(
      (contact) => contact.id === contactId
    );
    if (contactIndex === -1) {
      return null;
    }
    const removedContact = contacts.splice(contactIndex, 1)[0];
    await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
    return removedContact;
  } catch (error) {}
}
export async function addContact(name, email, phone) {
  try {
    const contacts = await listContact();
    const newContact = {
      id: Date.now().toString(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {}
}
