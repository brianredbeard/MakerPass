var _ = require( 'underscore' );

function MPInput( config ) {
    _.extend( this, config );
    this.id = this.pin;
    this.value = null;
};
// .id
// .pin
// .value -- 0-1023
// .state -- on(value=1023)/off(value=0)/analog(1>value<1023)
// .lastchanged
module.exports = MPInput;
