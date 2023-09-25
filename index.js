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
        console.log("Список контактов");
        console.log(contacts);
      });
      break;

    case "get":
      getContactsById(id).then((contacts) => {
        if (contacts) {
          console.log(`Контакт с ID:${id}`);
          console.log(contacts);
        } else {
          console.error("Нету такого контакта");
        }
      });
      break;

    case "add":
      addContact(name, email, phone).then((newContact) => {
        console.log("Добавлен новый контакт");
        console.log(newContact);
      });
      break;

    case "remove":
      removeContact(id.toString()).then((removedContact) => {
        if (removedContact) {
          console.log(`Удаленый контакт с ID:${id}`);
          console.log(removedContact);
        } else {
          console.error("Нету такого контакта");
        }
      });
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction({ action, id, name, email, phone });
