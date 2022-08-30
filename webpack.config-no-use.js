const defaultConfig = require('@wordpress/scripts/config/webpack.config');

module.exports = {
    ...defaultConfig,
    entry: {
        'three-featured-posts': './blocks/ThreeFeaturedPosts/src',
    },
};