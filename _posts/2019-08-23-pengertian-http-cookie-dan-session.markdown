---
layout: post
title: "Pengertian HTTP Cookie dan Session"
date:  2019-08-23 21:50:47 +0530
categories: Security
---
Ini hal dasar dalam protokol HTTP yang sangat berguna untuk security. Cookie adalah data kecil yang dikirim oleh server ke browser, dan akan dikirimkan kembali oleh browser ketika mengunjungi website yang sama. Logikanya jika kita pergi ke dokter, kita diberi kartu, dan ketika kembali lagi ke dokter tersebut, kita memberikan lagi kartunya supaya bisa dikenali seperti acces card.
<img src = "assets/cookie.png" 
     alt = "Setelah server memberi “Cookie”, browser akan memberikan lagi “Cookie” ke server di request berikutnya" 
     style = "float: left; margin-right: 20px;" />
Dalam kasus sebuah kartu berobat, ada beberapa opsi dalam penyimpanan data. Mungkin kita hanya diberi kartu dengan nomor pasien, lalu seluruh datanya disimpan di dalam komputer klinik atau rumah sakit (atau sekedar di sebuah folder khusus).

Sebuah session dalam aplikasi web adalah sejumlah request dan response yang berhubungan. Misalnya: login, memilih barang, membeli barang,. sampai logout. Sesuai analogi kartu yang hanya berisi ID, cookie juga bisa berisi ssession ID saja, yaitu berupa karakter random yang tidak bisa ditebak (jika bisa ditebak, kita bisa seolah-olah menjadi orang lain)
<img src = "assets/cookie-2.png"
     alt = "Session ID"
     style = "float: left; margin-right: 20px;" />
Dalam kasus lain, misalnya untuk dokter anak, kita diberi buku kecil, dan data mengenai anak disimpan di buku itu. Contohnya adalah data mengenai perkembangan berat badan anak. Bagusnya dengan buku seperti ini, kita bisa membawanya ke dokter anak manapun. Dalam kasus Cookie: jika data disimpan di client, maka jika sebuah domain memiliki banyak server, maka tidak perlu sinkronisasi data antar server atau memakai database terpusat.
<img src = "assets/cookiedata.png"
     alt = "Data cookie di client, dilindungi dengan signature"
     style = "float: left; margin-right: 20px;" />
Ketika sebuah aplikasi web butuh menyimpan data seseorang yang sedang login, maka biasanya yang dipakai adalah Cookie. Cookie ini bisa sekedar berisi informasi session id (dengan seluruh data ada di server), bisa juga berisi datanya langsung. Karena cookie bisa diedit, maka sebuah aplikasi yang aman akan menambahkan [digital signature][digital-signature] atau bahkan datanya semuanya dienkrip.

Ada banyak aturan detail mengenai Cookie, yang meliputi:

- di domain mana cookie berlaku, apakah hanya di domain utama atau sub domain (analoginya: kartu buat dokter kulit di klinik ini apakah berlaku juga buat dokter gigi?). Dan juga apakah hanya untuk path tertentu (misalnya cookie untuk URL /pembelian/ apakah akan dikirimkan untuk /penjualan)
- kapan masa berlaku cookie?
- apakah cookie bisa diakses Javascript
- apakah cookie yang diset dalam mode HTTPS harus dikirim balik ketika memakai mode HTTP?

Berbagai hal detail tersebut bisa jadi masalah security. Beberapa masalah security lain adalah:

- pencurian cookie (misalnya dengan XSS/Cross Site Scripting)
- pengeditan cookie atau pembuatan cookie palsu. Ini hanya terjadi kalau cookienya tidak aman (contoh kasus adalah cookie [JWT yang menerima alg none][news])
Detail mengenai pengeditan cookie ini bisa cukup panjang, jadi tidak akan saya tuliskan di sini. Secara umum bug yang berhubungan dengan cookie sangat bergantung pada framework dan bahasa pemrograman yang dipakai.

Demikian penjelasan singkat mengenai cookie. Sebaiknya buatlah web kecil untuk memahami berbagai perilaku cookie ini agar lebih mengerti, baik dari sisi server maupun sisi client. Install juga program untuk mengedit cookie di browser (atau gunakan intercepting proxy) untuk lebih memahami lagi semuanya.

[news]: https://auth0.com/blog/critical-vulnerabilities-in-json-web-token-libraries/
[digital-signature]: #