const express = require('express');
const router = express.Router();

router.get('/students', (req, res) => {
    // simulate some processing delay, so response time varies
    const delay = Math.floor(Math.random() * 300);

    setTimeout(() => {
        res.status(200).json({
            students: [
                { name: "Vaibhavi", roll: 2408039 },
                { name: "Shweta", roll: 2408038 }
            ]
        });
    }, delay);
});

module.exports = router;