var _ = require( 'underscore' ),
    EventEmitter = require( 'events' ).EventEmitter,
    glob = require( 'glob' ),
    path = require( 'path' ),
    yaml = require( 'js-yaml' ),
    fs = require( 'fs' ),
    glob = require( 'glob' ),
    MPNode = require( './makerpass/node' ),
    MPInterface = require( './makerpass/interface' ),
    MPWebServer = require( './makerpass/webserver' );

var makerpass = exports;

makerpass.configloaded = false;
makerpass.appdir = path.dirname( require.main.filename );

var nodes = makerpass.nodes = [];

makerpass.addnode = function addnode( cfg ) {
    var node = new MPNode( cfg );
    nodes.push( node );
    /*
    if ( typeof node.interface == 'string' ) {
        node.interface = makerpass.interface( node.interface );
    }
    */
    return node;
};

makerpass.node = function node( id ) {
    return _.find( nodes, function( node ) {
        return node.id == id || node.name == id;
    } );
};

var interfaces = makerpass.interfaces = [];

makerpass.addinterface = function addinterface( cfg ) {
    var iface = new MPInterface( cfg );

    iface.on( "message", function( message ) {
        console.log( 'message: ', message );
    } );
    iface.on( "error", function( err ) {
        console.error( err );
    } );

    iface.idx = interfaces.length;
    iface.name = iface.getname();

    interfaces.push( iface );
};

makerpass.interface = function interface( id ) {
    return _.find( interfaces, function( int ) {
        return int.id == id;
    } ) || _.find( interfaces, function( int ) {
        return int.name == id;
    } ) || _.find( interfaces, function( int ) {
        return int.type == id;
    } );
};

makerpass.loadconfig = function loadconfig( dir ) {
    if ( ! dir ) dir = path.join( makerpass.appdir, 'config' );

    _.each( glob.sync( path.join( dir, 'interface*.yml' ) ), function( file ) {
        var str = fs.readFileSync( file, 'utf8' );
        yaml.safeLoadAll( str, makerpass.addinterface );
    } );

    _.each( glob.sync( path.join( dir, 'node*.yml' ) ), function( file ) {
        var str = fs.readFileSync( file, 'utf8' );
        yaml.safeLoadAll( str, makerpass.addnode );
    } );

    _.each( makerpass.interfaces, function ( interface ) {
        if ( typeof interface.MPinit === 'function' ) {
            interface.MPinit( makerpass );
        }
    } );

    _.each( makerpass.nodes, function( node ) {
        if ( typeof node.MPinit === 'function' ) {
            node.MPinit( makerpass );
        }
    } );

    _.each( makerpass.nodes, function( node ) {
        if ( typeof node.interface === 'string' ) {
            var iface = makerpass.interface( node.interface );
            if ( iface ) iface.claimnode( node );
        }
    } );

    return makerpass.configloaded = true;
};

makerpass.webport = 3000;

makerpass.start = function start() {
    if ( ! makerpass.configloaded ) makerpass.loadconfig();
    _.each( interfaces, function( iface ) { iface.start(); } );
    makerpass.webserver = new MPWebServer( makerpass );
};
