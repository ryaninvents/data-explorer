const lastRelease = require('@semantic-release/last-release-npm');

module.exports = (pluginConfig, config, callback) => {
    lastRelease(pluginConfig, config, (err, data) => {
        if (err) {
            callback(err, data);
            return;
        }
        if (!data.version) {
            callback(err, Object.assign({}, data, {
                version: '0.0.0-unpublished',
            }));
            return;
        }
        callback(err, data);
    })
}