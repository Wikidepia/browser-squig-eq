const browserApi = typeof browser !== "undefined" ? browser : chrome;

document.addEventListener("DOMContentLoaded", async function () {
  let cbox = document.getElementById("eq-cbox");
  cbox.checked = (await browserApi.storage.local.get("enabled")).enabled
  cbox.addEventListener("change", async function () {
    await browserApi.storage.local.set({ enabled: cbox.checked });
  });

  const filters = await browserApi.storage.local.get("filters");
  const eqFilters = document.getElementById("eq-filters");

  const table = document.createElement("table");
  table.classList.add("eq-filters");

  const thead = document.createElement("thead");
  const tr = document.createElement("tr");
  const th1 = document.createElement("th");
  const th2 = document.createElement("th");
  const th3 = document.createElement("th");
  const th4 = document.createElement("th");
  th1.innerText = "Freq";
  th2.innerText = "Gain";
  th3.innerText = "Q";
  th4.innerText = "Type";
  tr.appendChild(th1);
  tr.appendChild(th2);
  tr.appendChild(th3);
  tr.appendChild(th4);
  thead.appendChild(tr);
  table.appendChild(thead);
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
    table.appendChild(tr);
  }
  eqFilters.appendChild(table);
});
