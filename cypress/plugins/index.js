/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */

const fs = require('fs');

module.exports = (on) => {
  on('task', {
    fileExists(filename) {
      return fs.existsSync(filename);
    },
    fileRead(filename) {
      return fs.readFileSync(filename, { encoding: 'utf8' });
    },
    getMissingVideos() {
      const videos = JSON.parse(
        fs.readFileSync('../../videos.json', { encoding: 'utf8' })
      );

      return videos.filter((v) => fs.existsSync(`./transcripts/${v.title}`));    },
  });
};
