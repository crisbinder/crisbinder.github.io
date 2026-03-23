document。addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('gallery');
    const searchInput = document.getElementById('searchInput');
    const catBtns = document.querySelectorAll('.cat-btn');
    const themeToggle = document.getElementById('themeToggle');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');

    let imagesData = [];

    // 1. 加载图片数据
    fetch('data/images.json')
        .then(response => response.json())
        .then(data => {
            imagesData = data;
            renderGallery(imagesData);
        })
        .catch(err => console.error('加载图片数据失败:', err));

    // 2. 渲染网格
    function renderGallery(data) {
        gallery.innerHTML = '';
        data.forEach(item => {
            const div = document.createElement('div');
            div.className = 'gallery-item';
            div.dataset.category = item.category;
            div.dataset.title = item.filename;
            
            div.innerHTML = `
                <img src="${item.url}" alt="${item.filename}" loading="lazy">
                <div class="item-title">${item.filename}</div>
            `;
            
            // 点击放大
            div.addEventListener('click', () => openLightbox(item.url));
            gallery.appendChild(div);
        });
    }

    // 3. 搜索功能
    searchInput.addEventListener('input', (e) => {
        const keyword = e.target.value.toLowerCase();
        filterImages(keyword, document.querySelector('.cat-btn.active').dataset.cat);
    });

    // 4. 分类切换 (带动画)
    catBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.cat-btn.active').classList.remove('active');
            btn.classList.add('active');
            filterImages(searchInput.value.toLowerCase(), btn.dataset.cat);
        });
    });

    function filterImages(keyword, category) {
        const items = document.querySelectorAll('.gallery-item');
        
        items.forEach(item => {
            const matchKeyword = item.dataset.title.toLowerCase().includes(keyword);
            const matchCategory = category === 'all' || item.dataset.category === category;

            if (matchKeyword && matchCategory) {
                item.classList.remove('hidden');
                setTimeout(() => item.classList.remove('fade-out'), 10);
            } else {
                item.classList.add('fade-out');
                // 等待动画结束后隐藏
                setTimeout(() => {
                    if(item.classList.contains('fade-out')) item.classList.add('hidden');
                }, 400); 
            }
        });
    }

    // 5. 主题切换 (白/暗)
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.parentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.body.parentElement.removeAttribute('data-theme');
            themeToggle.textContent = '🌙';
        } else {
            document.body.parentElement.setAttribute('data-theme', 'dark');
            themeToggle.textContent = '☀️';
        }
    });

    // 6. 灯箱 (全屏交互)
    function openLightbox(url) {
        lightboxImg.src = url;
        lightbox.classList.add('active');
    }

    lightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
        // 等待动画完毕清空src
        setTimeout(() => lightboxImg.src = '', 400);
    });
});
