
const openBtn = document.getElementById('open-menu-btn');
const closeBtn = document.getElementById('close-menu-btn');
const sidebar = document.getElementById('rolexus-sidebar');
const overlay = document.getElementById('menu-overlay');

// Hàm mở menu
function openMenu() {
    sidebar.classList.add('active');
    overlay.classList.add('active');
}

// Hàm đóng menu
function closeMenu() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
}

// Xử lý thao tác click chuột của user
openBtn?.addEventListener('click', openMenu);
closeBtn?.addEventListener('click', closeMenu);

// Nếu người dùng ấn vào bên ngoài menu danh mục sẽ tự động đóng
overlay.addEventListener('click', closeMenu);


const searchBtn = document.getElementById('search-btn');
const searchBar = document.getElementById('search-bar');

const userBtn = document.getElementById('user-btn');
const loginModal = document.getElementById('login-modal');
const closeLoginBtn = document.getElementById('close-login-btn');
const menu_btns=document.querySelectorAll('.nut_menu');
const All_sp_btn=document.getElementById('Product_list_btn');

for (let i of menu_btns){console.log(i.id.length);i.addEventListener('click',function(){list=[];for (let u of Product_list){if (u.gioi_tinh.length == i.id.length - 4){list.push(u)} };Mo_Menu(list)})}
All_sp_btn.addEventListener('click',function(){Mo_Menu(Product_list)})
// Đóng/Mở thanh tìm kiếm
function toggleSearch() {
    if (searchBar.classList.contains('active')) {
        // Nếu đang mở -> thì đóng lại
        searchBar.classList.remove('active');
    } else {
        // Nếu đang đóng -> thì mở ra
        searchBar.classList.add('active');
    }
}

// Mở form đăng nhập
function openLoginForm() {
    loginModal.classList.add('active');
}

//Đóng form đăng nhập
function closeLoginForm() {
    loginModal.classList.remove('active');
}

//Gắn event listener khi người dùng Click
searchBtn.addEventListener('click', toggleSearch);
userBtn.addEventListener('click', openLoginForm);
closeLoginBtn.addEventListener('click', closeLoginForm);



function doimaunguoc(danh_sach) {
    for (let i = 0; i < danh_sach.length; i++) {
        danh_sach[i].style.color = "rgb(255, 255, 255)";
    }
}
function doimau(danh_sach) {
    for (let i = 0; i < danh_sach.length; i++) {
        danh_sach[i].style.color = "rgb(8, 8, 8)";
    }
}





class SanPham{constructor(id,ten,gia,anh,gioi_tinh="Nam"){this.id=id,this.ten=ten;this.gia=gia+" vnd";this.gioi_tinh=gioi_tinh,this.anh=anh};HienThiMenu(){return `
        <div class="product-card"> 
            <img src="${this.anh}" style="width:100%">
            <h3>${this.ten}</h3> 
            <p>Giá: <b>${this.gia}</b></p> 
            <p>Giành cho: ${this.gioi_tinh}</p>
            <button id="${this.id}" class="Xem_chi_tiet">Xem chi tiết</button>
        </div>
    `;};Hien_Thi_Rieng(){return` 
        <div>
            
            <p> ${this.ten}</p>
        <div class ="product-solo" style="display:flex">
            <img src="${this.anh}" style="width:50%">
            <div style="flex:1">
                <h1>tên sản phẩm : ${this.ten}</h1>
                <h2>Giá:${this.gia}</h2>
                <h2>Giành cho :${this.gioi_tinh}</h2>
                <h2>địa điểm mua:Rolexus ,tầng 12,Landmark 36</h2>
                <h2>nếu có hư hỏng hãy gọi tổng đài 676767 để được bảo hành </h2>
            </div>
        </div>`}}
const Product_list =[new SanPham("1","Đồng hồ kẻ chinh phục thời gian",3000000,"anh/ke_chinh_phuc_thoi_gian.jpg"),
    new SanPham("2","vòng cổ sigma",2500000,"anh/vong_co_sigma.png"),
new SanPham("3","mũ điên rồ",50000,"anh/crazy_head.jpg"),
new SanPham("4","vương miệng nữ hoàng",20000000,"anh/vuong-mien-nu-hoang.jpg","Nữ"),
new SanPham("5","nhẫn công chúa",30000,"anh/nhan_cong_chua.jpg","Nữ"),
new SanPham("6","vòng tay chúa cute",40000,"anh/vong_tay_cute_god.jpg","Nữ"),
new SanPham("7","kính luxurius",50000,'anh/kinh_luxury.jpg')];
const product_hien_thi = document.getElementById("product-list");

function Mo_Menu(list_you_need){product_hien_thi_ay ="";
for(let i of list_you_need){product_hien_thi_ay +=i.HienThiMenu()};
product_hien_thi.innerHTML= product_hien_thi_ay;
for(let i of list_you_need)
    {document.getElementById(`${i.id}`).addEventListener("click",function (){product_hien_thi.innerHTML=i.Hien_Thi_Rieng();
})
}}


Mo_Menu(Product_list);


