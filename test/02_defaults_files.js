'use strict';

var test = require( 'tape' );

var Config = require( '../index.js' );

module.exports = function() {
    test( 'load without defaults files', function( t ) {
        Config.load( function( error, config ) {
            t.error( error, 'no error loading config' );
            t.ok( config, 'config loaded' );
            t.notOk( config.foo, 'first default file not loaded' );
            t.notOk( config.yak, 'second default file not loaded' );
            t.end();
        } );
    } );

    test( 'load with single default file', function( t ) {
        Config.load( {
            files: [
                'test_defaults.json'
            ]
        }, function( error, config ) {
            t.error( error, 'no error loading config' );
            t.ok( config, 'config loaded' );
            t.ok( config.foo, 'first default file loaded' );
            t.equal( config.foo2, 'bar2', 'override value ready for testing' );
            t.notOk( config.yak, 'second default file not loaded' );
            t.end();
        } );
    } );

    test( 'load with multiple default files', function( t ) {
        Config.load( {
            files: [
                'test_defaults.json',
                'test_defaults_2.json'
            ]
        }, function( error, config ) {
            t.error( error, 'no error loading config' );
            t.ok( config, 'config loaded' );
            t.ok( config.foo, 'first default file loaded' );
            t.ok( config.yak, 'second default file loaded' );
            t.equal( config.foo2, 'new', 'second default file overrode first' );
            t.end();
        } );
    } );

    test( 'load with multiple default files (including yaml)', function( t ) {
        Config.load( {
            files: [
                'test_defaults.json',
                'test_defaults_2.json',
                'test_defaults_3.yml',
            ]
        }, function( error, config ) {
            t.error( error, 'no error loading config' );
            t.ok( config, 'config loaded' );
            t.ok( config.foo, 'first default file loaded' );
            t.ok( config.yak, 'second default file loaded' );
            t.ok( config.yam, 'third default file loaded' );
            t.equal( config.foo2, 'newest', 'third default file overrode first and second' );
            t.end();
        } );
    } );
};
