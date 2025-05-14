const express = require('express');
const router = express.Router();
const { convertToRoman } = require('../utils/romanNumeralConverter');
const { logger } = require('../middleware/logger');
const { conversionCounter, conversionErrorCounter } = require('../middleware/metrics');
const { tracer } = require('../middleware/tracing');

router.get('/romannumeral', async (req, res) => {
    const span = tracer.startSpan('convert_to_roman');
    
    try {
        const { query } = req.query;
        
        // Input validation
        if (!query) {
            throw new Error('Query parameter is required');
        }

        const num = parseInt(query, 10);
        
        // Add query parameter to span
        span.setAttributes({
            'roman_numeral.input': num
        });

        // Convert to Roman numeral
        const result = convertToRoman(num);
        
        // Increment success counter
        conversionCounter.inc();
        
        // Add result to span
        span.setAttributes({
            'roman_numeral.output': result
        });

        // Log success
        logger.info('Conversion successful', {
            input: num,
            output: result
        });

        // Send response
        res.json({
            input: query,
            output: result
        });
    } catch (error) {
        // Increment error counter
        conversionErrorCounter.inc();
        
        // Add error to span
        span.setAttributes({
            'error': true,
            'error.message': error.message
        });

        // Log error
        logger.error('Conversion failed', {
            error: error.message,
            query: req.query.query
        });

        // Send error response
        res.status(400).send(error.message);
    } finally {
        span.end();
    }
});

module.exports = router; 