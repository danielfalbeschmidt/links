const Joi = require('joi');
const shortid = require('shortid');
const links = require('../models/links');
const { response } = require('../app');


const linkSchema = Joi.object({
//  name: Joi.string().required().min(1),
  url: Joi.string().required().min(1)
});


const getAllLinks = async (req, res) => {
  try {
      const response = await links.findAllLinks(); // Assuming a function findAllLinks() retrieves all items

      if (!response || response.length === 0) { // Check if response is empty
          return res.status(404).json({ message: "No items found" });
      }

      res.json(response); // Return all items
  } catch (error) {
      console.error(error); // Log the error for debugging purposes
      res.status(500).json({ message: "Something went wrong" });
  }
};


const getLinkById = async (req, res) => {
  try {
      const id = parseInt(req.params.id);
      const response = await links.findLinkById(id);

      if (!response) { // Assuming findLinkById returns null if item is not found
          return res.status(404).json({ message: "Item not found" });
      }

      res.json(response); // Assuming findLinkById returns the single item directly
  } catch (error) {
      console.error(error); // Log the error for debugging purposes
      res.status(500).json({ message: "Something went wrong" });
  }
};

const generateShortUrl = async (originalUrl) => {
    return shortid.generate();
};

const createLink = async (req, res) => {
  try {
      const { error } = linkSchema.validate(req.body);

      if (error) {
        res.status(400).json({message: error.details[0].message});
        return;
    }

    const existingLink = await links.findLinkByOriginalUrl(req.body.url);

    if (existingLink) {
      // If the link already exists, return the existing shortened URL
      return res.status(200).json(existingLink);
    }

    const shortUrl = await generateShortUrl(req.body.url); // Generate short URL first


      const link = {
        //  name: req.body.name,
          originalUrl: req.body.url,
          shortUrl: shortUrl,
          workingLink: `http://localhost:5000/${shortUrl}`
      };

      // Create new link in the database
      const response = await links.createNewLink(link);

      // Check if insertion was successful
      if (response.acknowledged && response.insertedId) {
          // Get the inserted document's ID
          const id = response.insertedId;

          // Retrieve the added link from the database
          const addedLink = await links.findLinkById(id);

          // Respond with the added link
          res.json({addedLink});
      } else {
          // If insertion failed, respond with an error
          res.status(500).json({ message: "Could not add the link" });
      }
  } catch (error) {
      // Handle any errors that occur during insertion
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
  }
};

const emptyDatabase = async (req, res) => {
    try {
        const response = await links.emptyDatabase();
        if (!response) {
            return res.status(404).json({ message: "Database already empty" });
        }
        res.json({ message: "Database emptied successfully" });
    } catch (error) {
        console.error("Error emptying database:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

const redirectToOriginalUrl = async (req, res) => {
    try {
      const shortUrl = req.params.shortUrl;
      const { originalUrl } = await links.findLinkByShortUrl(shortUrl);

    //  console.log("Original URL: " + originalUrl);
    //  console.log("Short URL: " + shortUrl);

      if (originalUrl) {
        res.redirect(originalUrl);
      } else {
        res.status(404).json({ message: "Short URL not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };


module.exports = {
    getLinkById,
    createLink,
    getAllLinks,
    redirectToOriginalUrl,
    emptyDatabase
}
