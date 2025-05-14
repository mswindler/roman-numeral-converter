const opentelemetry = require('@opentelemetry/api');
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');

// Configure the trace exporter
const traceExporter = new OTLPTraceExporter({
    url: process.env.OTLP_ENDPOINT || 'http://localhost:4318/v1/traces',
});

// Create and configure SDK
const sdk = new NodeSDK({
    traceExporter,
    instrumentations: [getNodeAutoInstrumentations()]
});

// Initialize the SDK
sdk.start();

// Create a tracer
const tracer = opentelemetry.trace.getTracer('roman-numeral-service');

// Middleware for manual instrumentation
const tracingMiddleware = (req, res, next) => {
    const span = tracer.startSpan(`${req.method} ${req.path}`);
    
    // Add request details to span
    span.setAttributes({
        'http.method': req.method,
        'http.url': req.url,
        'http.route': req.route?.path || req.path,
    });

    // Store span in request for use in route handlers
    req.span = span;

    // End span when response is sent
    res.on('finish', () => {
        span.setAttributes({
            'http.status_code': res.statusCode,
        });
        span.end();
    });

    next();
};

// Graceful shutdown
process.on('SIGTERM', () => {
    sdk.shutdown()
        .then(() => console.log('Tracing terminated'))
        .catch((error) => console.log('Error terminating tracing', error))
        .finally(() => process.exit(0));
});

module.exports = { tracingMiddleware, tracer };
