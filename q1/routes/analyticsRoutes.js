const express = require('express');
const router = express.Router();
const { recordUsage, getSummary } = require('../services/analyticsService');

router.post('/analytics', (req, res) => {
    try {
        const clientId = req.headers['client-id'];
        const environment = req.headers['environment'];

        if (!clientId || !environment) {
            return res.status(400).json({
                error: 'Missing required headers: client-id and environment'
            });
        }

        const { apiName, ResponseTime } = req.body;

        if (!apiName || ResponseTime === undefined) {
            return res.status(400).json({
                error: 'Missing required fields: apiName and ResponseTime'
            });
        }

        const logEntry = recordUsage(clientId, environment, apiName, ResponseTime);

        res.status(201).json({
            message: 'Analytics recorded successfully',
            data: logEntry
        });

    } catch (error) {
        console.error('Error recording analytics:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/analytics/summary', (req, res) => {
    try {
        const summary = getSummary();

        res.status(200).json({
            totalRequests: summary.totalRequests,
            slowApiCount: summary.slowApiCount
        });

    } catch (error) {
        console.error('Error generating summary:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;