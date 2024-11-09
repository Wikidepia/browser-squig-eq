// @ts-check
"use strict";

const browserApi = typeof browser !== "undefined" ? browser : chrome;
let audioCtx = new AudioContext();

async function connect(element, filters) {
  element.crossOrigin = "anonymous";
  const source = new MediaElementAudioSourceNode(audioCtx, {
    mediaElement: element,
  });

  const filterNodes = [];
  for (const filter of filters) {
    if (filters["disabled"]) continue;

    let filterType = "";
    if (filter["type"] === "PK") {
      filterType = "peaking";
    } else if (filter["type"] === "LSQ") {
      filterType = "lowshelf";
    } else if (filters["type"] === "HSQ") {
      filterType = "highshelf";
    } else {
      continue;
    }

    const filterNode = new BiquadFilterNode(audioCtx, {
      type: filterType,
      frequency: filter["freq"],
      gain: filter["gain"],
      Q: filter["q"],
    });
    filterNodes.push(filterNode);
  }
  if (filterNodes.length === 0) return;

  let connect = source.connect(filterNodes[0]);
  for (let i = 1; i < filterNodes.length; i++) {
    connect = connect.connect(filterNodes[i]);
  }
  connect.connect(audioCtx.destination);
}

const mediaObserver = new MutationObserver(function (mutations) {
  mutations.forEach(async function (mutation) {
    const filtersStorage = browserApi.storage.local.get("filters");
    mutation.addedNodes.forEach(function (node) {
      if (node.tagName === "AUDIO" || node.tagName === "VIDEO") {
        connect(node, filtersStorage.filters);
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", async function () {
  if (document.getElementsByClassName("graphtool")) return injectScript();

  const filtersStorage = await browserApi.storage.local.get("filters");
  for (const el of document.querySelectorAll("audio,video")) {
    await connect(el, filtersStorage.filters);
  }

  // Observe for video and audio elements DOM changes
  const targetNode = document.documentElement;
  mediaObserver.observe(targetNode, { childList: true, subtree: true });
});

function injectScript() {
  const scriptElement = document.createElement("script");
  scriptElement.textContent = `
    document.addEventListener('UpdateExtensionFilters', function(event) {
      window.postMessage({type: 'UpdateExtensionFilters', filters: event.detail.filters}, '*');
    });`;
  (document.head || document.documentElement).appendChild(scriptElement);
  scriptElement.remove();
}

// Listen to UpdateExtensionFilters message
window.addEventListener("message", function (event) {
  if (event.data.type === "UpdateExtensionFilters") {
    browserApi.storage.local.set({ filters: event.data.filters });
  }
});

// Observe changes to the filters storage
browserApi.storage.onChanged.addListener(async function (changes, namespace) {
  if (namespace === "local" && "filters" in changes) {
    audioCtx.close();
    audioCtx = new AudioContext();

    const filters = changes.filters.newValue;
    for (const el of document.querySelectorAll("audio,video")) {
      await connect(el, filters);
    }
  }
});
