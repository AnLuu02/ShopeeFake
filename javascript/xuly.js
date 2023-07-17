const navs = document.querySelectorAll('.nav');
navs.forEach((tab) => {
    tab.onclick = function () {
        document.querySelector('.nav.active').classList.remove('active');
        // document.querySelector(".nav.active").classList.remove("active");

        this.classList.add('active');
        // pane.classList.add("active");
    };
});

// phân loại sub header
const listDSLoc = document.querySelectorAll('.sub_header_phanloai ul li');
const listDsIcon = document.querySelectorAll('.checkPhanLoai');

function PhanLoaiThoGia() {
    listDSLoc.forEach((loc, index) => {
        loc.onclick = function (e) {
            document.querySelector('#slide_price').innerHTML = loc.textContent;
            document.getElementById('slide_price').classList.add('active');
            document.querySelector('.checkPhanLoai.hidePhanLoai').classList.remove('hidePhanLoai');
            listDsIcon[index].classList.add('hidePhanLoai');
        };
    });
}
PhanLoaiThoGia();
// move page
const listPage = document.querySelectorAll('.move_Page i');
const countPage = document.getElementById('count_page');
var indexPage = 1;
listPage[1].onclick = function () {
    indexPage += 1;
    if (indexPage > 14) {
        indexPage = 1;
    }
    countPage.innerHTML = indexPage;
};
listPage[0].onclick = function () {
    indexPage -= 1;
    if (indexPage < 1) {
        indexPage = 14;
    }
    countPage.innerHTML = indexPage;
};

// danh muc

const showHideDanhMuc = document.querySelector('.btn_add_danhmuc');
const listDanhmuc = document.querySelectorAll('.checkbox_control');

function hideDanhmuc() {
    let ganlai = showHideDanhMuc.nextElementSibling;
    listDanhmuc.forEach((danhmuc) => {
        if (ganlai === danhmuc) {
            danhmuc.classList.add('hide');
            ganlai = danhmuc.nextElementSibling;
        }
        showHideDanhMuc.addEventListener('click', () => {
            listDanhmuc.forEach((danhmuc) => {
                danhmuc.classList.remove('hide');
            });
            showHideDanhMuc.classList.add('hide');
        });
    });
}
hideDanhmuc();

// cart

// login
const login = document.getElementById('login');
console.log(login);
login.addEventListener('click', () => {
    // alert('hello')
    login.classList.remove('hide');
    document.querySelector('.header-box').classList.add('hide');
    document.querySelector('.main').classList.add('hide');
    document.querySelector('.login.hide').classList.remove('hide');
});
