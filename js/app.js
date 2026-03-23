let data = [];
let currentCat = "all";

fetch("data/images.json")
  .then(res => res.json())
  .then(res => {
    data = res;
    render();
  });

function render() {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";

  let keyword = document.getElementById("search").value.toLowerCase();

  data.forEach(item => {
    if (currentCat !== "all" && item.cat != currentCat) return;
    if (!item.file.toLowerCase().includes(keyword)) return;

    let folder = "images" + item.cat;

    let div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${folder}/${item.file}">
      <p>${item.file}</p>
    `;

    div.onclick = () => openViewer(`${folder}/${item.file}`);

    gallery.appendChild(div);
  });
}

// 搜索
document.getElementById("search").oninput = render;

// 分类

document.querySelectorAll(".tabs button").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".tabs button").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");

    currentCat = btn.dataset.cat;
    render();
  };
});

// 全屏
function openViewer(src) {
  let viewer = document.getElementById("viewer");
  let img = document.getElementById("viewer-img");

  img.src = src;
  viewer.classList.remove("hidden");

  setTimeout(()=>viewer.classList.add("show"),10);
}

// 关闭

document.getElementById("viewer").onclick = () => {
  let viewer = document.getElementById("viewer");
  viewer.classList.remove("show");
  setTimeout(()=>viewer.classList.add("hidden"),400);
};

// 主题切换

let toggle = document.getElementById("theme-toggle");

toggle.onclick = () => {
  document.body.classList.toggle("dark");
  toggle.innerText = document.body.classList.contains("dark") ? "☀️" : "🌙";
};
