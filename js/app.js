// js/app.js
let data = [];
let currentCat = 'all';

fetch('data/images.json')
  .then(res => res.json())
  .then(json => {
    data = json;
    render();
  });

function render() {
  const gallery = document.getElementById('gallery');
  const keyword = document.getElementById('search').value.toLowerCase();

  gallery.innerHTML = '';

  data.filter(item => {
    return (currentCat === 'all' || item.cat == currentCat)
      && item.name.toLowerCase().includes(keyword);
  }).forEach(item => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <img src="${item.src}">
      <p>${item.name}</p>
    `;

    div.onclick = () => openViewer(item.src);

    gallery.appendChild(div);
  });
}

// 分类切换

document.querySelectorAll('nav button').forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll('nav button').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    currentCat = btn.dataset.cat;
    render();
  }
});

// 搜索

document.getElementById('search').oninput = render;

// 主题切换
const toggle = document.getElementById('themeToggle');
toggle.onclick = () => {
  document.body.classList.toggle('dark');
  toggle.innerText = document.body.classList.contains('dark') ? '☀️' : '🌙';
}

// 全屏查看
const viewer = document.getElementById('viewer');
const viewerImg = document.getElementById('viewerImg');

function openViewer(src) {
  viewer.style.display = 'flex';
  viewerImg.src = src;
  setTimeout(()=>viewer.classList.add('show'),10);
}

viewer.onclick = () => {
  viewer.classList.remove('show');
  setTimeout(()=>viewer.style.display='none',300);
}
