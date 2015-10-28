'use strict';

var test = require( 'tape' );

var Config = require( '../index.js' );

module.exports = function() {
    test( 'load without env var', function( t ) {
        Config.load( function( error, config ) {
            t.error( error, 'no error loading config' );
            t.ok( config, 'config loaded' );
            t.notOk( config.envfoo, 'env var not loaded' );
            t.end();
        } );
    } );

    test( 'load with env var', function( t ) {
        process.env.CONFIG_ENVFOO = 'bar';
        Config.load( function( error, config ) {
            t.error( error, 'no error loading config' );
            t.ok( config, 'config loaded' );
            t.equal( config.envfoo, 'bar', 'env var config variable loaded' );
            delete process.env.CONFIG_ENVFOO;
            t.end();
        } );
    } );

    test( 'load with nested env var', function( t ) {
        process.env.CONFIG_ENV_FOO_BAR = 'yak';
        Config.load( function( error, config ) {
            t.error( error, 'no error loading config' );
            t.ok( config, 'config loaded' );
            t.ok( config.env, 'first level hierarchy set' );
            t.ok( config.env.foo, 'second level hierarchy set' );
            t.ok( config.env.foo.bar, 'third level hierarchy set' );
            t.equal( config.env.foo.bar, 'yak', 'hierarchy env var loaded' );
            delete process.env.CONFIG_ENV_FOO_BAR;
            t.end();
        } );
    } );

    test( 'load with env hierarchy disabled', function( t ) {
        process.env.CONFIG_ENV_FOO_BAR = 'yak';
        Config.load( {
            envHierarchy: false
        }, function( error, config ) {
            t.error( error, 'no error loading config' );
            t.ok( config, 'config loaded' );
            t.equal( config.env_foo_bar, 'yak', 'hierarchy env var loaded flat' );
            delete process.env.CONFIG_ENV_FOO_BAR;
            t.end();
        } );
    } );
};
