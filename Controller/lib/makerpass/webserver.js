var _ = require( 'underscore' ),
    express = require( 'express' ),
    path = require( 'path' );

function WebServer( makerpass ) {
    var dir = this.dir = makerpass.dir || path.dirname( require.main.filename );
    var port = this.port = makerpass.dir || 3000;

    var app = this.app = express();

    this.server = app.listen( port, function() {
        console.log( "MakerPass Web Server listening on port " + port );
    } );
    this.io = require( 'socket.io' ).listen( this.server );
    this.sockets = this.io.sockets;

    app.set( 'views', path.join( dir, 'views' ) );
    app.set( 'view engine', 'jade' );
    app.set( 'showStackErrors', 'true' );

    //app.disable( 'etag' );

    app.use( express.favicon( path.join( dir, 'public', 'favicon.ico' ) ) );
    app.use( express.logger( 'dev' ) );
    app.use( express.static( path.join( dir, 'public' ) ) );
    app.use( express.static( path.join( dir, 'bower_components' ) ) );

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
        res.render( 'node', {
            node        : node
            // debug       : JSON.stringify( node ),
        } );
    } );

    var self = this;
    self.sockets.on( 'connection', function ( socket ) {
        socket.emit( 'message', { message : 'welcome to the chat' } );
        socket.on( 'send', function ( data ) {
            self.sockets.emit( 'message', data );
        } );
    } );
};
module.exports = WebServer;
