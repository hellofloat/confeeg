#!/usr/bin/env node

'use strict';

var path = require( 'path' );
var glob = require( 'glob' );

glob( path.join( __dirname, '*.js' ), function( error, files ) {
    if ( error ) {
        console.error( error );
        process.exit( 1 );
    }

    files.forEach( function( file ) {
        // skip this file
        if ( file === __filename ) {
            return;
        }

        var test = require( path.resolve( process.cwd(), file ) );
        test();
    } );
} );
