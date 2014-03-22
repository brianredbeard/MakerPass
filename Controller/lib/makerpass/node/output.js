var _ = require( 'underscore' );

function MPOutput( config ) {
    _.extend( this, config );
    this.id = this.pin;
};
// .id
// .pin
// .value -- 0-1023
// .state -- on(value=1023)/off(value=0)/analog(1>value<1023)
// .lastchanged
module.exports = MPOutput;
