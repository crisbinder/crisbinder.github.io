let data = [];
let currentCat = "all";

fetch("data/images.json")
  .then(res => res.json())
  .then(json => {
    data = json;
    render();
  });

function render() {
  const gallery = document.getElementById("gallery");
  const keyword = document.getElementById("search").value.toLowerCase();

  gallery.innerHTML = "";

  data
    .filter(item => {
      return (
        (currentCat === "all" || item.category === currentCat) &&
        item.title.toLowerCase().includes(keyword)
      );
    })
    .forEach(item => {
      const div = document.createElement("div");
      div.className = "card";

      div.innerHTML = `
        <img src="images/${item.file}">
        <p>${item.title}</p>
      `;

      div.onclick = () => openViewer(item.file);

      gallery.appendChild(div);
    });
}

/* 分类切换 */
document.querySelectorAll(".categories button").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".categories button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    currentCat = btn.dataset.cat;
    render();
  };
});

/* 搜索 */
document.getElementById("search").oninput = render;

/* 全屏查看 */
function openViewer(src) {
  const viewer = document.getElementById("viewer");
  const img = document.getElementById("viewer-img");

  img.src = "images/" + src;

  viewer.classList.remove("hidden");
  setTimeout(()=>viewer.classList.add("show"),10);
}

document.getElementById("viewer").onclick = () => {
  const viewer = document.getElementById("viewer");
  viewer.classList.remove("show");

  setTimeout(()=>viewer.classList.add("hidden"),300);
};

/* 暗黑模式 */
const toggle = document.getElementById("theme-toggle");

toggle.onclick = () => {
  document.body.classList.toggle("dark");

  localStorage.setItem("theme", document.body.classList.contains("dark"));
};

/* 记住主题 */
if (localStorage.getItem("theme") === "true") {
  document.body.classList.add("dark");
}
