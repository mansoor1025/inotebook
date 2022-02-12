const express = require('express');
const router = express.Router();

router.get('/', (req, res,) => {
    res.send('Notes working now')
})

module.exports = router;