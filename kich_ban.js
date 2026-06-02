// Khai báo biến
const openBtn = document.getElementById('open-menu-btn');
const closeBtn = document.getElementById('close-menu-btn');
const sidebar = document.getElementById('rolexus-sidebar');
const overlay = document.getElementById('menu-overlay');

function openMenu() {
    sidebar.classList.add('active');
    overlay.classList.add('active');
}
function closeMenu() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
}

openBtn?.addEventListener('click', openMenu);
closeBtn?.addEventListener('click', closeMenu);
overlay?.addEventListener('click', closeMenu);

//Tìm kiếm
const searchBtn = document.getElementById('search-btn');
const searchBar = document.getElementById('search-bar');
const thanhTimKiem = document.getElementById('input');

searchBtn?.addEventListener('click', () => {
    if (searchBar) searchBar.classList.toggle('active');
});

thanhTimKiem?.addEventListener('input', function() {
    const tuKhoa = thanhTimKiem.value.trim().toLowerCase();
    const ketQuaTimKiem = Product_list.filter(sp => sp.ten.toLowerCase().includes(tuKhoa));
    
    if (ketQuaTimKiem.length > 0) {
        Mo_Menu(ketQuaTimKiem); 
    } else {
        if(product_hien_thi) product_hien_thi.innerHTML = `<h2 style="color: white; text-align: center; width: 100%;">Không tìm thấy "${tuKhoa}"</h2>`;
    }
});

// Hệ thống đăng nhập
const loginModal = document.getElementById('login-modal');
const closeLoginBtn = document.getElementById('close-login-btn');
const nutXacNhanAuth = document.getElementById('nut_dang_nhap');
const authTitle = document.getElementById('auth-title');
const toggleAuthText = document.getElementById('toggle-auth-text');
const xacNhanMatKhauInput = document.getElementById('xac_nhan_mat_khau');
const br1 = document.getElementById('br_xac_nhan');
const br2 = document.getElementById('br_xac_nhan_2');
// Lấy danh sách tài khoản đã lưu, mặc định có 1 tài khoản admin
let danhSachTaiKhoan = JSON.parse(localStorage.getItem('rolexus_users')) || [
    { ten: 'admin', pass: '123456' }
];

let dangO_CheDoDangNhap = true;

userBtn?.addEventListener('click', () => { loginModal.classList.add('active'); });
closeLoginBtn?.addEventListener('click', () => { loginModal.classList.remove('active'); });

toggleAuthText?.addEventListener('click', function() {
    dangO_CheDoDangNhap = !dangO_CheDoDangNhap;

    // Chuyển đổi giữa form Đăng Nhập và Đăng Ký
    if (dangO_CheDoDangNhap) {
        authTitle.innerText = "Đăng Nhập";
        nutXacNhanAuth.innerText = "Đăng Nhập Ngay";
        toggleAuthText.innerText = "Chưa có tài khoản? Đăng ký ngay";
        xacNhanMatKhauInput.style.display = "none";
        if(br1) br1.style.display = "none";
        if(br2) br2.style.display = "none";
    } else {
        authTitle.innerText = "Đăng Ký Tài Khoản";
        nutXacNhanAuth.innerText = "Đăng Ký Ngay";
        toggleAuthText.innerText = "Đã có tài khoản? Quay lại Đăng nhập";
        xacNhanMatKhauInput.style.display = "inline-block";
        if(br1) br1.style.display = "inline-block";
        if(br2) br2.style.display = "inline-block";
    }
});

if (nutXacNhanAuth) {
    nutXacNhanAuth.addEventListener('click', function() {
        const ten = document.getElementById('ten_dang_nhap').value.trim();
        const pass = document.getElementById('mat_khau').value.trim();

        if (ten === "" || pass === "") return alert("Vui lòng điền đầy đủ thông tin!");

        if (dangO_CheDoDangNhap) {
            const userTonTai = danhSachTaiKhoan.find(u => u.ten === ten && u.pass === pass);
            if (userTonTai) {
                alert(`Đăng nhập thành công! Chào mừng ${ten}.`);
                loginModal.classList.remove('active');
                document.getElementById('user-btn').innerText = `👤 ${ten}`;
                document.getElementById('mat_khau').value = "";
            } else {
                alert("Sai tên đăng nhập hoặc mật khẩu! Vui lòng thử lại.");
            }
        } else {
            const xacNhanPass = xacNhanMatKhauInput.value.trim();
            if (pass !== xacNhanPass) return alert("Mật khẩu xác nhận không khớp!");

            const kiemTraTrungTen = danhSachTaiKhoan.find(u => u.ten === ten);
            if (kiemTraTrungTen) return alert("Tên tài khoản này đã có người sử dụng!");

            danhSachTaiKhoan.push({ ten: ten, pass: pass });
            localStorage.setItem('rolexus_users', JSON.stringify(danhSachTaiKhoan));
            alert("Đăng ký thành công! Bạn có thể đăng nhập ngay.");

            toggleAuthText.click();
            document.getElementById('mat_khau').value = "";
            xacNhanMatKhauInput.value = "";
        }
    });
}


class SanPham {
    constructor(id, ten, gia, anh, gioi_tinh="Nam") {
        this.id = id;
        this.ten = ten;
        this.gia = gia + " vnd";
        this.gioi_tinh = gioi_tinh;
        this.anh = anh;
    }
    HienThiMenu() {
        return `
        <div class="product-card"> 
            <img src="${this.anh}" style="width:100%">
            <h3>${this.ten}</h3> 
            <p>Giá: <b>${this.gia}</b></p> 
            <p>Dành cho: ${this.gioi_tinh}</p>
            <div style="display: flex; gap: 5px; justify-content: center;">
                <button id="${this.id}" class="Xem_chi_tiet">Xem chi tiết</button>
                <button class="nut_add_cart" onclick="AddToCart('${this.id}')">🛒 Thêm</button>
            </div>
        </div>
        `;
    }
    Hien_Thi_Rieng() {
        return ` 
        <div class ="product-solo" style="display:flex">
            <img src="${this.anh}" style="width:50%">
            <div>
                <h1>Tên sản phẩm : ${this.ten}</h1>
                <h2>Giá: ${this.gia}</h2>
                <h2>Dành cho : ${this.gioi_tinh}</h2>
                <h2>Địa điểm: Rolexus, tầng 36 LandMark69</h2>
                <h2>Nếu có hư hỏng hãy gọi tổng đài 676767 để được bảo hành</h2>
                <button id="buy_${this.ten}_now" class="nut_mua" onclick="AddToCart('${this.id}')">Mua Ngay</button>
            </div>
        </div>
        `;
    }
}

const Product_list = [
    new SanPham("1","Đồng hồ hình anime ",30000,"anh/ke_chinh_phuc_thoi_gian.jpg"),
    new SanPham("2","Vòng cổ bạc",250000,"anh/vong_co_sigma.png"),
    new SanPham("3","Mũ Snapback Graffiti ",50000,"anh/crazy_head.jpg"),
    new SanPham("4","Vương miệng hoàng gia",200000,"anh/vuong-mien-nu-hoang.jpg","Nữ"),
    new SanPham("5","Nhẫn bạc đính đá ",30000,"anh/nhan_cong_chua.jpg","Nữ"),
    new SanPham("6","Vòng tay pha lê",40000,"anh/vong_tay_cute_god.jpg","Nữ"),
    new SanPham("7","Kính mạ vàng luxury",500000,'anh/kinh_luxury.jpg')
];

const product_hien_thi = document.getElementById("product-list");


function Mo_Menu(list_you_need) {
    if (!product_hien_thi) return;
    let product_hien_thi_ay = "";
    
    for(let i of list_you_need) {
        product_hien_thi_ay += i.HienThiMenu();
    }
    product_hien_thi.innerHTML = product_hien_thi_ay;
    
    for(let i of list_you_need) {
        let btn = document.getElementById(`${i.id}`);
        if(btn) {
            btn.addEventListener("click", function() {
                product_hien_thi.innerHTML = i.Hien_Thi_Rieng();
            });
        }
    }
}

const menu_btns = document.querySelectorAll('.nut_menu');
const All_sp_btn = document.getElementById('Product_list_btn');

menu_btns.forEach(btn => {
    btn.addEventListener('click', function() {
        let list = [];
        for (let u of Product_list) {
            if (u.gioi_tinh.length == btn.id.length - 4) {
                list.push(u);
            }
        }
        Mo_Menu(list);
        closeMenu();
    });
});

All_sp_btn?.addEventListener('click', function() {
    Mo_Menu(Product_list);
    closeMenu();
});

Mo_Menu(Product_list);


const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeCartBtn = document.getElementById('close-cart-btn');

let cart = JSON.parse(localStorage.getItem('rolexus_cart')) || [];

cartBtn?.addEventListener('click', () => { 
    cartModal.classList.add('active'); 
    RenderCart(); 
});
closeCartBtn?.addEventListener('click', () => { 
    cartModal.classList.remove('active'); 
});

function AddToCart(id) {
    const spGoc = Product_list.find(item => item.id === id); 
    if (!spGoc) return;
    
    const itemTrongGio = cart.find(item => item.id === id);
    if (itemTrongGio) { 
        itemTrongGio.quantity += 1; 
    } else { 
        let giaTien = parseInt(spGoc.gia.replace(/\D/g, ''));
        cart.push({ id: spGoc.id, ten: spGoc.ten, gia: giaTien, anh: spGoc.anh, quantity: 1 }); 
    }
    LuuVaCapNhatGioHang();
    alert(`Đã thêm "${spGoc.ten}" vào giỏ!`);
}

function RemoveFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    LuuVaCapNhatGioHang();
    RenderCart(); 
}

function LuuVaCapNhatGioHang() {
    localStorage.setItem('rolexus_cart', JSON.stringify(cart));
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const countBoc = document.getElementById('cart-count');
    if (countBoc) countBoc.innerText = totalCount;
}

function RenderCart() {
    const container = document.getElementById('cart-items-container');
    const totalPriceEl = document.getElementById('cart-total-price');
    if (!container || !totalPriceEl) return;
    
    if (cart.length === 0) {
        container.innerHTML = `<h3 style="text-align:center; color:#555;">Giỏ hàng trống trơn 🛒</h3>`;
        totalPriceEl.innerText = "0"; 
        return;
    }
    
    let htmlContent = ""; 
    let tongTien = 0;
    
    cart.forEach(item => {
        tongTien += item.gia * item.quantity;
        htmlContent += `
        <div style="display:flex; align-items:center; justify-content:space-between; padding:10px 0; border-bottom:1px dashed #ccc;">
            <img src="${item.anh}" style="width:60px; height:60px; border-radius:5px; border:1px solid #000;">
            <div style="flex:1; text-align:left; padding-left:15px;">
                <h4 style="margin:0; color:#000;">${item.ten}</h4>
                <p style="margin:5px 0 0 0; color:#333;">SL: <b>${item.quantity}</b></p>
            </div>
            <button onclick="RemoveFromCart('${item.id}')" style="background:red; color:white; border:none; padding:5px 10px; border-radius:5px; cursor:pointer;">✖ Xóa</button>
        </div>`;
    });
    
    container.innerHTML = htmlContent;
    totalPriceEl.innerText = tongTien.toLocaleString('vi-VN');
}

document.getElementById('checkout-btn')?.addEventListener('click', () => {
    if (cart.length === 0) return alert("Giỏ hàng của bạn đang trống!");
    alert("Cảm ơn bạn đã mua sắm tại Rolexus! Đơn hàng đã được ghi nhận."); 
    cart = []; 
    LuuVaCapNhatGioHang(); 
    document.getElementById('cart-modal')?.classList.remove('active');
});

LuuVaCapNhatGioHang();