var fs = require('fs');
var http = require('http');
const mysql = require('mysql');

var connectionCounter = 1;

http.createServer(function(request, response) {

    if (request.url === '/') {

        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(fs.readFileSync('index.html'));
        response.end();

    } else if (request.url === '/events') {
        var thisConnection = connectionCounter++;
        var thisEvent = 1;

        console.log('Client connected to event stream (connection #' + thisConnection + ', Last-Event-Id: ' + request.headers['last-event-id'] + ')');
        response.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache' // let intermediaries know to NOT cache anything
        });

        var ticker = setInterval(function() {
            response.write('event: my-custom-event\n');
            response.write('id: ' + (thisConnection * 1000 + thisEvent) + '\n');
            response.write('data: Server says hi! (event #' + thisEvent++ +' of connection #' + thisConnection + ')\n\n');
        }, 2500);

        request.on('close', function() {
            console.log('Client disconnected from event stream (connection #' + thisConnection + ')');
            response.end();
            clearInterval(ticker);
        });

    } else if (request.url === '/learners') {
        var thisConnection = connectionCounter++;
        var thisEvent = 1;
        var mysqlConnection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'test',
            multipleStatements: true
        });
        
        console.log('Client connected to event stream (connection #' + thisConnection + ', Last-Event-Id: ' + request.headers['last-event-id'] + ')');
        response.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache' // let intermediaries know to NOT cache anything
        });

        response.write('event: my-custom-event\n');
        response.write('id: ' + (thisConnection * 1000 + thisEvent) + '\n');
        mysqlConnection.connect((err)=> {
            if(!err)
                response.write('data: MySQL Connection Established Successfully)\n\n');
            else
                response.write('data: Connection Failed!'+ JSON.stringify(err,undefined,2));
        });
        // response.write('data: Server says hi! (event #' + thisEvent++ +' of connection #' + thisConnection + ')\n\n');
        mysqlConnection.query('SELECT * FROM learnerdetails', (err, rows, fields) => {
            if (!err) {
                for (let i = 0; i < rows.length; i++) {
                    response.write('event: my-custom-event\n');
                    response.write('id: ' + (thisConnection * 1000 + thisEvent) + '\n');
                    response.write('data: ' + rows[i].learner_name + '\n\n');
                }
            }
            else {
                response.write('event: my-custom-event\n');
                response.write('id: ' + (thisConnection * 1000 + thisEvent) + '\n');
                response.write('data: ' + err);
            }
        });
        request.on('close', function() {
            console.log('Client disconnected from event stream (connection #' + thisConnection + ')');
            response.end();
        });
    } else {

        response.writeHead(404);
        response.end();

    }

}).listen(8888);
