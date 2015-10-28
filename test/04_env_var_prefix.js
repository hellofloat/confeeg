'use strict';

var test = require( 'tape' );

var Config = require( '../index.js' );

module.exports = function() {
    test( 'prefix changed: load with env var', function( t ) {
        process.env.TEST_ENVFOO = 'bar';
        Config.load( {
            envPrefix: 'TEST'
        }, function( error, config ) {
            t.error( error, 'no error loading config' );
            t.ok( config, 'config loaded' );
            t.equal( config.envfoo, 'bar', 'env var config variable loaded' );
            delete process.env.TEST_ENVFOO;
            t.end();
        } );
    } );

    test( 'prefix changed: load with nested env var', function( t ) {
        process.env.TEST_ENV_FOO_BAR = 'yak';
        Config.load( {
            envPrefix: 'TEST'
        }, function( error, config ) {
            t.error( error, 'no error loading config' );
            t.ok( config, 'config loaded' );
            t.ok( config.env, 'first level hierarchy set' );
            t.ok( config.env.foo, 'second level hierarchy set' );
            t.ok( config.env.foo.bar, 'third level hierarchy set' );
            t.equal( config.env.foo.bar, 'yak', 'hierarchy env var loaded' );
            delete process.env.TEST_ENV_FOO_BAR;
            t.end();
        } );
    } );
};
