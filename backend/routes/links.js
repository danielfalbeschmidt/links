const express = require('express');

const { createLink, getLinkById, getAllLinks, emptyDatabase } = require('../controllers/links');

const router = express.Router();

router.get('/', getAllLinks);
router.get('/:id', getLinkById);


router.post('/', createLink);

router.delete('/empty', emptyDatabase);

module.exports = router;