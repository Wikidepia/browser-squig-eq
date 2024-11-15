// @ts-check
"use strict";

const browserApi = typeof browser !== "undefined" ? browser : chrome;

document.addEventListener("DOMContentLoaded", async function () {
  let cbox = document.getElementById("eq-cbox");
  cbox.checked =
    (await browserApi.storage.local.get("enabled")).enabled || false;
  cbox.addEventListener("change", async function () {
    await browserApi.storage.local.set({ enabled: cbox.checked });
  });

  const filters = (await browserApi.storage.local.get("filters")).filters || [];
  const eqFilters = document.getElementById("eq-filters");

  const table = document.getElementById("eq-filters");
  const tbody = table.getElementsByTagName("tbody")[0];

  for (const filter of filters) {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
    td1.innerText = filter.type;
    td2.innerText = filter.freq;
    td3.innerText = filter.gain;
    td4.innerText = filter.q;
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tbody.appendChild(tr);
  }
  eqFilters.appendChild(table);
});

var exportEq = document.getElementById("export-eq");
exportEq.addEventListener("click", async function () {
  const filters = (await browserApi.storage.local.get("filters")).filters || [];

  let filterText = "Preamp: 0 dB";
  for (let i = 0; i < filters.length; i++) {
    filterText += `\nFilter ${i + 1}: `;

    filterText += filters[i].disabled ? "OFF " : "ON ";
    switch (filters[i].type) {
      case "PK":
        filterText += "PK ";
        break;
      case "LSQ":
        filterText += "LSC ";
        break;
      case "HSQ":
        filterText += "HSC ";
        break;
    }
    filterText += `Fc ${filters[i].freq} Hz Gain ${filters[i].gain} dB Q ${filters[i].q}`;
  }

  var blob = new Blob([filterText], {
    type: "text/plain;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "EQ-" + new Date().toISOString().replace(/:/g, "-") + ".txt";
  a.click();

  setTimeout(function () {
    URL.revokeObjectURL(url);
  }, 100);
});
