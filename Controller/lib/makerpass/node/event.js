var _ = require( 'underscore' );

function MPEvent( config ) {
    _.extend( this, config );
    this.id = this.event;
};
// .id
// .event
// .actions
// .lastfired
module.exports = MPEvent;
