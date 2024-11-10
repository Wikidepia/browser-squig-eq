const browserApi = typeof browser !== "undefined" ? browser : chrome;

document.addEventListener("DOMContentLoaded", async function () {
  let cbox = document.getElementById("eq-cbox");
  cbox.checked = (await browserApi.storage.local.get("enabled")).enabled
  cbox.addEventListener("change", async function () {
    await browserApi.storage.local.set({ enabled: cbox.checked });
  });

  const filters = await browserApi.storage.local.get("filters");
  const eqFilters = document.getElementById("eq-filters");

  const table = document.getElementById("eq-filters");
  const tbody = table.getElementsByTagName("tbody")[0];

  for (const filter of filters.filters) {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
    td1.innerText = filter.freq;
    td2.innerText = filter.gain;
    td3.innerText = filter.q;
    td4.innerText = filter.type;
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tbody.appendChild(tr);
  }
  eqFilters.appendChild(table);
});
