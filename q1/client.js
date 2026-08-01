const http = require('http');

const callStudentAPI = () => {
    const start = Date.now();

    http.get('http://localhost:3000/students', (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            const responseTime = Date.now() - start;
            console.log(`Student API responded in ${responseTime}ms`);

            sendAnalytics('Student API', responseTime);
        });
    }).on('error', (err) => {
        console.error('Error calling Student API:', err.message);
    });
};

const sendAnalytics = (apiName, responseTime) => {
    const payload = JSON.stringify({
        apiName: apiName,
        ResponseTime: responseTime
    });

    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/analytics',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(payload),
            'client-id': 'client-web-app',
            'environment': 'production'
        }
    };

    const req = http.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            console.log('Analytics recorded:', data);
        });
    });

    req.on('error', (err) => {
        console.error('Error sending analytics:', err.message);
    });

    req.write(payload);
    req.end();
};

callStudentAPI();
