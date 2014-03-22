var net = require('net');

// exports.path = '/tmp/fake-serial.sock';
exports.path = 8000;

exports.start = function( handler ) {
    if ( exports.server ) return;
    var server = exports.server = net.createServer( function( stream ) {
        exports.stream = stream;
        exports.write = stream.write.bind( null );
        exports.end = stream.end.bind( null );
        stream.on( 'data', handler );
        stream.on( 'end', function() { 
            console.log( 'EOF on fake-serial socket' );
            server.close();
        } );
    } ); 

    server.listen( exports.path, function() {
        console.log( "Fake serial listening on " + exports.path );
    } );
};

// var stream = net.connect('/tmp/test.sock');
// stream.write('hello');
// stream.end();

