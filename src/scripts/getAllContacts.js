import fs from 'node:fs/promises';
import { PATH_DB } from '../constants/contacts.js';

export const getAllContacts = async () => {
  try {
    const data = await fs.readFile(PATH_DB, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // Если файл не существует, возвращаем пустой массив
    if (error.code === 'ENOENT') {
      return [];
    }
    throw new Error(error);
  }
};

(async () => {
  try {
    const contacts = await getAllContacts();
    console.log(contacts);
  } catch (error) {
    console.error('Error getting contacts:', error);
  }
})();
console.log(await getAllContacts());
