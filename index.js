"use strict";

import {
  listContact,
  getContactsById,
  removeContact,
  addContact,
} from "./contacts.js";
import { Command } from "commander";

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const { action, id, name, email, phone } = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContact().then((contacts) => {
        console.table(contacts);
      });
      break;

    case "get":
      getContactsById(id).then((contacts) => {
        console.log(contacts);
      });
      break;

    case "add":
      addContact(name, email, phone).then((newContact) => {
        console.log(newContact);
      });
      break;

    case "remove":
      removeContact(id.toString()).then((removedContact) => {
        console.log(removedContact);
      });
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction({ action, id, name, email, phone });
