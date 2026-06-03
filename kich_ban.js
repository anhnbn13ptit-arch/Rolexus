//Giao diện
const openBtn = document.getElementById('open-menu-btn');
const closeBtn = document.getElementById('close-menu-btn');
const sidebar = document.getElementById('rolexus-sidebar');
const overlay = document.getElementById('menu-overlay');
const theLoaiBtn = document.getElementById('the_loai_btn');
const subMenuTheLoai = document.getElementById('sub_menu_the_loai');
const theLoaiIcon = document.getElementById('the_loai_icon');
const mucGiaBtn = document.getElementById('muc_gia_btn');
const subMenuMucGia = document.getElementById('sub_menu_muc_gia');
const mucGiaIcon = document.getElementById('muc_gia_icon');

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

// Menu thể loại
if (theLoaiBtn && subMenuTheLoai){
    theLoaiBtn.addEventListener('click',function(){
        if (subMenuTheLoai.style.display === "none") {
            subMenuTheLoai.style.display = "block"; 
            theLoaiIcon.innerText = "▲";            
        } else {
            subMenuTheLoai.style.display = "none";  
            theLoaiIcon.innerText = "▼";
        }
    });
}
//Menu mức giá
if (mucGiaBtn && subMenuMucGia){
    mucGiaBtn.addEventListener('click',function(){
        if (subMenuMucGia.style.display === "none") {
            subMenuMucGia.style.display = "block"; 
            mucGiaIcon.innerText = "▲";            
        } else {
            subMenuMucGia.style.display = "none";  
            mucGiaIcon.innerText = "▼";
        }
    });
}

// Thanh tìm kiếm
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
const userBtn = document.getElementById('user-btn'); 
const loginModal = document.getElementById('login-modal');
const closeLoginBtn = document.getElementById('close-login-btn');
const nutXacNhanAuth = document.getElementById('nut_dang_nhap');
const authTitle = document.getElementById('auth-title');
const toggleAuthText = document.getElementById('toggle-auth-text');
const xacNhanMatKhauInput = document.getElementById('xac_nhan_mat_khau');
const br1 = document.getElementById('br_xac_nhan');
const br2 = document.getElementById('br_xac_nhan_2');

let danhSachTaiKhoan = JSON.parse(localStorage.getItem('rolexus_users')) || [
    { ten: 'admin', pass: '123456' }
];

let dangO_CheDoDangNhap = true;


userBtn?.addEventListener('click', () => { loginModal.classList.add('active'); });
closeLoginBtn?.addEventListener('click', () => { loginModal.classList.remove('active'); });

toggleAuthText?.addEventListener('click', function() {
    dangO_CheDoDangNhap = !dangO_CheDoDangNhap;

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
                if(userBtn) userBtn.innerText = `👤 ${ten}`;
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
    constructor(id, ten, gia, anh, gioi_tinh="Nam", loai="Khác") {
        this.id = id;
        this.ten = ten;
        this.gia = gia + " vnd";
        this.gioi_tinh = gioi_tinh;
        this.anh = anh;
        this.loai = loai;
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
        <div style="width: 100%;">
            <button class="nut_quay_lai" onclick="Mo_Menu(Product_list)">&#8592; Quay l&#7841;i</button>
            <div class="product-solo">
                <img src="${this.anh}">
                <div>
                    <h1>Tên sản phẩm: ${this.ten}</h1>
                    <h2>Gi&#225;: ${this.gia}</h2>
                    <h2>D&#224;nh cho : ${this.gioi_tinh}</h2>
                    <h2>&#272;&#7883;a &#273;i&#7875;m: Rolexus, Tầng 5 Landmark 81</h2>
                    <h2>Nếu có hư hỏng hãy gọi đến tổng đài 12345678 để được bảo hành và hỗ trợ</h2>
                    <button id="buy_${this.id}_now" class="nut_mua" onclick="AddToCart('${this.id}')">Mua Ngay</button>
                </div>
            </div>
        </div>
        `;
    }
}
const Product_list = [
    new SanPham("1","Đồng hồ hình anime ",30000,"anh/ke_chinh_phuc_thoi_gian.jpg", "Nam", "Đồng hồ"),
    new SanPham("2","Vòng cổ bạc",250000,"anh/vong_co_sigma.png", "Nam", "Vòng"),
    new SanPham("3","Mũ Snapback Graffiti ",50000,"anh/crazy_head.jpg", "Nam", "Mũ"),
    new SanPham("4","Vương miệng hoàng gia",200000,"anh/vuong-mien-nu-hoang.jpg","Nữ", "Mũ"),
    new SanPham("5","Nhẫn bạc đính đá ",30000,"anh/nhan_cong_chua.jpg","Nữ", "Nhẫn"),
    new SanPham("6","Vòng tay pha lê",40000,"anh/vong_tay_cute_god.jpg","Nữ", "Vòng"),
    new SanPham("7","Kính mạ vàng luxury",500000,'anh/kinh_luxury.jpg', "Nam", "Kính"),
    new SanPham("8","Áo phông nam",300000,'anh/Áo phông nam.webp',"Nam","Áo"),
    new SanPham("9","Áo phông nữ",300000,'anh/Áo phông nữ.webp', "Nữ","Áo"),
    new SanPham("10","Chân váy bé gái",200000,'anh/Chân váy bé gái.webp', "Nữ","Quần"),
    new SanPham("11","Mũ lưỡi trai",150000,'anh/Mũ lưỡi trai.webp',"Nam","Phụ kiện"),
    new SanPham("12","Áo khoác nữ",400000,'anh/Áo khoác nữ.avif', "Nữ","Áo"),
    new SanPham("13","Túi xách nữ",400000,'anh/túi xách nữ.jpg', "Nữ","Phụ kiện"),
    new SanPham("14","Balo",350000,'anh/Balo.webp',"Nam","Phụ kiện"),
    new SanPham("15","Giày nike nam xám",250000,'anh/Nike nam xám.jpg',"Nam","Giày"),
    new SanPham("16","Giày nike nam xanh lá",250000,'anh/nike-nam.jpg',"Nam","Giày"),
    new SanPham("17","Giày nike nữ",250000,'anh/nike-nữ.jpg', "Nữ","Giày"),
    new SanPham("18","Quần jean nam",500000,'anh/Quần jean nam.avif',"Nam","Quần")
];

const product_hien_thi = document.getElementById("product-list");

function Mo_Menu(list_you_need) {
    if (!product_hien_thi) return;
    product_hien_thi.style.display = "grid"; 
    let product_hien_thi_ay = "";
    for(let i of list_you_need) {
        product_hien_thi_ay += i.HienThiMenu();
    }
    product_hien_thi.innerHTML = product_hien_thi_ay;
    for(let i of list_you_need) {
        let btn = document.getElementById(`${i.id}`);
        if(btn) {
            btn.addEventListener("click", function() {
                product_hien_thi.style.display = "flex"; 
                product_hien_thi.style.justifyContent = "center"; 
                
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
            
            // Lấy ra con số tiền thật để tính toán (Ví dụ: "30000 vnd" -> 30000)
            let giaTien = parseInt(u.gia.replace(/\D/g, ''));

            // 1. Lọc theo giới tính
            if (btn.id === 'nam_btn' && u.gioi_tinh === "Nam") {
                list.push(u);
            } else if (btn.id === 'nu_btn' && u.gioi_tinh === "Nữ") {
                list.push(u);
            } 
            
            // 2. Lọc theo tất cả các Thể loại
            else if (btn.id === 'nhan_btn' && u.loai === "Nhẫn") {
                list.push(u);
            } else if (btn.id === 'vong_btn' && u.loai === "Vòng") {
                list.push(u);
            } else if (btn.id === 'mu_btn' && u.loai === "Mũ") {
                list.push(u);
            } else if (btn.id === 'kinh_btn' && u.loai === "Kính") {
                list.push(u);
            } else if (btn.id === 'ao_btn' && u.loai === "Áo") {
                list.push(u);
            } else if (btn.id === 'quan_btn' && u.loai === "Quần") {
                list.push(u);
            } else if (btn.id === 'giay_btn' && u.loai === "Giày") {
                list.push(u);
            } else if (btn.id === 'phukien_btn' && u.loai === "Phụ kiện") {
                list.push(u);
            }
            
            // 3. Lọc theo Mức giá
            else if (btn.id === 'gia_duoi_100' && giaTien < 100000) {
                list.push(u);
            } else if (btn.id === 'gia_100_200' && giaTien >= 100000 && giaTien <= 200000) {
                list.push(u);
            } else if (btn.id === 'gia_tren_200' && giaTien > 200000) {
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

// Chạy khởi tạo màn hình
Mo_Menu(Product_list);

//Giỏ hàng
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeCartBtn = document.getElementById('close-cart-btn');

let cart = JSON.parse(localStorage.getItem('rolexus_cart')) || [];

cartBtn?.addEventListener('click', () => { 
    if(cartModal) {
        cartModal.classList.add('active'); 
        RenderCart(); 
    }
});
closeCartBtn?.addEventListener('click', () => { 
    if(cartModal) cartModal.classList.remove('active'); 
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
    if(cartModal) cartModal.classList.remove('active');
});

LuuVaCapNhatGioHang();