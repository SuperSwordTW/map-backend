const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/feedback', (req, res) => {
    const newFeedback = req.body;
    console.log('Received feedback:', newFeedback);

    const filePath = './feedbacks.json';

    // Read existing file or create empty array
    fs.readFile(filePath, (err, data) => {
        let json = [];
        if (!err && data.length > 0) {
            json = JSON.parse(data);
        }
        
        json.push(newFeedback);

        // Save back to file
        fs.writeFile(filePath, JSON.stringify(json, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).send('Error saving feedback');
            }
            res.status(200).send({ status: 'success' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Feedback server running at http://localhost:${PORT}`);
});