const express = require('express');
const cors = require('cors');
const { requestLogger } = require('./middleware/logger');
const { metricsMiddleware, register } = require('./middleware/metrics');
const { tracingMiddleware } = require('./middleware/tracing');
const romanNumeralRouter = require('./routes/romanNumeral');

const app = express();
const port = process.env.PORT || 8080;

// Enable CORS
app.use(cors());

// Apply middleware
app.use(requestLogger);
app.use(metricsMiddleware);
app.use(tracingMiddleware);

// Routes
app.use('/', romanNumeralRouter);

// Metrics endpoint
app.get('/metrics', async (req, res) => {
    try {
        res.set('Content-Type', register.contentType);
        res.end(await register.metrics());
    } catch (err) {
        res.status(500).end(err);
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'healthy' });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 