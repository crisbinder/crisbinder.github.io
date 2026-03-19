const gallery = document.getElementById("gallery")
const tabs = document.querySelectorAll(".tab")

let allData = []
let page = 0
let currentType = "all"

/* 模拟加载数据 */
async function loadData(){
    const res = await fetch("data/images.json")
    allData = await res.json()
    render()
}

/* 渲染 */
function render(){

    const data = currentType === "all"
        ? allData
        : allData.filter(i=>i.type === currentType)

    gallery.innerHTML = ""

    data.forEach(item=>{
        const div = document.createElement("div")
        div.className = "card"

        div.innerHTML = `
        <img data-src="${item.url}" class="lazy">
        <div class="info">${item.title}</div>
        `

        gallery.appendChild(div)
    })

    lazyLoad()
}

/* 分类切换 */
tabs.forEach(tab=>{
    tab.onclick = ()=>{
        document.querySelector(".active").classList.remove("active")
        tab.classList.add("active")

        currentType = tab.dataset.type
        render()
    }
})

/* 懒加载 */
function lazyLoad(){
    const imgs = document.querySelectorAll(".lazy")

    const io = new IntersectionObserver(entries=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                const img = entry.target
                img.src = img.dataset.src
                io.unobserve(img)
            }
        })
    })

    imgs.forEach(img=>io.observe(img))
}

/* 无限滚动 */
window.addEventListener("scroll",()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 100){

        loadMore()
    }
})

function loadMore(){
    // 模拟追加
    render()
}

loadData()