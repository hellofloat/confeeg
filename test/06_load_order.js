'use strict';

var test = require( 'tape' );

var Config = require( '../index.js' );

module.exports = function() {
    test( 'load ordering', function( t ) {
        Config.load( {
            order: [
                'config',
                'files'
            ],
            files: [
                'test_defaults.json'
            ],
            config: {
                foo: 'blah',
                blah: 'foo'
            }
        }, function( error, config ) {
            process.env.CONFIG_ENVFOO = 'bar';
            t.error( error, 'no error loading config' );
            t.ok( config, 'config loaded' );
            t.equal( config.blah, 'foo', 'default config loaded' );
            t.equal( config.foo, 'bar', 'files loaded after default config' );
            t.notOk( config.envfoo, 'env config not loaded at all (not in order)' );
            delete process.env.CONFIG_ENVFOO;
            t.end();
        } );
    } );
};
