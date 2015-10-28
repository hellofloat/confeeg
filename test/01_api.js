'use strict';

var test = require( 'tape' );

var Config = require( '../index.js' );

module.exports = function() {
    test( 'Config is exported', function( t ) {
        t.ok( Config, 'object exists' );
        t.end();
    } );

    test( 'load exists', function( t ) {
        t.ok( Config.load, 'function exists' );
        t.end();
    } );
};
