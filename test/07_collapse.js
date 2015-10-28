'use strict';

var test = require( 'tape' );

var Config = require( '../index.js' );

module.exports = function() {
    var defaults = {
        dev: {
            foo: 'dev'
        }
    };

    test( 'collapse', function( t ) {
        Config.load( {
            config: defaults,
            collapse: 'dev'
        }, function( error, config ) {
            t.error( error, 'no error loading config' );
            t.ok( config, 'config loaded' );
            t.ok( config.foo, 'key exists at root' );
            t.equal( config.foo, 'dev', 'collapse adds to root' );
            t.ok( config.dev, 'source still exists' );
            t.end();
        } );
    } );
};
