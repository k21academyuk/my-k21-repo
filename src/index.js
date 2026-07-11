'use strict';

/**
 * Public entry point for string-toolkit.
 * Re-exports everything from the implementation module so consumers can do:
 *
 *   const { slugify } = require('string-toolkit');
 */
module.exports = require('./stringUtils');
