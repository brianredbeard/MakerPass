var _ = require( 'underscore' ),
    Tail = require( 'tail' );

exports.defaults = {
    path        : '/tmp/makerpass-interface-data',
};

exports.openstream = function openstream() {
    var self = this;
    var tail = new Tail( self.path );
    tail.on( 'line', self.onData, self );
    tail.on( 'error', self.onError, self );
};

exports.write = function write( string ) {
    this.port.write( string + "\n", function( err, results ) {
        console.log( 'err: ' + err );
        console.log( 'results: ' + results );
    } );
};

exports.name = function name() { return 'Serial Interface on ' + this.path; };
