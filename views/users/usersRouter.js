const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/create', (req, res) => {
    res.sendFile(path.join(__dirname + '/create.html'));
});

router.get('/view', (req, res) => {
    res.sendFile(path.join(__dirname + '/view.html'));
})

module.exports = router;