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




class san_pham{Tao_SanPham(ten,gia,anh,gioi_tinh="Nam",img){this.ten=ten;this.gia=gia;this.gioitinh=gioi_tinh,this.anh=img};}