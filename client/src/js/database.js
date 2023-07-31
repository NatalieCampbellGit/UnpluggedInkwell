import { openDB } from 'idb';

// Function to initialize the 'jate' database and define its schema
const initdb = async () =>
// Create a new database named 'jate' which will be using version 1 of the database
  openDB('jate', 1, {
    // Add our database schema if it has not already been initialized
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // Create a new object store for the data and give it an key name of 'id' which needs to increment automatically
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

//! Add logic to a method that accepts some content and adds it to the database
// The putDb function takes "content" as a parameter to be stored in the database
export const putDb = async (content) => {
  try {
    // Create a connection to the jate database and version we want to use
    const jateDb = await openDB('jate', 1);
    // Create a new transaction and specify the jate database and data privileges
    const tx = jateDbdb.transaction('jate', 'readwrite');
    // Open up the desired object store.
    const store = tx.objectStore('jate');
    // the store.add() method adds the content, as an object, in the database
    await store.add({ content }); //the content parameter contains the data that you want to save in the database, and it will be stored in the jate object store.
    await tx.done; //wait for the tx transaction to complete before moving on
    // Get confirmation of the request
  } catch (error) {
    console.error('putDb not implemented');
  }
};


//! Add logic for a method that gets all the content from the database
// Export a function we will use to GET to the database
export const getDb = async () => {
  try {
     // Create a connection to the jate database and version we want to use
    const jateDb = await openDB('jate', 1);
    // Create a new transaction and specify the jate database and data privileges
    const tx = jateDb.transaction('jate', 'readonly');
    // Open up the desired object store
    const store = tx.objectStore('jate');
     // Use the .getAll() method to get all jate data in the database
    return await store.getAll();
    // Get confirmation of the request
  } catch (error) {
    console.error('getDb not implemented');
    return [];
  }
};

initdb();
