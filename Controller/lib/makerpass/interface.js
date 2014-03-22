var _ = require( 'underscore' ),
    EventEmitter = require( 'events' ).EventEmitter,
    util = require( 'util' );

function MPInterface( config ) {
    EventEmitter.call( this, config );

    // figure out the interface type
    var type = config.type;
    if ( ! type ) throw new Error( "No type specified for MPInterface" );
    type = type.toLowerCase();

    // load the type-specific mixin
    var mixin = require( './interface/' + type );
    _.extend( this, mixin );

    // find the defaults
    var defaults = {
    };
    _.extend( this, defaults, mixin.defaults, config );

    // override things that shouldn't be configured
    this.buffer = '';
    this.status = 'stopped';
    this.lastMessageTime = 0;
    this.totalMessages = 0;
    this.nodes = {};

    // initialize
    this.initialize();
};
util.inherits( MPInterface, EventEmitter );
module.exports = MPInterface;

MPInterface.prototype.claimnode = function claimnode( node ) {
    this.nodes[ node.id ] = node;
    node.interface = this;
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
