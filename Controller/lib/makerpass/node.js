var _ = require( 'underscore' ),
    EventEmitter = require( 'events' ).EventEmitter,
    util = require( './util' );

function MPNode( config ) {
    EventEmitter.call( this, config );
    this.objs = {};

    this.id = config.nodeid;
    this.authid = config.authid;
    this.interface = null;

    this.inputs = [];
    this.outputs = [];
    this.variables = [];
    this.events = [];

    this.lastMessageTime = 0;
    this.totalMessages = 0;
    this.lastCardScanned = '';

    _.each( config.inputs, function( cfg, which ) {
        if ( typeof cfg === 'string' ) cfg = { name : cfg };
        cfg.pin = 'INPUT' + which;
        this.addval( 'input', cfg );
    }, this );
    delete config.inputs;

    _.each( config.outputs, function( cfg, which ) {
        if ( typeof cfg === 'string' ) cfg = { name : cfg };
        cfg.pin = 'OUTPUT' + which;
        this.addval( 'output', cfg );
    }, this );
    delete config.outputs;

    _.each( config.variables, function( cfg, name ) {
        if ( typeof cfg === 'string' ) cfg = { type : cfg };
        cfg.name = name;
        this.addval( 'variable', cfg );
    }, this );
    delete config.variables;

    _.each( config.events, function( actions, event ) {
        if ( typeof actions === 'string' ) actions = [ actions ];
        this.addval( 'event', {
            event       : event,
            actions     : actions,
        } );
    }, this );
    delete config.events;

    _.extend( this, config );
};
util.inherits( MPNode, EventEmitter );
module.exports = MPNode;

util.mkattrs( MPNode, [
    'lastMessageTime', 'totalMessages', 'lastCardScanned'
] );

var typectors = {
    input       : require( './value/input' ),
    output      : require( './value/output' ),
    event       : require( './value/event' ),
    variable    : require( './value/variable' ),
};
MPNode.prototype.addval = function addval( type, config ) {
    if ( ! config ) config = {};
    if ( ! type ) throw new Error( "MPNode.addval needs a type!" );
    config.objtype = type;
    var ctor = typectors[ type ];
    if ( ! ctor ) throw new Error( "Unknown MPObject type " + type );
    var obj = new ctor( config );
    this.objs[ obj.id ] = obj;
    this[ type + 's' ].push( obj );
    return obj;
};
