const express = require('express');
const path = require('path');
const fs = require('fs');
const Ajv = require('ajv');
const ajv = new Ajv();

const app = express();
const publicDir = path.join(__dirname, 'public');

app.use(express.json());


// Helper: check if file exists
const fileExists = (filePath) => fs.existsSync(filePath) && fs.statSync(filePath).isFile();

// Redirect /index.html -> /
app.use((req, res, next) => {
	if (req.path === '/index.html') return res.redirect(307, '/');
	next();
});

// Redirect /something.html -> /something
app.use((req, res, next) => {
	if (req.path.endsWith('.html')) {
		const htmlFile = path.join(publicDir, req.path);
		if (fileExists(htmlFile)) {
			const cleanPath = req.path.slice(0, -5) || '/';
			return res.redirect(307, cleanPath);
		}
	}
	next();
});

// Redirect /path/ -> /path (drop trailing slash)
app.use((req, res, next) => {
	if (req.path !== '/' && req.path.endsWith('/')) {
		const cleanPath = req.path.slice(0, -1);
		const htmlFile = path.join(publicDir, cleanPath + '.html');
		const indexFile = path.join(publicDir, cleanPath, 'index.html');
		if (fileExists(htmlFile) || fileExists(indexFile)) {
			return res.redirect(307, cleanPath);
		}
	}
	next();
});

// Serve HTML for clean paths
app.use((req, res, next) => {
	if (req.path.startsWith('/api')) return next();

	let cleanPath = req.path.replace(/\/$/, '');

	const htmlFile = path.join(publicDir, cleanPath + '.html');
	const indexFile = path.join(publicDir, cleanPath, 'index.html');

	if (fileExists(htmlFile)) return res.sendFile(htmlFile);
	if (fileExists(indexFile)) return res.sendFile(indexFile);

	next(); // let static middleware or 404 handle
});

// Serve static assets
app.use(express.static(publicDir));

// Load JSON schema from file
const schemaPath = path.join(__dirname, 'schemas', 'sendmsg-request.json');
const sendMsgSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

// Compile schema
const validateSendmsg = ajv.compile(sendMsgSchema);

app.post('/api/sendmsg', (req, res) => {
	const data = req.body;

	if (!data || typeof data !== 'object') {
		return res.json({ success: false, errmsg: 'No JSON body received' });
	}

	// Validate schema
	const valid = validateSendmsg(data);
	if (!valid) {
		return res.json({ success: false, errmsg: ajv.errorsText(validateSendmsg.errors) });
	}

	// Safely access sender email
	const email = data.sender?.['reply-to'];
	if (!email || typeof email !== 'string') {
		return res.json({ success: false, errmsg: 'Invalid sender email' });
	}

	// Only allow @example.com
	if (!email.endsWith('@example.com')) {
		return res.json({ success: false, errmsg: 'Only @example.com emails allowed' });
	}

	// Simulate sending message
	console.log('Sending message:', data);

	res.json({ success: true });
});

// Mock available times per date
const sampleTimes = [
	{ from: "09:00", to: "09:30", available: true },
	{ from: "10:00", to: "10:30", available: false },
	{ from: "11:00", to: "11:30", available: true },
	{ from: "12:00", to: "12:30", available: true }
];

// Query date
app.post('/api/query-date', (req, res) => {
	// In real app, check DB for availability
	res.json({ success: true, "free-times": sampleTimes });
});

// Make appointment
app.post('/api/make-appointment', (req, res) => {
	if (!req.body || typeof req.body !== 'object') {
		return res.json({ success: false, errmsg: 'No JSON body received' });
	}

	const { name, email, date, time } = req.body;
	const favcolor = req.body["fav-color"]; // safer access

	// Validate missing fields
	if (!name || !email || !date || !time || !favcolor) {
		return res.json({ success: false, errmsg: 'Hiányzó mezők' });
	}

	// simple email validation
	const emailParts = email.split('@');
	if (emailParts.length !== 2 || emailParts[0].length === 0 || emailParts[1].length === 0) {
		return res.json({ success: false, errmsg: 'Érvénytelen email' });
	}

	console.log('New appointment:', { name, email, date, time, favcolor });

	res.json({ success: true });
});


// 404 fallback
app.use((req, res) => res.status(404).send('404 Not Found'));

app.listen(8080, () => console.log('Server running at http://localhost:8080'));
