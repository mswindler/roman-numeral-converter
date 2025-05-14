const promClient = require('prom-client');

// Create a Registry
const register = new promClient.Registry();

// Add a default label which is added to all metrics
promClient.collectDefaultMetrics({
    register,
    prefix: 'roman_numeral_'
});

// Create custom metrics
const httpRequestDurationMicroseconds = new promClient.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'status_code'],
    buckets: [0.1, 0.5, 1, 2, 5]
});

const conversionCounter = new promClient.Counter({
    name: 'roman_numeral_conversions_total',
    help: 'Total number of Roman numeral conversions'
});

const conversionErrorCounter = new promClient.Counter({
    name: 'roman_numeral_conversion_errors_total',
    help: 'Total number of Roman numeral conversion errors'
});

// Register custom metrics
register.registerMetric(httpRequestDurationMicroseconds);
register.registerMetric(conversionCounter);
register.registerMetric(conversionErrorCounter);

// Middleware to track request duration
const metricsMiddleware = (req, res, next) => {
    const start = process.hrtime();

    res.on('finish', () => {
        const duration = process.hrtime(start);
        const durationInSeconds = duration[0] + duration[1] / 1e9;

        httpRequestDurationMicroseconds
            .labels(req.method, req.route?.path || req.path, res.statusCode)
            .observe(durationInSeconds);
    });

    next();
};

module.exports = {
    register,
    metricsMiddleware,
    conversionCounter,
    conversionErrorCounter
}; 