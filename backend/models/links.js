const { MongoClient, ObjectId } = require('mongodb');


const uri = 'mongodb://localhost:27017';

const client = new MongoClient(uri);

const links = {


    findAllLinks: async () => {
      try {
        // Connect to the MongoDB server
        await client.connect();
        console.log('Connected to MongoDB');

        // Access your MongoDB database and collection
       // const database = client.db('testingDb');
       const database = client.db('links');
        const collection = database.collection('links');

        // Find all items in the collection
        const result = await collection.find().toArray();

        return result;
    } catch (error) {
        throw new Error(error);
    } finally {
        // Close the connection
        await client.close();
        console.log('MongoDB connection closed');
    }
    },

    findLinkById: async(id) => {

        try {
            // Connect to the MongoDB server
            await client.connect();
            console.log('Connected to MongoDB');

            // Access your MongoDB database and collection
           // const database = client.db('testingDb');
           const database = client.db('links');
            const collection = database.collection('links');

            // Construct a query to search by ID
            const query = { _id: id };

            // Search for an item with the specified ID
            const result = await collection.findOne(query);

            return result;
          } catch (error) {
            throw new Error(error);
          } finally {
            // Close the connection
            await client.close();
            console.log('MongoDB connection closed');
          }

    },
    createNewLink: async(link) => {
        try {
            // Connect to the MongoDB server
            await client.connect();
            console.log('Connected to MongoDB');

            // Access your MongoDB database and collection
          //  const database = client.db('testingDb');
          const database = client.db('links');
            const collection = database.collection('links');

            // Insert the new item into the collection
            const result = await collection.insertOne(link);

            return result;
          } catch (error) {
            throw new Error(error);
          } finally {
            // Close the connection
            await client.close();
            console.log('MongoDB connection closed');
          }
    },

    findLinkByOriginalUrl: async (originalUrl) => {
      try {
        // Connect to the MongoDB server
        await client.connect();
        console.log('Connected to MongoDB');

        // Access your MongoDB database and collection
       // const database = client.db('testingDb');
       const database = client.db('links');
        const collection = database.collection('links');

        // Construct a query to search for the link by original URL
        const query = { originalUrl: originalUrl };

        // Search for a link with the specified original URL
        const result = await collection.findOne(query);
      //  console.log("original url result = " + JSON.stringify(result));

        return result;
      } catch (error) {
        console.error(error);
        throw new Error("Error finding link by original URL");
      } finally {
        // Close the connection
        await client.close();
        console.log('MongoDB connection closed');
      }
    },

    findLinkByShortUrl: async (shortUrl) => {
      try {
        // Connect to the MongoDB server
        await client.connect();
        console.log('Connected to MongoDB');

        // Access your MongoDB database and collection
      //  const database = client.db('testingDb');
      const database = client.db('links');
        const collection = database.collection('links');

        // Construct a query to search for the link by original URL
        const query = { shortUrl: shortUrl };

        // Search for a link with the specified original URL
        const result = await collection.findOne(query);
      //  console.log("short url result = " + JSON.stringify(result));

        return result;
      } catch (error) {
        console.error(error);
        throw new Error("Error finding link by short URL");
      } finally {
        // Close the connection
        await client.close();
        console.log('MongoDB connection closed');
      }
    },

    emptyDatabase: async () => {
      try {
        // Connect to the MongoDB server
        await client.connect();
        console.log('Connected to MongoDB');

        // Access your MongoDB database and collection
      //  const database = client.db('testingDb');
      const database = client.db('links');
        const collection = database.collection('links');

        // Delete all documents from the collection
        const result = await collection.deleteMany({});

      //  console.log(`${result.deletedCount} documents deleted`);

        return result.deletedCount; // Return the number of documents deleted
      } catch (error) {
        console.error('Error emptying database:', error);
        throw error; // Throw the error for handling at a higher level
      } finally {
        // Close the connection
        await client.close();
        console.log('MongoDB connection closed');
      }
    },

};

module.exports = links;