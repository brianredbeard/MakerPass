#!/usr/bin/env node

var express = require( 'express' ),
    program = require( 'commander' ),
    pkginfo = require( 'pkginfo' )( module );

program.version( pkginfo.version )
    .option( '-p, --port <port>', 'Listening Port', 4000 )
    .parse( process.argv );

var app = express();
var server = app.listen( program.port );

app.use( express.logger( 'dev' ) );
app.use( express.bodyParser() );
app.use( express.methodOverride() );
app.use( app.router );
app.use( express.errorHandler() );

app.get( '/auth/:card/:task', function( req, res ) {
    console.log( 'card=%s task=%s', req.params.card, req.params.task );
    res.send( {
        user : {
            username    : 'test',
            name        : 'Test Testington',
            email       : 'test@example.com'
        },
        res     : 'OK',
        limit   : '60m',
    } );
} );

console.log( "Example Auth server listening on port " + program.port );
