const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(__dirname, '..', 'logs', 'analytics.log');

const writeLog = (logEntry) => {
    const line = JSON.stringify(logEntry) + '\n';

    fs.appendFile(LOG_FILE, line, (err) => {
        if (err) {
            console.error('Failed to write log:', err.message);
        }
    });
};

module.exports = { writeLog };