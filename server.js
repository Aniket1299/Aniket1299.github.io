const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

const users = [];

app.use(bodyParser.json());

//linking html
app.use(bodyParser.json());
app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, 'index.html');
    res.sendFile(indexPath);
});

app.use(bodyParser.json());



// Endpoint to store or update user details
app.post('/api/storeUserDetails', (req, res) => {
    const { firstName, lastName } = req.body;

    // Update the user data in the users array
    users.length = 0; // Clear the array
    users.push({ firstName, lastName }); // Push the new data

    // Save the updated user data to a JSON file
    saveUserDataToJson(users);

    res.json({ message: 'User details updated successfully' });
});

// Endpoint to retrieve user details via API
app.get('/api/getUserDetails', (req, res) => {
    // Retrieve user data from the JSON file
    const userData = retrieveUserDataFromJson();
    if (userData.length === 0) {
        res.status(404).json({ message: 'User not found' });
    } else {
        res.json(userData[0]); // Assuming there is only one user in the array
    }
});

function saveUserDataToJson(data) {
    const filePath = path.join(__dirname, 'userData.json');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

function retrieveUserDataFromJson() {
    const filePath = path.join(__dirname, 'userData.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    try {
        const userData = JSON.parse(rawData);
        return userData;
    } catch (error) {
        console.error('Error parsing JSON data:', error);
        return [];
    }
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});