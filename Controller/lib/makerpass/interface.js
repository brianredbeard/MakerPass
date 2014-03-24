var _ = require( 'underscore' ),
    EventEmitter = require( 'events' ).EventEmitter,
    util = require( 'util' );

function MPInterface( config ) {
    if ( typeof config === 'string' ) config = { type : config };
    EventEmitter.call( this, config );

    // figure out the interface type
    var type = config.type;
    if ( ! type ) throw new Error( "No type specified for MPInterface" );
    type = type.toLowerCase();

    // load the type-specific mixin
    var mixin = require( './interface/' + type );
    _.extend( this, mixin, config );

    // find the defaults
    _.defaults( this, mixin.defaults, {
        // local defaults to be added here
    } );

    // override things that shouldn't be configured
    _.extend( this, {
        buffer              : '',
        status              : 'stopped',
        lastMessageTime     : 0,
        totalMessages       : 0,
        nodes               : {},
    } );

    // initialize
    this.initialize();
};
util.inherits( MPInterface, EventEmitter );
module.exports = MPInterface;

MPInterface.prototype.toJSON = function toJSON() {
    return { id : this.id };
    return _.pick( this,
        'type', 'name', 'desc', 'status', 'lastMessageTime',
        'totalMessages'
    );
};

MPInterface.prototype.claimnode = function claimnode( node ) {
    this.nodes[ node.id ] = node;
    node.interface = this;
};

MPInterface.prototype.node = function node( id ) {
  return _.find( this.nodes, function( node ) {
      return node.id == id || node.name == id;
  } );
};

MPInterface.prototype.send = function send( target, message ) {
    if ( ~ target.indexOf( '*' ) ) {
        console.log( 'wildcard! (in interface)' );
    } else {
    }
};


MPInterface.prototype.onData = function onData( data ) {
    console.log( 'data: ' + data );
};

MPInterface.prototype.onClose = function onClose( ) {
    console.log( 'stream closed' );
};

MPInterface.prototype.onError = function onError( err ) {
    console.log( 'onError: %j', err );
    this.seterror( err );
};

MPInterface.prototype.seterror = function seterror( err ) {
    this.error = err;
    this.status = 'error';
};

MPInterface.prototype.start = function start() {
    try {
        this.openstream();
        this.status = 'running';
    } catch ( err ) {
        this.seterror( err );
    }
};

MPInterface.prototype.getname = function getname() {
    return this.type + ' Interface';
};

MPInterface.prototype.initialize = function initialize() {
};
