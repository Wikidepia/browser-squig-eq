# InBrowser Squig EQ

Apply EQ created from [GraphTool](https://github.com/HarutoHiroki/PublicGraphTool) to your browser.

Inspired by [HarutoGraphExtension](https://github.com/HarutoHiroki/HarutoGraphExtension), the differences are:

- This extension should work on Manifest V3 and Firefox.
- This extension might be incompatible with certain websites, while HarutoGraphExtension will work on all websites.

## Supported websites

This extension should work for all Haruto's GraphTool websites. Here are some of them:

- [Haruto's GraphTool](https://graphtool.harutohiroki.com/)
- [Listener's GraphTool](https://listener800.github.io/)
- [Crinacle's GraphTool](https://graph.hangout.audio/iem/5128/)

You only need to add the following code to the correct place if you want to add to your squig site: [assets/js/graphtool.js inside `let applyEQ`](https://github.com/HarutoHiroki/PublicGraphTool/blob/c4f3e74d56992eae8c8d49052462cb3c0b8f1d3c/assets/js/graphtool.js#L3189).

## How to install

1. Download the extension from [Releases](https://github.com/Wikidepia/browser-squig-eq/releases).
2. If you use Firefox, read [Firefox Install from File](https://extensionworkshop.com/documentation/publish/distribute-sideloading/).

## How to use

1. Click the extension icon.
2. Click the switch to enable/disable the extension.
3. Open your favorite squigly website, and configure the EQ from there.
4. Try to play audio or video from any website. YouTube is recommended.

## License

[Apache License 2.0](https://github.com/Wikidepia/browser-squig-eq/blob/main/LICENSE)
