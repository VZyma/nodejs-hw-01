import fs from 'node:fs/promises';
import { createFakeContact } from '../utils/createFakeContact.js';
import { PATH_DB } from '../constants/contacts.js';

const readContacts = async () => {
  try {
    const data = await fs.readFile(PATH_DB, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    throw new Error(error);
  }
};

const writeContacts = async (contacts) => {
  try {
    await fs.writeFile(PATH_DB, JSON.stringify(contacts, null, 2), 'utf-8');
  } catch (error) {
    throw new Error(error);
  }
};

const generateContacts = async (number) => {
  try {
    const contacts = await readContacts();

    const newContacts = await Promise.all(
      Array.from({ length: number }, () => createFakeContact())
    );

    contacts.push(...newContacts);
    await writeContacts(contacts);
  } catch (error) {
    console.error('Error generating contacts:', error);
    throw new Error(error);
  }
};

generateContacts(5);
