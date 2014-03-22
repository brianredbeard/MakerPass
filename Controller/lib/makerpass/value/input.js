var _ = require( 'underscore' ),
    util = require( '../util' );

var MPInput = module.exports = util.emitter( 'MPInput', [
    'id', 'pin', 'value', 'state', 'lastchanged'
] );

MPInput.prototype.init = function init() {
    this.id = this.pin;
    this.value = null;
};

// .id
// .pin
// .value -- 0-1023
// .state -- on(value=1023)/off(value=0)/analog(1>value<1023)
// .lastchanged
