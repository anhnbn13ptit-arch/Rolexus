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




class SanPham{constructor(ten,gia,anh,gioi_tinh="Nam"){this.ten=ten;this.gia=gia+" vnd";this.gioi_tinh=gioi_tinh,this.anh=anh};HienThiMenu(){return `
        <div class="product-card"> 
            <img src="${this.anh}" style="width:100%">
            <h3>${this.ten}</h3> 
            <p>Giá: <b>${this.gia}</b></p> 
            <p>Giành cho: ${this.gioi_tinh}</p>
        </div>
    `;}}
const Product_list =[new SanPham("Đồng hồ kẻ chinh phục thời gian",3000000,"anh/ke_chinh_phuc_thoi_gian.jpg"),
    new SanPham("vòng cổ sigma",2500000,"anh/vong_co_sigma.png"),
new SanPham("mũ điên rồ",50000,"anh/crazy_head.jpg"),
new SanPham("vương miệng nữ hoàng",20000000,"anh/vuong-mien-nu-hoang.jpg","Nữ"),
new SanPham("nhẫn công chúa",30000,"anh/nhan_cong_chua.jpg","Nữ"),
new SanPham("vòng tay chúa cute",40000,"anh/vong_tay_cute_god.jpg","Nữ"),
new SanPham("kính luxurius",50000,'anh/kinh_luxury.jpg')];
const product_hien_thi = document.getElementById("product-list");
for(let i of Product_list){product_hien_thi.innerHTML +=i.HienThiMenu()}