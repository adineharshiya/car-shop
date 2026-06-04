let cars = [
    { id: 1, name: "BMW M3", brand: "BMW", year: 2023, price: 75000, img: "https://images.ctfassets.net/c9t6u0qhbv9e/7wQ0sLw8FuZYFzxtxx1WlK/26fdbd12080ba938bcdde1bbd57a73d7/2025BMWM3PeterNelson11.JPG", engine: "3.0L TwinTurbo", hp: 473, description: "The ultimate driving machine.", views: 0 },
    { id: 2, name: "Mercedes C63", brand: "Mercedes", year: 2023, price: 82000, img: "https://static0.carbuzzimages.com/wordpress/wp-content/uploads/2024/04/1040877.jpg", engine: "4.0L V8", hp: 503, description: "Luxury meets raw power.", views: 0 },
    { id: 3, name: "Audi RS7", brand: "Audi", year: 2023, price: 95000, img: "https://static1.topspeedimages.com/wordpress/wp-content/uploads/2023/10/2024-audi-rs7-sportback2.jpg", engine: "4.0L V8", hp: 591, description: "Engineering masterpiece.", views: 0 },
    { id: 4, name: "Tesla Model S", brand: "Tesla", year: 2023, price: 88000, img: "https://www.teslarati.com/wp-content/uploads/2022/11/tesla-model-s-plaid-e1668593406564.jpeg", engine: "Electric", hp: 670, description: "The future of driving.", views: 0 },
    { id: 5, name: "Porsche 911", brand: "Porsche", year: 2023, price: 120000, img: "https://www.topgear.com/sites/default/files/2024/10/2511_3485_004.jpg", engine: "3.0L Flat6", hp: 443, description: "Iconic sports car.", views: 0 },
    { id: 6, name: "Lamborghini Huracan", brand: "Lamborghini", year: 2023, price: 250000, img: "https://www.hdcarwallpapers.com/walls/vf_engineering_lamborghini_huracan_performante_2020_4k-HD.jpg", engine: "5.2L V10", hp: 631, description: "Pure Italian exotic.", views: 0 },
    { id: 7, name: "Ferrari F8", brand: "Ferrari", year: 2023, price: 280000, img: "https://media-r2.carsandbids.com/cdn-cgi/image/width=2080,quality=70/ee7f173e46ec801a48d1673c50f9cebaa1bf2854/photos/3gedNQmb-Ew-ISBZumA-(edit).jpg?t=169843298201", engine: "3.9L V8", hp: 710, description: "Racing pedigree.", views: 0 },
    { id: 8, name: "Nissan GT-R", brand: "Nissan", year: 2023, price: 115000, img: "https://cdn.motor1.com/images/mgl/40x0PM/s3/nissan-gt-r-r35.jpg", engine: "3.8L V6", hp: 565, description: "Godzilla.", views: 0 }
];

let users = JSON.parse(localStorage.getItem("luxeUsers")) || [];
let orders = JSON.parse(localStorage.getItem("luxeOrders")) || [];
let currentUser = (() => { let s = sessionStorage.getItem("luxeUser"); return s ? JSON.parse(s) : null; })();
let cart = [];

function saveAll() { localStorage.setItem("luxeUsers", JSON.stringify(users)); localStorage.setItem("luxeOrders", JSON.stringify(orders)); if(currentUser) localStorage.setItem(`cart_${currentUser.username}`, JSON.stringify(cart)); }
function saveCurrentUser() { if(currentUser) sessionStorage.setItem("luxeUser", JSON.stringify(currentUser)); else sessionStorage.removeItem("luxeUser"); }
function loadCart() { if(currentUser) { let s = localStorage.getItem(`cart_${currentUser.username}`); cart = s ? JSON.parse(s) : []; } else cart = []; updateCartCount(); }
function updateCartCount() { let c = document.getElementById("cartCount"); if(c) c.innerText = cart.length; }
function showHome() { document.querySelectorAll("section").forEach(s=>s.classList.add("hidden")); document.getElementById("homeSection").classList.remove("hidden"); initSwiper(); }
function showCars() { document.querySelectorAll("section").forEach(s=>s.classList.add("hidden")); document.getElementById("carsSection").classList.remove("hidden"); renderCars(); }
function showContact() { document.querySelectorAll("section").forEach(s=>s.classList.add("hidden")); document.getElementById("contactSection").classList.remove("hidden"); }
function showLogin() { document.querySelectorAll("section").forEach(s=>s.classList.add("hidden")); document.getElementById("loginSection").classList.remove("hidden"); }
function showProfile() { if(!currentUser){ Swal.fire({icon:"warning",title:"Login Required",text:"Please login first!",background:"#111"}); showLogin(); return; } updateProfileUI(); document.querySelectorAll("section").forEach(s=>s.classList.add("hidden")); document.getElementById("profileSection").classList.remove("hidden"); }
function updateProfileUI() { if(currentUser){ document.getElementById("profileUsername").innerText = currentUser.username; document.getElementById("profileEmail").innerText = currentUser.email; document.getElementById("profileJoined").innerText = currentUser.joined || new Date().toLocaleDateString(); document.getElementById("profileTotalSpent").innerText = (currentUser.totalSpent || 0).toLocaleString(); document.getElementById("profileOrdersCount").innerText = currentUser.ordersCount || 0; } }
window.addToCart = function(id){ if(!currentUser){ Swal.fire({icon:"warning",title:"Login Required",text:"Please login first!",background:"#111"}); showLogin(); return; } let car = cars.find(c=>c.id===id); if(car){ cart.push(car); saveAll(); updateCartCount(); Swal.fire({icon:"success",title:"Added!",text:`${car.name} added to cart`,background:"#111"}); } };
window.showCart = function(){ let modal = document.getElementById("cartModal"); let itemsDiv = document.getElementById("cartItems"); let total = 0; itemsDiv.innerHTML = cart.map((item,idx)=>{ total += item.price; return `<div style="display:flex; justify-content:space-between; border-bottom:1px solid #333; padding:0.5rem 0;"><div><strong style="color:#d4af37;">${item.name}</strong></div><div>$${item.price.toLocaleString()} <button onclick="removeFromCart(${idx})" style="background:#d4af37; color:#000; border:none; border-radius:20px; padding:2px 8px; cursor:pointer;">✖</button></div></div>`; }).join(""); if(cart.length===0) itemsDiv.innerHTML = "<p style='text-align:center;'>Cart is empty 🛒</p>"; document.getElementById("cartTotal").innerText = total.toLocaleString(); modal.style.display = "flex"; };
window.removeFromCart = function(i){ cart.splice(i,1); saveAll(); updateCartCount(); showCart(); };
window.checkout = function(){ if(!currentUser){ Swal.fire({icon:"warning", title:"Login Required", text:"Please login first!", background:"#111"}); return; } if(cart.length===0){ Swal.fire({icon:"error", title:"Empty Cart", text:"Your cart is empty!", background:"#111"}); return; } let total = cart.reduce((s,i)=>s+i.price,0); orders.push({id:Date.now(), userId:currentUser.username, items:[...cart], total:total, date:new Date().toISOString()}); let ui = users.findIndex(u=>u.username===currentUser.username); if(ui!==-1){ users[ui].totalSpent = (users[ui].totalSpent||0)+total; users[ui].ordersCount = (users[ui].ordersCount||0)+1; currentUser.totalSpent = users[ui].totalSpent; currentUser.ordersCount = users[ui].ordersCount; saveCurrentUser(); } cart = []; saveAll(); updateCartCount(); document.getElementById("cartModal").style.display = "none"; Swal.fire({icon:"success", title:"Order Confirmed!", text:"Your order has been placed. Please visit our showroom to pick up your car:\nDubai, Sheikh Zayed Road, Luxury Auto Showroom", background:"#111", confirmButtonColor:"#d4af37"}); };
function renderCars(){ let grid = document.getElementById("carsGrid"); if(!grid) return; let f = [...cars]; let s = document.getElementById("searchInput")?.value.toLowerCase()||""; let b = document.getElementById("brandFilter")?.value; if(s) f = f.filter(c=>c.name.toLowerCase().includes(s)||c.brand.toLowerCase().includes(s)); if(b && b!=="all") f = f.filter(c=>c.brand===b); let st = document.getElementById("sortSelect")?.value; if(st==="price-low") f.sort((a,b)=>a.price-b.price); if(st==="price-high") f.sort((a,b)=>b.price-a.price); grid.innerHTML = f.map(c=>`<div class="car-card" onclick="showCarDetail(${c.id})"><img src="${c.img}" onerror="this.src='https://via.placeholder.com/300x200'"><div class="car-info"><h3>${c.name}</h3><p>${c.brand} • ${c.year}</p><div class="price">$${c.price.toLocaleString()}</div><button class="add-to-cart" onclick="event.stopPropagation(); addToCart(${c.id})"><i class="fa-solid fa-cart-plus"></i> Add to Cart</button></div></div>`).join(""); }
window.showCarDetail = function(id){ let c = cars.find(c=>c.id===id); if(!c) return; c.views++; document.querySelectorAll("section").forEach(s=>s.classList.add("hidden")); document.getElementById("carDetailSection").classList.remove("hidden"); document.getElementById("detailContainer").innerHTML = `<div style="display:flex; flex-wrap:wrap; gap:2rem;"><img src="${c.img}" style="width:100%; max-width:450px; border-radius:20px;" onerror="this.src='https://via.placeholder.com/500x300'"><div><h2 style="color:#d4af37; font-size:2rem;">${c.name}</h2><p>${c.description}</p><div style="display:grid; grid-template-columns:repeat(2,1fr); gap:0.5rem; margin:1rem 0;"><span style="background:#1a1a1a; padding:0.3rem 0.8rem; border-radius:20px;"><strong>Brand:</strong> ${c.brand}</span><span style="background:#1a1a1a; padding:0.3rem 0.8rem; border-radius:20px;"><strong>Year:</strong> ${c.year}</span><span style="background:#1a1a1a; padding:0.3rem 0.8rem; border-radius:20px;"><strong>Engine:</strong> ${c.engine}</span><span style="background:#1a1a1a; padding:0.3rem 0.8rem; border-radius:20px;"><strong>HP:</strong> ${c.hp}</span></div><div class="price" style="font-size:2rem;">$${c.price.toLocaleString()}</div><button class="add-to-cart" onclick="addToCart(${c.id})" style="padding:0.7rem 2rem;"><i class="fa-solid fa-cart-shopping"></i> Buy Now</button></div></div>`; };
function showOrders(){ if(!currentUser){ Swal.fire("Login required"); return; } let userOrders = orders.filter(o=>o.userId===currentUser.username); document.getElementById("ordersList").innerHTML = userOrders.map(o=>`<div style="background:#1a1a1a; padding:0.8rem; border-radius:12px; margin-bottom:0.5rem; border-left:3px solid #d4af37;"><div style="display:flex; justify-content:space-between;"><span style="color:#d4af37;">Order #${o.id}</span><span>💰 $${o.total.toLocaleString()}</span></div><div style="font-size:0.8rem; color:#888; margin-top:0.3rem;">📅 ${new Date(o.date).toLocaleDateString()}</div><div style="font-size:0.75rem; margin-top:0.3rem;">${o.items.map(i=>i.name).join(" • ")}</div></div>`).join("")||"<p style='text-align:center;'>No orders yet</p>"; document.querySelectorAll("section").forEach(s=>s.classList.add("hidden")); document.getElementById("ordersSection").classList.remove("hidden"); }
function setupProfile(){ document.getElementById("editProfileBtn").onclick=()=>{ document.getElementById("profileView").style.display="none"; document.getElementById("profileEdit").style.display="block"; document.getElementById("editUsername").innerText=currentUser.username; document.getElementById("editEmail").value=currentUser.email; }; document.getElementById("saveProfileBtn").onclick=()=>{ let email=document.getElementById("editEmail").value; let np=document.getElementById("editPassword").value; let cp=document.getElementById("editConfirmPassword").value; if(np && np!==cp){ Swal.fire("Passwords don't match"); return; } let idx=users.findIndex(u=>u.username===currentUser.username); if(idx!==-1){ users[idx].email=email; if(np) users[idx].password=np; saveAll(); } currentUser.email=email; saveCurrentUser(); Swal.fire("Profile updated"); document.getElementById("profileView").style.display="block"; document.getElementById("profileEdit").style.display="none"; updateProfileUI(); }; document.getElementById("cancelEditBtn").onclick=()=>{ document.getElementById("profileView").style.display="block"; document.getElementById("profileEdit").style.display="none"; }; document.getElementById("profileLogoutBtn").onclick=logout; document.getElementById("closeProfileBtn").onclick=showHome; document.getElementById("closeOrdersBtn").onclick=()=>{ document.getElementById("ordersSection").classList.add("hidden"); showProfile(); }; }

// توابع لاگین و ریجستر - درست شده
document.getElementById("loginTab").onclick = () => {
    document.getElementById("loginTab").classList.add("active");
    document.getElementById("registerTab").classList.remove("active");
    document.getElementById("loginFormDiv").style.display = "block";
    document.getElementById("registerFormDiv").style.display = "none";
};
document.getElementById("registerTab").onclick = () => {
    document.getElementById("registerTab").classList.add("active");
    document.getElementById("loginTab").classList.remove("active");
    document.getElementById("loginFormDiv").style.display = "none";
    document.getElementById("registerFormDiv").style.display = "block";
};

document.getElementById("loginForm").onsubmit = (e) => { 
    e.preventDefault(); 
    let u = document.getElementById("loginUsername").value; 
    let p = document.getElementById("loginPassword").value; 
    let user = users.find(uu=>uu.username===u && uu.password===p); 
    if(user){ 
        currentUser = {username:user.username, email:user.email, joined:user.joined, totalSpent:user.totalSpent||0, ordersCount:user.ordersCount||0}; 
        saveCurrentUser(); 
        loadCart(); 
        updateNav(); 
        Swal.fire({icon:"success", title:"Welcome!", text:`${u} logged in`, background:"#111"}); 
        showHome(); 
    } else Swal.fire({icon:"error", title:"Error", text:"Invalid credentials", background:"#111"}); 
}; 

document.getElementById("registerForm").onsubmit = (e) => { 
    e.preventDefault(); 
    let un = document.getElementById("regUsername").value; 
    let em = document.getElementById("regEmail").value; 
    let pw = document.getElementById("regPassword").value; 
    let cp = document.getElementById("regConfirmPassword").value; 
    if(!un || !em || !pw){ Swal.fire("Please fill all fields"); return; } 
    if(users.find(u=>u.username===un)){ Swal.fire("Username exists"); return; } 
    if(pw !== cp){ Swal.fire("Passwords don't match"); return; } 
    users.push({username:un, email:em, password:pw, joined:new Date().toLocaleDateString(), totalSpent:0, ordersCount:0}); 
    saveAll(); 
    currentUser = {username:un, email:em, joined:new Date().toLocaleDateString(), totalSpent:0, ordersCount:0}; 
    saveCurrentUser(); 
    loadCart(); 
    updateNav(); 
    Swal.fire({icon:"success", title:"Registered!", text:`Welcome ${un}`, background:"#111"}); 
    showHome(); 
};

function updateNav(){ let l=document.getElementById("loginLink"), p=document.getElementById("profileLink"), a=document.getElementById("adminPanelLink"); if(currentUser){ if(l) l.classList.add("hidden"); if(p) p.classList.remove("hidden"); if(a) { if(currentUser.username === "admin") a.classList.remove("hidden"); else a.classList.add("hidden"); } } else { if(l) l.classList.remove("hidden"); if(p) p.classList.add("hidden"); if(a) a.classList.add("hidden"); } }
function logout(){ currentUser=null; sessionStorage.clear(); cart=[]; updateCartCount(); updateNav(); showHome(); Swal.fire({icon:"info", title:"Logged Out", text:"See you soon!", background:"#111"}); }
function initSwiper(){ new Swiper('.mySwiper', { loop: true, autoplay: { delay: 4000 }, pagination: { el: '.swiper-pagination', clickable: true } }); }

// ADMIN FUNCTIONS
function renderAdminCars(){ let cont = document.getElementById("adminCarsList"); if(!cont) return; cont.innerHTML = cars.map(c=>`<div style="background:#1a1a1a; padding:0.8rem; border-radius:12px; display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;"><div><img src="${c.img}" style="width:60px; height:45px; object-fit:cover; border-radius:8px; margin-right:10px;"><strong style="color:#d4af37;">${c.name}</strong> $${c.price.toLocaleString()}</div><div><button onclick="editCar(${c.id})" style="background:#d4af37; color:#000; border:none; padding:5px 10px; border-radius:20px; cursor:pointer; margin-right:0.5rem;">✏️ Edit</button><button onclick="deleteCar(${c.id})" style="background:#8b0000; color:#fff; border:none; padding:5px 10px; border-radius:20px; cursor:pointer;">🗑️ Delete</button></div></div>`).join(""); }
window.editCar = function(id){ let c = cars.find(c=>c.id===id); if(!c) return; let n = prompt("New name:", c.name); let p = prompt("New price:", c.price); if(n) c.name = n; if(p) c.price = parseInt(p); saveAll(); renderAdminCars(); renderCars(); Swal.fire("Updated!"); };
window.deleteCar = function(id){ Swal.fire({title:"Delete car?", icon:"warning", showCancelButton:true, background:"#111", confirmButtonColor:"#d4af37"}).then(res=>{ if(res.isConfirmed){ let i = cars.findIndex(c=>c.id===id); if(i!==-1) cars.splice(i,1); saveAll(); renderAdminCars(); renderCars(); Swal.fire("Deleted!"); } }); };
function addNewCar(){ let n = document.getElementById("adminCarName").value; if(!n){ Swal.fire("Enter car name!"); return; } cars.push({ id: Math.max(...cars.map(c=>c.id), 0) + 1, name: n, brand: document.getElementById("adminCarBrand").value, year: parseInt(document.getElementById("adminCarYear").value), price: parseInt(document.getElementById("adminCarPrice").value), img: document.getElementById("adminCarImg").value || "https://via.placeholder.com/300", engine: "V8", hp: 500, description: "New luxury car", views: 0 }); saveAll(); renderAdminCars(); renderCars(); Swal.fire("Car Added!"); document.getElementById("adminCarName").value = ""; document.getElementById("adminCarYear").value = ""; document.getElementById("adminCarPrice").value = ""; document.getElementById("adminCarImg").value = ""; }
function setupAdminTabs(){ document.querySelectorAll(".admin-tab-btn").forEach(btn=>{ btn.onclick = () => { document.querySelectorAll(".admin-tab-btn").forEach(b=>b.classList.remove("active")); btn.classList.add("active"); document.querySelectorAll(".admin-tab-content").forEach(c=>c.classList.add("hidden")); let t = btn.getAttribute("data-tab"); if(t==="dashboard") document.getElementById("adminDashboard").classList.remove("hidden"); if(t==="products") document.getElementById("adminProducts").classList.remove("hidden"); if(t==="dashboard") updateAdminDashboard(); if(t==="products") renderAdminCars(); }; }); }
window.showAdminPanel = function(){ if(!currentUser || currentUser.username !== "admin"){ Swal.fire({icon:"error", title:"Access Denied", text:"Admin only!", background:"#111"}); return; } document.querySelectorAll("section").forEach(s=>s.classList.add("hidden")); document.getElementById("adminPanelSection").classList.remove("hidden"); setTimeout(()=>{ updateAdminDashboard(); renderAdminCars(); setupAdminTabs(); }, 100); };
function updateAdminDashboard(){ let now = new Date(), today = new Date(now.getFullYear(), now.getMonth(), now.getDate()), week = new Date(today); week.setDate(week.getDate()-7); let month = new Date(today); month.setDate(month.getDate()-30); let ts=0, ws=0, ms=0, tt=0, tc=0,wc=0,mc=0,ttc=0; orders.forEach(o=>{ let d = new Date(o.date); tt += o.total; ttc += o.items.length; if(d >= today){ ts += o.total; tc += o.items.length; } if(d >= week){ ws += o.total; wc += o.items.length; } if(d >= month){ ms += o.total; mc += o.items.length; } }); document.getElementById("todaySales").innerText = "$" + ts.toLocaleString(); document.getElementById("todayCount").innerText = tc + " sold"; document.getElementById("weekSales").innerText = "$" + ws.toLocaleString(); document.getElementById("weekCount").innerText = wc + " sold"; document.getElementById("monthSales").innerText = "$" + ms.toLocaleString(); document.getElementById("monthCount").innerText = mc + " sold"; document.getElementById("totalSales").innerText = "$" + tt.toLocaleString(); document.getElementById("totalCount").innerText = ttc + " sold"; let best = {}; orders.forEach(o=>{ o.items.forEach(i=>{ if(!best[i.id]) best[i.id] = {name: i.name, count: 0}; best[i.id].count++; }); }); let top = Object.values(best).sort((a,b)=>b.count-a.count).slice(0,5); document.getElementById("bestSellersList").innerHTML = top.map((b,i)=>`<div style="display:flex; justify-content:space-between; background:#1a1a1a; padding:0.5rem; border-radius:8px; margin-bottom:0.3rem;"><span>${i+1}. ${b.name}</span><span style="color:#d4af37;">🛒 ${b.count} sold</span></div>`).join("") || "<p>No sales yet</p>"; }

// INITIALIZE
document.getElementById("homeLink").onclick = showHome;
document.getElementById("carsLink").onclick = showCars;
document.getElementById("contactLink").onclick = showContact;
document.getElementById("loginLink").onclick = showLogin;
document.getElementById("profileLink").onclick = showProfile;
document.getElementById("cartBtn").onclick = showCart;
document.getElementById("checkoutBtn").onclick = checkout;
document.getElementById("backToCarsBtn").onclick = showCars;
document.getElementById("closeProfileBtn").onclick = showHome;
document.getElementById("closeOrdersBtn").onclick = () => { document.getElementById("ordersSection").classList.add("hidden"); showProfile(); };
document.getElementById("ordersLink")?.addEventListener("click",()=>{ if(currentUser) showOrders(); else Swal.fire("Login required"); });
document.querySelector(".close").onclick = () => document.getElementById("cartModal").style.display = "none";
window.onclick = (e) => { if(e.target === document.getElementById("cartModal")) document.getElementById("cartModal").style.display = "none"; };
document.getElementById("searchInput")?.addEventListener("input", renderCars);
document.getElementById("brandFilter")?.addEventListener("change", renderCars);
document.getElementById("sortSelect")?.addEventListener("change", renderCars);
document.getElementById("adminPanelLink").onclick = showAdminPanel;
document.getElementById("adminAddCarBtn") && (document.getElementById("adminAddCarBtn").onclick = addNewCar);
document.getElementById("closeAdminPanelBtn") && (document.getElementById("closeAdminPanelBtn").onclick = showHome);
document.getElementById("adminRefreshBtn") && (document.getElementById("adminRefreshBtn").onclick = () => { location.reload(); });

setupProfile(); 
loadCart(); 
updateNav(); 
updateCartCount(); 
showHome();

if(!users.find(u=>u.username==="admin")) users.push({username:"admin", email:"admin@luxeauto.com", password:"admin123", joined:new Date().toLocaleDateString(), totalSpent:0, ordersCount:0}); 
saveAll();
