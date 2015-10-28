
# Confeeg

Load configuration from files, environment variables and passed-in defaults.

## Examples

Simplest example, will load any of the default config files ( CONFIG_DEFAULTS.json, config.json ) from
the CWD and will bring in any environment variables starting with 'CONFIG_'.

```javascript
var Config = require( 'confeeg' );
var util = require( 'util' );

Config.load( function( error, config ) {
    console.log( util.inspect( config ) );
} );
```

Let's change the default filenames to load:

```javascript
var Config = require( 'confeeg' );
var util = require( 'util' );

Config.load( {
    files: [
        'myconfig.json'
    ]
}, function( error, config ) {
    console.log( util.inspect( config ) );
} );
```

Let's change the environment variable prefix to load all environment
variable starting with 'FOO_' instead of 'CONFIG_':

```javascript
var Config = require( 'confeeg' );
var util = require( 'util' );

Config.load( {
    envPrefix: 'FOO'
}, function( error, config ) {
    console.log( util.inspect( config ) );
} );
```

Let's pass in a default config:

```javascript
var Config = require( 'confeeg' );
var util = require( 'util' );

Config.load( {
    config: {
        foo: 'bar'
    }
}, function( error, config ) {
    console.log( util.inspect( config ) );
} );
```

Let's change the loading precedence:

```javascript
var Config = require( 'confeeg' );
var util = require( 'util' );

Config.load( {
    order: [
        'env', // load from environment first
        'config', // then load from whatever default config is passed in
        'files' // then load from files on disk
    ]
    config: {
        foo: 'bar'
    }
}, function( error, config ) {
    console.log( util.inspect( config ) );
} );
```

## About

Confeeg will load up configuration data from:

 - json configuration files, defaulting to CONFIG_DEFAULTS.json and config.json
 - environment variables, defaulting to those that begin with 'CONFIG_'
 - any passed-in configuration object

## Options

### envPrefix (string, default: 'CONFIG')

You can use this to control your configuration variable prefix if you prefer
something other than 'CONFIG_'.

### allowEmptyEnvVars (boolean, default: false)

When loading environment variables, Confeeg will by default skip any empty/unset environment variables.

### envHierarchy (boolean, default: true)

When loading from environment variables, Confeeg will use underscores to denote hierarchy, eg:

```
CONFIG_FOO_BAR_BAZ="yak"
```

Would end up in a configuration object as:

```json
{
    "foo": {
        "bar": {
            "baz": "yak"
        }
    }
}
```

However, you can disable that behavior by setting the 'envHierarchy' option to false, eg:

```
Config.load( {
    envHierarchy: false
}, function( error, config ) {
    // config.foo_bar_baz === 'yak'
} );
```

### files (array, default: [ 'CONFIG_DEFAULTS.json', 'config.json' ])

You can override the default files that Confeeg will search for using this setting.

### order (array, default: [ 'files', 'env', 'config' ] )

You can override the loading order:

```javascript
var Config = require( 'confeeg' );
var util = require( 'util' );

Config.load( {
    order: [
        'env', // load from environment first
        'config', // then load from whatever default config is passed in
        'files' // then load from files on disk
    ]
    config: {
        foo: 'bar'
    }
}, function( error, config ) {
    console.log( util.inspect( config ) );
} );
```

## License

The MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
