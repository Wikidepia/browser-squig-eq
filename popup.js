const browserApi = typeof browser !== "undefined" ? browser : chrome;

document.addEventListener("DOMContentLoaded", async function () {
  let cbox = document.getElementById("eq-cbox");
  cbox.checked = (await browserApi.storage.local.get("enabled")).enabled || false
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
