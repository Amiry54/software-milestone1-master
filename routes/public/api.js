const db = require('../../connectors/DB'); // Ensure this path is correct

function handlePublic(app) {
    // Public route to fetch all equipment
    app.get('/equipment', async (req, res) => {
        try {
            // Query the database for all equipment
            const result = await db.raw('SELECT * FROM "public"."equipments"');
            res.json(result.rows); // Return the rows as JSON
            console.log('Equipment data fetched successfully');
        } catch (err) {
            console.error('Error fetching equipment data:', err.message);
            res.status(500).send('Internal Server Error');
        }
    });
}

module.exports = { handlePublic }; // Correct export syntax
