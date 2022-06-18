module.exports = {
  transformer: {
    assetPlugins: ["expo-asset/tools/hashAssetFiles"],
  },
};

const { getDefaultConfig } = require("@expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.assetExts.push("cjs");

module.exports = defaultConfig;
