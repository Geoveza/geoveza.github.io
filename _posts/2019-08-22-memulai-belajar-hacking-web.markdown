---
layout: post
title: "Memulai Belajar Hacking Web"
date:  2019-08-22 21:52:59 +0530
categories: Security
---

Ini adalah salah satu pertanyaan yang banyak ditanyakan ke saya: dari mana memulai kalau hanya ingin belajar hacking web (pentest atau mengejar bug bounty aplikasi web). Daripada saya menjawab berulang-ulang, saya tuliskan saja di posting ini. Jawaban ini bukan satu-satunya jawaban, ada banyak jawaban lain di Internet. Jawaban inipun mungkin bukan yang paling benar, jadi bacalah juga jawaban orang lain sebelum memutuskan.

<h2>Tujuan</h2>

Hal paling utama adaalah: apa sih tujuannya ingin bisa hacking web? Contohnya:

- untuk bug hunting (bug bounty)
- untuk pentesting
- untuk mengetes keamanan aplikasi web buatan sendiri
- untunk tujuan jahat (deface, dump database, dsb)

Tergantung masing-masing tujuan, caranya belajarnya bisa sangat berbeda. Untuk penjelasan berikutnya, saya akan menggunakan contoh dua bug umum:

- IDOR (Indirect Direct Object Reference)
- SQL injection

Kedua bug tersebut biasanya relatif mudah ditemukan dan mudah dipelajari. [Remaja umur 19 tahun yang mendapatkan 1 juta dollar][news] (total selama 3 tahun bug hunting) menyatakan bahwa bug favoritnya adalah IDOR karena katanya “mudah ditemukan dan hasilnya besar”.

Dalam bahasa sederhana, dengan IDOR kita bisa melihat data orang lain yang seharusnya tidak bisa kita lihat. Dengan SQL injection kita bisa melihat/mendump data dalam database. Sebagai catatan, ada banyak varian bug IDOR dan SQL Injection yang tidak mudah ditemukan

Jika tujuan Anda adalah bug hunting untuk bug bounty, maka belajar beberapa teknik serangan saja sudah cukup (misalnya dua yang saya sebutkan di atas: IDOR dan SQL injection). Hasil pelajaran ini langsung dicobakan ke berbagai situs yang menyediakan bug bounty. Jika kita beruntung, maka bisa berhasil menemukan bug dan dapat uang. Banyak pemula (catatan: mereka sendiri yang mengaku pemula di-writeup yang diterbitkan) yang beruntung menemukan bug di Google atau Facebook walau baru mengenal satu dua teknik saja. Tapi perlu saya beri peringatan: jangan berharap terlalu besar, jumlah bug hunter saat ini sudah banyak, jadi kebanyakan bug sederhana sudah ditemukan orang lain.

Dalam kasus bug hunting, mungkin saja situs yang kita test punya bug lain (misalnya [command injection][command-injection]), tapi karena belum kenal teknik itu maka tidak ketemu bug. Dan ini tidak apa-apa, karena bug itu akan ditemukan oleh bug hunter lain.

Jika tujuannya hanya ingin hacking web untuk defacing, maka belajar beberapa teknik saja juga sudah cukup. Asalkan bisa masuk dan mengganti file. Tapi tentunya hal yang dikuasai berbeda dengan tujuan bug hunting. Jumlah situs target lebih banyak (karena ada banyak situs yang tidak memberikan bounty). Tapi ini adalah hal yang illegal, jadi saya sangat menyarankan Anda tidak melakukannya.

Ini berbeda jika tujuannya adalah pentest: kita perlu tahu semua (atau setidaknya sebagian besar teknik security). Dalam pentest kita diberi target, lalu diminta menemukan semua bug yang mungkin ada di situs tersebut. Artinya kalau kita hanya tahu IDOR dan SQL injection, tapi ternyata situsnya punya bug lain seperti XSS atau command injection, kita tidak bisa menemukannya. Dalam hal ini client bisa kecewa kalau ternyata setelah selesai pentest, ada penyerang yang bisa dengan mudah masuk.

<h2>Memulai tanpa mengerti</h2>

Beberapa bug kadang bahkan bisa ditemukan tanpa paham dasarnya sama sekali. Jika ada URL memiliki format seperti ini:
```javascript
http://example.com/user/profile.php?id=1234
```
Dan jika kita ganti 1234 menjadi 1235 lalu muncul profil orang lain, maka ini sudah ketemu bug IDOR. Tentunya jika itu halaman publik, maka bukan termasuk IDOR, hanya jika seharusnya user yang login yang bisa melihat page miliknya tapi malah bisa melihat page orang lain (atau secara umum bisa melihat data apapun yang bukan hak kita). Tanpa tool apapun (selain browser) bug IDOR jenis ini bisa ditemukan (terutama jika ini terjadi pada request HTTP GET).


Di abad 23, orang masih mencoba SQL Injection (Sumber: Star Trek Discovery Season 2 Episode 8)
Sekarang contoh lain untuk URL yang sama, jika kita masukkan tanda petik di belakangnya (atau %27) dan keluar SQL error, maka itu ada bug SQL Injection. Eksploitasi bug sederhana seperti itu bisa dilakukan dengan sqlmap, kira-kira seperti ini:
```javascript
python sqlmap.py -u http://example.com/user/profile.php?id=1234
```
Tentunya kadang ada proteksi tertentu sehingga teknik super serderhana seperti ini tidak jalan. Ini hanya contoh bug sangat sederhana tapi masih cukup sering ditemukan.

Tidak ada salahnya memulai dengan cara seperti ini, dan kadang walau tidak mengerti sudah bisa ketemu bug dan bahkan mendapatkan uang. Tapi tentunya ini saja tidak cukup, karena lama-lama tidak akan ketemu lagi bug sederhana seperti ini.

Banyak defacer yang menghack ribuan situs dengan cara yang sama, dan mereka hanya tahu beberapa teknik security saja. Dari sudut pandang tertentu ini bisa dibilang hebat (“bisa hacking ribuan site”), tapi dari sudut pandang lain: Anda sebaiknya tidak menyewa orang semacam ini untuk melakukan pentesting web Anda. Ilmu yang mereka miliki kadang hanya itu-itu saja, dan tidak bisa menemukan bug lain yang mungkin lebih parah.

<h2>Memulai dengan memahami</h2>

Pendekatan lain yang lebih baik (menurut saya) adalah dengan memahami. Secara umum yang perlu dilakukan untuk belajar hacking web app adalah:

- belajar teknologi web (HTTP, HTML, JavaScript, CSS, dan teknologi server seperti PHP)
- belajar security
- latihan sepanjang hayat

Semua ini bisa dilakukan bertahap. Artinya tidak perlu langsung tahu dan mengerti semua tag HTML, atau mengerti semua tentang Javascript. Di awal pengetahun dasar saja sudah cukup, nanti jika ingin bisa berbagai attack yang lebih advanced maka perlu pemahaman yang lebih lagi mengenai teknologi web.

Jadi jika masih benar-benar blank, minimal belajarlah mengenal apa itu HML, JavaScript, sedikit CSS, dan teknologi sisi server. Salah satu teknologi sisi server termudah saat ini adalah PHP, tapi tidak harus itu yang dipelajari, bahkan semakin banyak yang dipelajari semakin baik. Cobalah ikuti tutorial untuk membuat aplikasi database sederhana yang memakai session (ada bagian login, logout, tampilkan data dari database).

Untuk developer yang ingin belajar mengamankan aplikasi buatannya, maka dasar-dasar biasanya sudah dikuasai, jadi bisa langsung belajar mengenai berbagai masalah security web. Ini bisa dimulai dengan membaca [OWASP Top 10][owasp] lalu dilanjutkan membaca jenis serangan lain di situs tersebut.

Jika ingin lebih serius, pendekatan lain yang bisa ditempuh adalah mengambil sertifikasi seperti CEH, OSCP atau yang lain. Biasanya ada materi pelajaran yang harus diikuti sebelum mendapatkan sertifikasi security tersebut. Orang yang memiliki sertifikasi tidak dijamin jago (apalagi ada yang memakai joki), tapi minimal mereka pernah mendengar dan mengenal berbagai masalah security.

Latihan yang legal bisa dilakukan dengan mensetup berbagai aplikasi yang vulnerable (mengandung bug). Saat ini ada [Damn Vulnerable Web Application][dvwa](DWVA) sebuah aplikasi web yang sengaja dibuat banyak bugnya untuk dipakai latihan (ada banyak varian lain selain DVWA ini). Tentu saja kita bisa menginstall sendiri Drupal atau WordPress versi lama. Alternatif lain adalah dengan mengikuti berbagai CTF yang ada (dalam konteks ingin belajar web hacking, selesaikan saja kategori webnya).

<h2>Buku</h2>

Saya bisa saja mendaftarkan banyak buku dan website untuk belajar, tapi nanti malah jadi bingung harus mulai dari mana. Saya putuskan mendaftarkan 3 saja buku untuk memulai. Selain buku, berbagai website juga bisa dengan mudah dicari untuk berbagai topik khusus.

Untuk yang ingin terjun langsung ke bug bounty, [buku Web Hacking 101][buku-101], [buku Sakti Hacker][buku-sakti-hacker] sangat mudah dibaca. Isinya sangat praktis, tidak banyak teori. Berbagai contoh temuan yang real (laporan nyata yang pernah menghasilkan uang) terdaftar di buku itu.

Di sisi lain [buku Tangled Web][tangled-web] memberikan teori yang cukup dalam dari dasar. Dengan membaca buku ini, kita jadi tahu cerita keseluruhan masalah security web. Saya menyarankan ini untuk yang sudah menjadi web developer.

Buku bagus yang membahas dari dasar sampai cukup detail tapi tetap praktis adalah [Web Security a Whitehat Perspective][web-ecurity-whitehat]. Isi pembahasannya serupa dengan Tangled Web tapi lebih detail. Misalnya kadang sampai konfigurasi nginx-nya juga diberitahu.

<h2>Penutup</h2>

Semoga artikel ini cukup menjawab bagi orang yang ingin memulai belajar hacking web. Seperti judulnya ini hanya car memulai saja. Biasanya kalau sudah memulai dan mencoba, berikutnya akan tahu sendiri harus belajar apa. Atau jika masih bingung ya bisa terus membaca writeup berbagai bug bounty.

Ilmu web security pada akhirnya akan berhubungan dengan banyak ilmu security lain jika kita melakukan pentesting. Misalnya kadang dari bug web kita bisa mendapatkan RCE (remote command execution), di situ kita bisa mencari jalan agar bisa masuk ke komputer lain. Dalam hal ini ilmunya sudah di luar scope hacking web, tapi masih masuk dalam scope pentesting. Atau kadang kita bisa mendapatkan source code server atau mobile app, dari situ berarti kita perlu bisa membaca kode (audit source code juga scopenya di luar hacking web, tapi masih masuk dalam scope pentesting).

~ Happy Hacking!

[web-ecurity-whitehat]: https://www.crcpress.com/Web-Security-A-WhiteHat-Perspective/Wu-Zhao/p/book/9781466592612
[tangled-web]: https://nostarch.com/tangledweb
[buku-sakti-hacker]: http://netcyberind.blogspot.com/2017/06/download-buku-sakti-hacker-pdf.html
[buku-101]: https://leanpub.com/web-hacking-101
[dvwa]: http://www.dvwa.co.uk/
[owasp]: https://www.owasp.org/index.php/Category:OWASP_Top_Ten_Project
[command-injection]: https://en.wikipedia.org/wiki/Code_injection
[news]: https://www.hackerone.com/blog/trytohack-Makes-History-First-Bug-Bounty-Hacker-Earn-over-1-Million
