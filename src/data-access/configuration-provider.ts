let config = require('../../config');

export class ConfigurationProvider {
    isInLocalMode() {
        return config.localMode;
    }
}