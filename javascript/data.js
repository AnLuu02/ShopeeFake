function start(head, tail) {
    get((datas) => load(datas, head, tail));
    get(searchh);
}
//get API
function get(callback) {
    const urlApi = 'http://localhost:3000/product';
    fetch(urlApi)
        .then((response) => {
            return response.json();
        })
        .then(callback);
}
// load data
function load(datas, head, tail) {
    document.querySelector('.main-body').classList.add('loadingView');
    let data10 = datas.filter((data, index) => {
        return index < tail && index >= head;
    });
    let htmls = data10.map(function (data, index, arr) {
        return `
                <li data-id="${arr[index].id}">
                    <div class="product">
                        <img src="${arr[index].image_product}" alt="">
                        <div class="content">
                            <p class="name-product">${arr[index].name}</p>
                            <div class="content-product">
                                <p class="price">${arr[index].price}</p>
                                <span class="daban">Đã bán ${arr[index].quatity_buy}</span>
                            </div>
                            <span class="location">TP. Hồ Chí Minh</span>
                        </div>
                    </div>
                    <div class="them_sanpham">
                        <span>Thêm vào giỏ hàng<span>
                    </div>

                    <div class="giamgia">
                        <span>50%</span><br>
                        Giảm
                    </div>

                    <div class="yeuthich">
                        Yêu thích+
                    </div>
            </li>
        `;
    });
    setTimeout(() => {
        document.querySelector('.main-body ul').innerHTML = htmls.join('');
    }, 1000);
}
// Phân trang
(function phantrang() {
    var currentIndex = 0;
    const pages = document.querySelectorAll('.phantrang .page');
    pages.forEach((page) => {
        var attrActive;
        var head = 0;
        var tail = 10;
        if (document.querySelector('.page.active')) {
            document.querySelector('.main-body ul').innerHTML = `<li class="loading"></li>`;
            document.querySelector('.main-body').classList.add('loadingView');
            start(head, tail);
        }
        page.onclick = function () {
            document.querySelector('.main-body ul').innerHTML = `<li class="loading"></li>`;
            document.querySelector('.main-body').classList.add('loadingView');
            attrActive = Number(this.dataset.index);
            currentIndex = attrActive / 10 - 1;
            head = attrActive >= 10 ? attrActive - 10 : attrActive;
            tail = attrActive == head ? head + 10 : attrActive;
            if (document.querySelector('.page.active')) {
                start(head, tail);
            }
            document.querySelector('.page.active').classList.remove('active');
            this.classList.add('active');
        };
    });

    // next-prev
    const nextPage = document.querySelector('#next');
    const prevPage = document.querySelector('#prev');
    nextPage.onclick = function () {
        if (currentIndex >= 4) {
            currentIndex = 0;
        } else currentIndex++;
        console.log(currentIndex);
        attrActive = Number(pages[currentIndex].dataset.index);
        head = attrActive >= 10 ? attrActive - 10 : attrActive;
        tail = attrActive == head ? head + 10 : attrActive;
        if (document.querySelector('.page.active')) {
            start(head, tail);
        }
        document.querySelector('.page.active').classList.remove('active');
        pages[currentIndex].classList.add('active');
    };
    prevPage.onclick = function (e) {
        if (currentIndex <= 0) {
            currentIndex = 4;
        } else currentIndex--;
        console.log(currentIndex);
        attrActive = Number(pages[currentIndex].dataset.index);
        head = attrActive >= 10 ? attrActive - 10 : attrActive;
        tail = attrActive == head ? head + 10 : attrActive;
        if (document.querySelector('.page.active')) {
            start(head, tail);
        }
        document.querySelector('.page.active').classList.remove('active');
        pages[currentIndex].classList.add('active');
    };
})();

// tim kiếm
function searchh(datas) {
    var search = document.querySelector('input[name="search"]');
    search.oninput = function (e) {
        let result = e.target.value.toLowerCase();
        let values_search = datas.filter((element) => {
            return element.name.toLowerCase().includes(result);
        });
        let htmls = '';
        values_search.forEach(function (value_search) {
            htmls += `<li onclick="viewData()">${value_search.name.toLowerCase()}</li>`;
        });
        if (result === '' || values_search.length == 0) {
            htmls = `<li style="text-align: center;">Không tìm thấy...</li>`;
        }
        setTimeout(function () {
            document.querySelector('#value_search').innerHTML = htmls;
        }, 600);

        document.getElementById('timshop').innerText = `Tim shop ${result !== '' ? `"${result}"` : ''}`;
    };
}

// Thêm vào giỏ hàng
let list_product_cart = []; // chứa sản phẩm đã thêm vào giỏ
let list_quatity_product = []; //chứa số lượng sản phẩm có trong giỏ
var total_product_cart = 0; // tổng sản phẩm đã thêm vào giỏ (không trùng)
function add_cart(product_id) {
    document.querySelector('.content-cart span').innerHTML = 'Sản phẩm đã thêm vào giỏ';
    if (document.querySelector('.btn-cart').classList.contains('hide'))
        document.querySelector('.btn-cart').classList.remove('hide');
    let html = '';
    let total_product = 1; // số lượng một sản phẩm đã thêm vào giỏ
    get((datas) => {
        datas.forEach((data) => {
            if (data.id === product_id) {
                if (!list_product_cart.includes(product_id)) {
                    list_product_cart.push(product_id);
                    list_quatity_product.push({ [data.id]: total_product });
                    total_product_cart++;
                    html += `<li class="product_${data.id}">
                                <div class="product_cart">
                                    <img src="${data.image_product}" alt="">
                                    <div class="title_product_cart">
                                        <p class="name_product_cart">${data.name}</p>
                                        <div class="phanloai_product_cart">Phân loại: Bạc</div>
                                    </div>
                                    <div class="money_product_cart">
                                        <span class="price_product_cart">${data.price}đ</span>
                                        <span class="quatity_product_cart">x<p>1</p></span>
                                        <span class="btn_product_cart" onclick="deleteProductCart(${data.id},this)">Xóa</span>
                                    </div>
                                </div>
                            </li> `;
                    document.querySelector('.quatity_product_add').innerHTML = total_product_cart;
                    document.querySelector('.quatity_product_add').style.display = 'block';
                } else {
                    let elem_total_product = document.querySelector(
                        `.content-cart ul li.product_${product_id} .quatity_product_cart p `,
                    );
                    total_product = Number(elem_total_product.innerHTML);
                    total_product++;
                    elem_total_product.textContent = total_product;
                    for (let i of list_quatity_product) {
                        i[product_id] = total_product;
                    }
                }
                document.querySelector('.content-cart ul').innerHTML += html;
            } else {
                total_product = 1;
            }
        });
    });
}
document.querySelector('ul#list_product').addEventListener('click', (e) => {
    if (e.target.closest('li')) {
        add_cart(Number(e.target.closest('li').getAttribute('data-id')));
    }
});

// addCart()
function deleteProductCart(currentId, product) {
    const listProduct = Array.from(document.querySelectorAll('.content-cart ul li'));
    const listBtnDelete = document.querySelectorAll('.btn_product_cart');
    const parentNode = product.parentNode.parentNode.parentNode;
    document.querySelector('.content-cart ul').removeChild(parentNode);
    if (list_product_cart.includes(currentId)) {
        list_product_cart = list_product_cart.filter((id) => id != currentId);
        total_product_cart--;
        document.querySelector('.quatity_product_add').innerHTML = total_product_cart;
        if (total_product_cart === 0) {
            document.querySelector('.quatity_product_add').style.display = 'none';
            document.querySelector('.content-cart span').innerHTML =
                '<img src="./image/empty-cart.png" alt="" class="imgEmpty">';
            document.querySelector('.btn-cart').classList.add('hide');
        }
    }
}
