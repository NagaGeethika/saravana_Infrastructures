const express = require('express');
const { Pool } = require('pg'); // Import PostgreSQL client
const bcrypt = require('bcryptjs'); // For password hashing
const jwt = require('jsonwebtoken'); // For JSON Web Tokens
const dotenv = require('dotenv'); // To load .env file
const cors = require('cors'); // To allow cross-origin requests from React
const { stringify } = require('csv-stringify'); // To generate CSV for export

// Load environment variables from .env file
dotenv.config();

// --- TEMPORARY DEBUG: Check if JWT_SECRET is loaded ---
console.log('DEBUG: JWT_SECRET loaded:', process.env.JWT_SECRET ? 'YES' : 'NO', '(Value not shown for security)');
// --- END TEMPORARY DEBUG ---

const app = express();
const port = process.env.PORT || 5000; // Use port from .env or default to 5000

// --- PostgreSQL Connection Pool ---
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: false // Disable SSL for local connection
});

// Test DB connection on server startup
pool.connect((err, client, done) => {
    if (err) {
        console.error('Failed to connect to PostgreSQL database:', err.stack);
        process.exit(1); // Exit process if DB connection fails
    }
    console.log('Successfully connected to PostgreSQL database!');
    client.release(); // Release the client back to the pool immediately
});

console.log('DEBUG: After DB connection check.'); // Diagnostic log

// --- Express Middleware ---
app.use(cors()); // Enable CORS for all routes (important for React frontend)
app.use(express.json()); // Body parser middleware to parse JSON request bodies

console.log('DEBUG: After Express middleware setup.'); // Diagnostic log

// --- Database Table Creation Function (Commented out call) ---
async function createContactMessagesTable() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS contact_messages (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                mobile VARCHAR(20),
                message TEXT,
                submission_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('Database table "contact_messages" ensured (created if not exists).');
    } catch (err) {
        console.error('Error creating database table:', err.stack);
    }
}
// createContactMessagesTable(); // This line remains commented out as the table exists

// --- API Endpoint for Admin Login ---
app.post('/api/admin/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }

    try {
        const userResult = await pool.query('SELECT * FROM admin_users WHERE username = $1', [username]);
        const adminUser = userResult.rows[0];

        if (!adminUser) {
            return res.status(401).json({ error: 'Invalid username or password.' });
        }

        const isPasswordValid = await bcrypt.compare(password, adminUser.password_hash);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password.' });
        }

        const token = jwt.sign(
            { id: adminUser.id, username: adminUser.username },
            process.env.JWT_SECRET, // <--- This needs to be correctly loaded from .env
            { expiresIn: '1h' }
        );

        console.log(`Admin user '${username}' logged in successfully.`);
        res.status(200).json({ message: 'Login successful', token: token });

    } catch (error) {
        console.error('Admin login error:', error.stack);
        res.status(500).json({ error: 'An error occurred during login.' });
    }
});

console.log('DEBUG: After Admin Login endpoint setup.'); // Diagnostic log

// --- JWT Authentication Middleware ---
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        console.warn('Authentication failed: No token provided.');
        return res.status(401).json({ error: 'Authentication failed: No token provided.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => { // <--- This also needs JWT_SECRET
        if (err) {
            console.warn('Authentication failed: Invalid or expired token.');
            return res.status(403).json({ error: 'Authentication failed: Invalid or expired token.' });
        }
        req.user = user;
        next();
    });
}

console.log('DEBUG: After authenticateToken middleware definition.'); // Diagnostic log

// --- API Endpoint for Form Submission ---
app.post('/api/contact-submissions', async (req, res) => {
    const { name, email, mobile, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, Email, and Message are required fields.' });
    }
    if (!email.includes('@') || !email.includes('.')) {
            return res.status(400).json({ error: 'Invalid email format.' });
    }

    try {
        const queryText = `
            INSERT INTO contact_messages (name, email, mobile, message)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        const values = [name, email, mobile, message];
        const result = await pool.query(queryText, values);

        console.log('New contact message saved:', result.rows[0]);
        res.status(201).json({
            message: 'Your message has been sent successfully!',
            data: result.rows[0]
        });

    } catch (error) {
        console.error('Error saving contact message to database:', error.stack);
        res.status(500).json({ error: 'Failed to send message. Please try again later.' });
    }
});

console.log('DEBUG: After Contact Submissions endpoint setup.'); // Diagnostic log

// --- API Endpoint for Excel (CSV) Export ---
// Now protected by JWT authentication
app.get('/api/export-contacts', authenticateToken, async (req, res) => {
    try {
        const result = await pool.query('SELECT name, email, mobile, message, submission_timestamp FROM contact_messages ORDER BY submission_timestamp DESC');
        const data = result.rows;

        if (data.length === 0) {
            return res.status(404).json({ message: 'No contact submissions found to export.' });
        }

        const columns = [
            { key: 'name', header: 'Name' },
            { key: 'email', header: 'Email' },
            { key: 'mobile', header: 'Mobile Number' },
            { key: 'message', header: 'Message' },
            { key: 'submission_timestamp', header: 'Submission Time' }
        ];

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename="shanvika_contact_submissions_${Date.now()}.csv"`);

        stringify(data, { header: true, columns: columns })
            .pipe(res)
            .on('finish', () => console.log('CSV export stream finished.'));

    } catch (error) {
        console.error('Error during CSV export:', error.stack);
        res.status(500).json({ error: 'Failed to export data.' });
    }
});

console.log('DEBUG: After Export Contacts endpoint setup.'); // Diagnostic log

// --- Start the Server ---
app.listen(port, () => {
    console.log(`Shanvika Backend Server running on http://localhost:${port}`);
});

console.log('DEBUG: Server listen function called.'); // Diagnostic log