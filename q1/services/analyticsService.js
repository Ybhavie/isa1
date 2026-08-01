const EventEmitter = require('events');
const fs = require('fs');
const path = require('path');
const { writeLog } = require('../utilities/logger');

const analyticsEmitter = new EventEmitter();
const LOG_FILE = path.join(__dirname, '..', 'logs', 'analytics.log');

analyticsEmitter.on('slowAPI', (apiName) => {
    console.log(`Warning: slow API detected - ${apiName}`);
});

const recordUsage = (clientId, environment, apiName, responseTime) => {
    const timestamp = new Date().toISOString();

    const logEntry = {
        clientId,
        environment,
        apiName,
        responseTime,
        timestamp
    };

    writeLog(logEntry);

    if (responseTime > 200) {
        analyticsEmitter.emit('slowAPI', apiName);
    }

    return logEntry;
};

const getSummary = () => {
    if (!fs.existsSync(LOG_FILE)) {
        return { totalRequests: 0, slowApiCount: 0 };
    }

    const fileContent = fs.readFileSync(LOG_FILE, 'utf-8');

    const lines = fileContent
        .split('\n')
        .filter(line => line.trim() !== '');

    let slowApiCount = 0;

    lines.forEach(line => {
        const entry = JSON.parse(line);
        if (entry.responseTime > 200) {
            slowApiCount++;
        }
    });

    return {
        totalRequests: lines.length,
        slowApiCount
    };
};

module.exports = { recordUsage, getSummary };