var _ = require( 'underscore' ),
    nodeutil = require( 'util' ),
    EventEmitter = require( 'events' ).EventEmitter;

// re-export some things from the regular nodejs util module
exports.inherits = nodeutil.inherits;

// create properties that fire events when their value changes
exports.mkattrs = function mkattrs( obj, names ) {
    _.each( names, function( name ) {
        Object.defineProperty( obj, name, {
            enumerable  : true,
            get         : function() { 
                return this[ '_' + name ];
            },
            set         : function( val ) { 
                var was = this[ '_' + name ];
                this[ '_' + name ] = val;
                this.emit( 'change', name, val, was );
            },
        } );
    } );
};

// make an object inherit from EventEmitter
exports.emitter = function emitter( name, attrs ) {
    var ctor = function( config ) {
        _.extend( this, config );
        this.init();
    };
    ctor.name = name;
    nodeutil.inherits( ctor, EventEmitter );
    exports.mkattrs( ctor.prototype, attrs );
    return ctor;
};
