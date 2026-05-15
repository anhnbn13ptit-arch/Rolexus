const nut_menu =document.getElementById("menu_button")
const nut_con_menu=document.getElementsByClassName("con_menu")
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

count=1
nut_menu.addEventListener("click",function(){count+=1;if(count%2==0)
    {doimau(nut_con_menu)}else{doimaunguoc(nut_con_menu)}})

nut_menu.addEventListener("mouseenter",function(){nut_menu.style.backgroundColor="rgb(51,51,51)"})
nut_menu.addEventListener("mouseleave",function(){nut_menu.style.backgroundColor="rgb(208,210,211)"})




class SanPham{constructor(id,ten,gia,anh,gioi_tinh="Nam"){this.id=id,this.ten=ten;this.gia=gia+" vnd";this.gioi_tinh=gioi_tinh,this.anh=anh};HienThiMenu(){return `
        <div class="product-card"> 
            <img src="${this.anh}" style="width:100%">
            <h3>${this.ten}</h3> 
            <p>Giá: <b>${this.gia}</b></p> 
            <p>Giành cho: ${this.gioi_tinh}</p>
            <button id="${this.id}" style="background-color:#000000,color:#FFD700,border-radius:25%">Xem chi tiết</button>
        </div>
    `;};Hien_Thi_Rieng(){return` 
        <div>
            <button id="back" style="border-radius:25%"> <- </button>
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

function Mo_Menu(){product_hien_thi_ay ="";
for(let i of Product_list){product_hien_thi_ay +=i.HienThiMenu()};
product_hien_thi.innerHTML= product_hien_thi_ay;
for(let i of Product_list)
    {document.getElementById(`${i.id}`).addEventListener("click",function (){product_hien_thi.innerHTML=i.Hien_Thi_Rieng();
let back_btn=document.getElementById("back");back_btn.addEventListener('mouseenter',function(){back_btn.style.backgroundColor='rgb(51,51,51)'});
back_btn.addEventListener('mouseleave',function(){back_btn.style.backgroundColor='rgb(252, 252, 244)'})
back_btn.addEventListener('click',function(){Mo_Menu()})})
}}


Mo_Menu();