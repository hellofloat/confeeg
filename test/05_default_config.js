'use strict';

var test = require( 'tape' );

var Config = require( '../index.js' );

module.exports = function() {
    test( 'default config object', function( t ) {
        Config.load( {
            config: {
                foo: 'bar'
            }
        }, function( error, config ) {
            t.error( error, 'no error loading config' );
            t.ok( config, 'config loaded' );
            t.equal( config.foo, 'bar', 'default config loaded' );
            t.end();
        } );
    } );
};
