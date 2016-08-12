'use strict';

const async = require( 'async' );
const Delver = require( 'delver' );
const extend = require( 'extend' );
const fs = require( 'fs' );
const path = require( 'path' );
const yaml = require( 'js-yaml' );

const DEFAULTS = {
    envPrefix: 'CONFIG',
    envHierarchy: true,
    allowEmptyEnvVars: false,
    files: [
        'CONFIG_DEFAULTS.json',
        'config.json',
        'CONFIG_DEFAULTS.yaml',
        'config.yaml',
        'CONFIG_DEFAULTS.yml',
        'config.yml'
    ],
    order: [
        'files',
        'env',
        'config'
    ]
};

const loaders = {
    files: function( options, config, callback ) {
        async.eachSeries( options.files, function( filename, next ) {
            const file = path.join( process.cwd(), filename );
            fs.access( file, fs.R_OK, function( error ) {
                if ( !error ) {
                    switch ( path.extname( file ).toLowerCase() ) {
                        case '.yaml':
                        case '.yml':
                            extend( config, yaml.safeLoad( fs.readFileSync( file, 'utf8' ) ) );
                            break;
                        default:
                            extend( config, require( file ) );
                            break;
                    }
                }
                next();
            } );
        }, callback );
    },

    env: function( options, config, callback ) {
        for ( const varName in process.env ) {
            if ( !process.env.hasOwnProperty( varName ) ) {
                continue;
            }

            if ( varName.indexOf( options.envPrefix + '_' ) !== 0 ) {
                continue;
            }

            if ( !options.allowEmptyEnvVars && ( typeof process.env[ varName ] === 'undefined' || process.env[ varName ].length === 0 ) ) {
                continue;
            }

            let key = null;

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

        const options = extend( {}, DEFAULTS, _options );

        let config = {};

        async.eachSeries( options.order, function( type, next ) {
            const loader = loaders[ type ];
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
                config = extend( true, {}, config, config[ options.collapse ] );
            }

            callback( null, config );
        } );
    }
};
