#!/usr/bin/env node

var express = require( 'express' ),
    program = require( 'commander' );

program
    .option( '-c, --controller <url>', 'URL to MakerPass Controller' )
    .option( '-p, --port <port>', 'Web interface port' )
    .parse( process.argv );

var app = express();
var port = program.port || 3000;
var server = app.listen( port, function() {
    console.log( "MakerPass Fake Node Server listening on port " + port );
} );
var io = require( 'socket.io' ).listen( server );

app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'jade' );
app.set( 'showStackErrors', 'true' );

app.use( express.favicon() );
app.use( express.logger( 'dev' ) );
app.use( express.static( __dirname + '/bower_components' ) );
app.use( express.static( __dirname + '/public' ) );

app.use( express.bodyParser() );
app.use( express.methodOverride() );

app.use( app.router );

app.use( express.errorHandler() );

app.get( '/', function( req, res ) {
    res.render( 'fake-node' );
} );
