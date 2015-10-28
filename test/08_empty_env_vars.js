'use strict';

var test = require( 'tape' );

var Config = require( '../index.js' );

module.exports = function() {
    test( 'empty env var', function( t ) {
        process.env.CONFIG_EMPTY = '';
        Config.load( function( error, config ) {
            t.error( error, 'no error loading config' );
            t.ok( config, 'config loaded' );
            t.ok( typeof config.empty === 'undefined', 'empty env var not loaded' );
            delete process.env.CONFIG_EMPTY;
            t.end();
        } );
    } );

    test( 'empty env var allowed', function( t ) {
        process.env.CONFIG_EMPTY = '';
        Config.load( {
            allowEmptyEnvVars: true
        }, function( error, config ) {
            t.error( error, 'no error loading config' );
            t.ok( config, 'config loaded' );
            t.ok( typeof config.empty !== 'undefined', 'empty env var loaded' );
            delete process.env.CONFIG_EMPTY;
            t.end();
        } );
    } );
};
