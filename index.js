'use strict';

require( 'es6-shim' ); // shim in the good stuff
var async = require( 'async' );
var Delver = require( 'delver' );
var extend = require( 'extend' );
var fs = require( 'fs' );
var path = require( 'path' );

var DEFAULTS = {
    envPrefix: 'CONFIG',
    envHierarchy: true,
    allowEmptyEnvVars: false,
    files: [
        'CONFIG_DEFAULTS.json',
        'config.json'
    ],
    order: [
        'files',
        'env',
        'config'
    ]
};

var loaders = {
    files: function( options, config, callback ) {
        async.eachSeries( options.files, function( filename, next ) {
            var file = path.join( process.cwd(), filename );
            fs.access( file, fs.R_OK, function( error ) {
                if ( !error ) {
                    extend( config, require( file ) );
                }
                next();
            } );
        }, callback );
    },

    env: function( options, config, callback ) {
        for ( var varName in process.env ) {
            if ( varName.indexOf( options.envPrefix + '_' ) !== 0 ) {
                continue;
            }

            if ( !options.allowEmptyEnvVars && ( typeof process.env[ varName ] === 'undefined' || process.env[ varName ].length === 0 ) ) {
                continue;
            }

            var key = null;

            if ( options.envHierarchy ) {
                key = varName.split( '_' ).slice( 1 ).join( '.' ).toLowerCase();
            }
            else {
                key = varName.substring( ( options.envPrefix + '_' ).length ).toLowerCase();
            }

            Delver.set( config, key, process.env[ varName ] );
        }
        callback();
    },

    config: function( options, config, callback ) {
        extend( config, options.config );
        callback();
    }
};

module.exports = {
    load: function( _options, callback ) {
        if ( !callback ) {
            callback = _options;
            _options = null;
        }

        var options = extend( {}, DEFAULTS, _options );

        var config = {};

        async.eachSeries( options.order, function( type, next ) {
            var loader = loaders[ type ];
            if ( !loader ) {
                next( 'Invalid loader type: ' + type );
                return;
            }

            loader( options, config, next );
        }, function( error ) {
            if ( error ) {
                callback( error );
                return;
            }

            if ( options.collapse ) {
                config = extend( {}, config, config[ options.collapse ] );
            }

            callback( null, config );
        } );
    }
};
