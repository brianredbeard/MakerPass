#!/usr/bin/env node

var makerpass = require( './lib/makerpass' ),
    path = require( 'path' );

// To change the port the webserver listens on
// makerpass.webport = 3100;

// To manually load config (will happen automatically if you don't)
// makerpass.loadconfig( path.join( __dirname, '/config' ) );

// start the application
makerpass.start();
