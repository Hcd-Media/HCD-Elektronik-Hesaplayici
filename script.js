// OHM KANUNU BEYNİ
function hesaplaOhm() {
    // Kutulardaki değerleri çekiyoruz
    let v = document.getElementById("voltaj").value;
    let i = document.getElementById("akim").value;
    let r = document.getElementById("direnc").value;
    let sonucDiv = document.getElementById("ohm-sonuc");

    // Kutuların boş mu dolu mu olduğunu kontrol edip sayıya çeviriyoruz
    v = v ? parseFloat(v) : null;
    i = i ? parseFloat(i) : null;
    r = r ? parseFloat(r) : null;

    sonucDiv.classList.remove("hata"); // Varsa eski hatayı temizle

    if (v !== null && i !== null && r === null) {
        // V ve I girildiyse R'yi bul (R = V / I)
        let sonuc = v / i;
        sonucDiv.innerHTML = "💡 Direnç (R) = " + sonuc.toFixed(2) + " Ω";
    } 
    else if (v !== null && r !== null && i === null) {
        // V ve R girildiyse I'yı bul (I = V / R)
        let sonuc = v / r;
        sonucDiv.innerHTML = "⚡ Akım (I) = " + sonuc.toFixed(2) + " A";
    } 
    else if (i !== null && r !== null && v === null) {
        // I ve R girildiyse V'yi bul (V = I * R)
        let sonuc = i * r;
        sonucDiv.innerHTML = "🔋 Voltaj (V) = " + sonuc.toFixed(2) + " V";
    } 
    else {
        // Eksik veya fazla kutu doldurulduysa arıza lambası yak
        sonucDiv.innerHTML = "⚠️ Usta sadece İKİ kutuyu doldur!";
        sonucDiv.classList.add("hata");
    }

    sonucDiv.style.display = "block"; // Sonucu ekranda göster
}

// DİRENÇ RENK KODU BEYNİ
function hesaplaRenk() {
    let b1 = document.getElementById("bant1").value;
    let b2 = document.getElementById("bant2").value;
    let carpan = document.getElementById("carpan").value;
    let tolerans = document.getElementById("tolerans").value;
    let sonucDiv = document.getElementById("renk-sonuc");

    // Bant 1 ve Bant 2'yi yan yana getirip sayıya çeviriyoruz (Örn: 2 ve 2 -> 22)
    let anaDeger = parseInt(b1 + b2);
    
    // Çarpan ile çarpıyoruz
    let toplamDirenc = anaDeger * parseInt(carpan);
    
    // Değer çok büyükse kOhm veya MOhm olarak yazdıralım
    let gosterim = "";
    if (toplamDirenc >= 1000000) {
        gosterim = (toplamDirenc / 1000000) + " MΩ";
    } else if (toplamDirenc >= 1000) {
        gosterim = (toplamDirenc / 1000) + " kΩ";
    } else {
        gosterim = toplamDirenc + " Ω";
    }

    sonucDiv.innerHTML = "🎯 Değer: " + gosterim + "<br> <span style='font-size:14px; color:#ccc;'>Tolerans: ±" + tolerans + "%</span>";
    
    sonucDiv.classList.remove("hata");
    sonucDiv.style.display = "block";
}
// OP-AMP BEYNİ
function hesaplaOpAmp() {
    let tip = document.getElementById("opamp-tipi").value;
    let rin = parseFloat(document.getElementById("rin").value);
    let rf = parseFloat(document.getElementById("rf").value);
    let sonucDiv = document.getElementById("opamp-sonuc");

    sonucDiv.classList.remove("hata");

    if (isNaN(rin) || isNaN(rf) || rin <= 0) {
        sonucDiv.innerHTML = "⚠️ Usta dirençleri doğru gir!";
        sonucDiv.classList.add("hata");
    } else {
        let kazanc = 0;
        if (tip === "eviren") {
            // Formül: Av = -(Rf / Rin)
            kazanc = -(rf / rin);
            sonucDiv.innerHTML = "📉 Kazanç ($A_v$) = " + kazanc.toFixed(2) + " <br> <span style='font-size:12px; color:#ccc;'>(Faz farkı: 180°)</span>";
        } else {
            // Formül: Av = 1 + (Rf / Rin)
            kazanc = 1 + (rf / rin);
            sonucDiv.innerHTML = "📈 Kazanç ($A_v$) = " + kazanc.toFixed(2) + " <br> <span style='font-size:12px; color:#ccc;'>(Faz farkı: Yok)</span>";
        }
    }
    sonucDiv.style.display = "block";
}

// DOĞRULTUCU BEYNİ
function hesaplaDogrultucu() {
    let vac = parseFloat(document.getElementById("vac").value); // Vrms değeri
    let sonucDiv = document.getElementById("dogrultucu-sonuc");

    sonucDiv.classList.remove("hata");

    if (isNaN(vac) || vac <= 0) {
        sonucDiv.innerHTML = "⚠️ Geçerli bir AC Voltaj gir!";
        sonucDiv.classList.add("hata");
    } else {
        // Vpeak = Vrms * Kök(2)
        let vpeak = vac * 1.4142; 
        
        // Yarım Dalga İdeal: Vdc = Vpeak / Pi
        let yarimDalga = vpeak / Math.PI;
        
        // Tam Dalga İdeal: Vdc = 2 * Vpeak / Pi
        let tamDalga = (2 * vpeak) / Math.PI;

        sonucDiv.innerHTML = 
            "⚡ <b>Tepe Değer ($V_{peak}$):</b> " + vpeak.toFixed(2) + "V <br><br>" +
            "🔪 <b>Yarım Dalga ($V_{dc}$):</b> " + yarimDalga.toFixed(2) + "V <br>" +
            "🌊 <b>Tam Dalga ($V_{dc}$):</b> " + tamDalga.toFixed(2) + "V";
    }
    sonucDiv.style.display = "block";
}

// --- MENÜDEN HAKKIMDA MODALINI AÇMA ---
const hakkimdaLinkleri = document.querySelectorAll(".hakkimda-tetik"); // Hem üst hem alt menüyü bulur
const modalHakkimda = document.getElementById("modalHakkimda");

hakkimdaLinkleri.forEach(link => {
    link.onclick = function(event) {
        event.preventDefault(); // Tıklayınca sayfanın en üste zıplamasını engeller, kaymak gibi durur
        modalHakkimda.style.display = "block"; 
    }
});

const iletisimLinkleri = document.querySelectorAll(".iletisim-tetik"); // Hem üst hem alt menüyü bulur
const modalIletisim = document.getElementById("modalIletisim");

iletisimLinkleri.forEach(link => {
    link.onclick = function(event) {
        event.preventDefault(); // Tıklayınca sayfanın en üste zıplamasını engeller, kaymak gibi durur
        modalIletisim.style.display = "block"; 
    }
});

// --- HAMBURGER YAN MENÜYÜ AÇ/KAPAT ---
const hamburgerBtn = document.getElementById("hamburgerBtn");
const yanMenu = document.getElementById("yanMenu");
const kapatBtn = document.getElementById("kapatBtn");

// Üç çizgiye basınca menüyü 250 piksel genişlet
hamburgerBtn.onclick = function() {
    yanMenu.style.width = "250px";
}

// Çarpıya basınca menüyü sıfırla (gizle)
kapatBtn.onclick = function() {
    yanMenu.style.width = "0";
}

// --- PROJELER KISMINA BASINCA ALT MODELLERİ AÇMA ---
const dropdownler = document.getElementsByClassName("dropdown-btn");

for (let i = 0; i < dropdownler.length; i++) {
    dropdownler[i].addEventListener("click", function() {
        // Altındaki gizli kutuyu bul
        let icerik = this.nextElementSibling;
        
        // Açıksa kapat, kapalıysa aç
        if (icerik.style.display === "block") {
            icerik.style.display = "none";
        } else {
            icerik.style.display = "block";
        }
    });
}

// --- BOŞLUĞA (MENÜ DIŞINA) TIKLAYINCA MENÜYÜ KAPATMA SENSÖRÜ ---
document.addEventListener('click', function(event) {
    const yanMenu = document.getElementById("yanMenu");
    const hamburgerBtn = document.getElementById("hamburgerBtn");

    // Eğer tıklanan yer menünün içi değilse VE üç çizgi butonu da değilse menüyü kapat!
    if (!yanMenu.contains(event.target) && event.target !== hamburgerBtn) {
        yanMenu.style.width = "0";
    }
});

