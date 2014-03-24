var _ = require( 'underscore' ),
    express = require( 'express' ),
    path = require( 'path' );

function MPWebServer( config ) {
    var config = _.defaults( config, {
    } );
    var app = this.app = express();

    this.server = app.listen( this.port, function() {
        console.log( "MakerPass Web Server listening on port " + this.port );
    } );
    this.io = require( 'socket.io' ).listen( this.server );
    this.sockets = this.io.sockets;
    
    var views = this.views || path.resolve( this.dir || './', 'views' );
    app.set( 'views', views );
    app.set( 'view engine', 'jade' );
    if ( this.debug ) {
        app.set( 'showStackErrors', 'true' );
    }

    //app.disable( 'etag' );

    var public = this.public || path.resolve( this.dir, 'public' );
    var favicon = this.favicon || path.resolve( this.public, 'favicon.ico' );
    var logger = this.logger || 'dev';
    app.use( express.favicon( favicon ) );
    app.use( express.logger( logger ) );
    app.use( express.static( public ) );
    app.use( express.static( path.resolve( this.dir, 'bower_components' ) ) );

    app.use( express.bodyParser() );
    app.use( express.methodOverride() );

    app.use( app.router );
 
    app.use( express.errorHandler() );
 
    app.get( '/', function( req, res ) {
        res.render( 'index', {
            interfaces  : makerpass.interfaces,
            unclaimed   : _.filter( makerpass.nodes, function( node ) {
                return ! node.interface;
            } ),
        } );
    } );
    app.get( '/nodes', function( req, res ) { res.render( 'nodes' ); } );
    app.get( '/node/:id', function( req, res ) {
        var node = makerpass.node( req.params.id );
        res.render( 'node', { node : node } );
    } );

    var self = this;
    self.sockets.on( 'connection', function ( socket ) {
        console.log( 'new connection' );
        socket.emit( 'message', '* IDENT' );
        /*
        socket.on( 'send', function ( data ) {
            self.sockets.emit( 'message', data );
        } );
        */
    } );
};
module.exports = MPWebServer;
