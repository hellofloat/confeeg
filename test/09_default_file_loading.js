'use strict';

var test = require( 'tape' );

var Config = require( '../index.js' );

module.exports = function() {
    test( 'load default (yaml) config file', function( t ) {
        Config.load( function( error, config ) {
            t.error( error, 'no error loading config' );
            t.ok( config, 'config loaded' );
            t.equal( config.testing, 'defaults', 'default config loaded' );
            t.equals( JSON.stringify( config.stuff ), JSON.stringify( {
                array: [ 1, 2, 3, 4, 5 ],
                object: {
                    foo: 'bar',
                    baz: 'foo',
                    hello: 'world'
                },
                number: 42,
                string: 'hello world',
                boolean: false
            } ), 'config data verified' );
            t.end();
        } );
    } );
};
