var _ = require( 'underscore' ),
    util = require( '../util' );

var MPOutput = module.exports = util.emitter( 'MPOutput', [
    'id', 'pin', 'state', 'lastchanged'
] );

MPOutput.prototype.init = function init() {
    this.id = this.pin;
};

// .id
// .pin
// .state -- on/off
// .lastchanged
