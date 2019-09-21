---
layout: post
title:  "Mengenal Lebih Jauh CTF"
date:   2019-08-12 21:15:00 +0530
categories: CTF
---
Di posting ini saya hanya ingin memperkenalkan apa itu kompetisi security CTF (capture the flag). Posting ini akan membahas apa itu security CTF, apa manfaatnya ikut security CTF, seperti apa saja soal-soalnya, dan bagaimana caranya mulai ikut.

Sebenarnya selain security CTF ada berbagai CTF yang lain, tapi dalam posting ini selanjutnya saya akan menyebut CTF saja untuk security CTF. Setelah ikutan CTF-nya [CTFWITHGOOGLE][ctfwithgoogle] saya jadi lebih tertarik dengan CTF lalu iseng mencoba mendirikan sebuah team "4Y4M_JAG0" bersama teman-teman lainya. Harapan saya ingin memperkenalkan CTF ini ke publik, supaya suatu saat team dari Indonesia bisa masuk minimal 10 besar di https://ctftime.org/ Aminn!!.

<h2>Apa itu CTF</h2>

CTF adalah satu jenis kompetisi di bidang information security, biasanya formatnya ada tiga: jeopardy, attack-defence, dan mixed. Dalam format jeopardy, kita diminta menyelesaikan berbagai task, dan mendapatkan poin, pemenangnya adalah yang poinnya paling banyak. Dalam format attack-defence, tiap team menyerang dan mempertahankan sistem komputer yang diberikan kepada team tersebut. Format mixed artinya campuran dari kedua itu (tergantung panitianya, mungkin ada aturan khusus).

Setiap kita menyelesaikan soal, kita akan mendapatkan sebuah string yang jadi flagnya (misalnya “Flag{MyFlag}”), dan kemudian kita submit string tersebut ke sistem submisi, sebagai tanda bahwa kita berhasil menyelesaikan soalnya.

<h2>Manfaat ikut CTF</h2>

Selain menyenangkan (untuk refreshing) disisi lain malah membuat stress karena tidak kunjung mendapatkan flag :v, mengikuti CTF juga bermanfaat untuk menguji dan menyegarkan skill penetration testing (dari mulai networking, kriptografi sampai programming), ilmu mencari di Google (ilmu [Google-fu][google-fu] / Dorking), serta memaksa kita mengikuti perkembangan terbaru. Untuk Anda yang merasa jago dan sudah mengenal berbagai aspek komputer, inilah ajang untuk menguji kemampuan Anda.

Untuk Anda yang ingin jadi hacker, atau hobinya ngehack akun mantan/gebetan, ini adalah ajang legal tingkat dunia di mana Anda bisa menunjukkan kebolehan Anda. Perlu diingat, bahwa di sini Anda diminta untuk menyelesaikan tugas, bukan menyerang server dengan DOS (denial of service attack). Di hampir tiap event CTF selalu ada yang melakukan ini. Ini sama saja seperti Anda diminta bertanding bersama dengan orang-orang, tapi karena Anda nggak mampu bertanding, Anda malah merusak tempat pertandingannya, sehingga tidak ada yang bisa bertanding di situ.

<h2>Team</h2>

Sebagian besar event CTF ditujukan untuk team, dan tidak dibatasi jumlah anggota teamnya, sebagian kecil CTF membatasi jumlah anggota team (terutama untuk lomba offline / on-site), dan sebagian lagi hanya ditujukan untuk individu.

Hadiah dan Ranking
Banyak event CTF yang memberikan hadiah, mulai dari hadiah kecil seperti lisensi software, sampai hadiah besar seperti uang cash atau tiket liburan. Biasanya hanya sedikit yang mendapatkan hadiah karena hanya beberapa pemenang saja, tapi banyak yang ikut semua CTF karena ingin belajar, dan mendapatkan ranking tinggi. Situs ctftime.org mentrack tim-tim yang mendaftar di situs mereka, dan memberikan rangking berdasarkan pencapaian dalam tiap event CTF (tiap event bobotnya berbeda). Situs tersebut juga berisi link ke banyak soal dan pembahasan (istilahnya writeup).

<h2>Bentuk Kompetisi</h2>

Kebanyakan CTF online sifatnya jeopardy (walau ada juga yang attack defence, dengan akses VPN), dan hampir semuanya gratis untuk diikuti siapa saja. Sebagian CTF hanya memberikan soal kategori tertentu saja, tapi kebanyakan CTF memberikan soal campuran dalam berbagai kategori.

<h2>Jenis soal</h2>

Saya akan membahas beberapa kategori yang biasanya ada: web, crypto, forensic, reversing, pwnables, dan misc. Biasanya dalam tiap kategori ada pointnya, yang menyatakan tingkat kesulitan soalnya, misalnya web100 lebih mudah dari web200.

Perlu dicatat bahwa semua soal dalam sebuah CTF jarang sekali bisa diselesaikan dengan tool standar. Contohnya: Anda tidak bisa menjalankan sqlmap langsung untuk mendapatkan akses via SQL Injection (biasanya panitia sudah merancang soalnya seperti itu). Jadi script kiddies yang cuma bisa memakai tool akan segera berguguran.

Soal dalam kategori web biasanya adalah bagaimana masuk ke web site tertentu, atau bagaimana mendapatkan hak akses tertentu (misalnya dari user biasa mendapatkan hak akses admin). Cara masuk webnya bisa berbagai cara, misalnya bisa dari SQL injection, XSS injection, hash extension attack, dsb. Di sini keahlian yang dibutuhkan adalah pemahaman yang baik mengenai teknologi web.

Sesuai namanya, soal dalam kategori crypto berhubungan dengan kriptografi. Soalnya bisa sangat sederhana (ini contoh writeup cryptanalysis untuk menyelesaikan substitution cipher), sampai lebih rumit, misalnya mencari kelemahan dari custom encryption yang diberikan. Di sini ilmu kriptografi sangat diperlukan.

Soal dalam kategori forensic meminta kita mengekstrak flag dari data yang diberikan (jadi biasanya kita tidak berurusan dengan memahami/reverse kode program). Contohnya: mengekstrak informasi yang disembunyikan dengan steganography, mengekstrak data dari disk image, memory dump. Pemahaman mengenai berbagai format data dibutuhkan untuk menyelesaikan soal-soal dalam kategori ini.

Soal dalam kategori reversing meminta kita mereverse engineer sebuah kode (bisa binary, bisa source code), tujuannya untuk mendapatkan flag dari kode tersebut. Keahlian untuk membaca kode assembly biasanya diperlukan untuk menyelesaikan ini (walaupun kadang soalnya bisa berupa source code, [seperti yang saya bahas di sini][pengenalan-reverse-engineering])

Soal dalam kategori <h5>Pwnables</h5> meminta kita mengexploit service yang berjalan di suatu mesin remote. Source dan atau binary (biasanya sih hanya binary saja) dari service yang berjalan akan diberikan dalam soal. Ini merupakan gabungan dari reverse engineering dan exploit writing. Dalam kategori soal reversing, kode diberikan kepada kita dan dijalankan di mesin kita, sementara dalam pwnables, kode dijalankan di mesin remote, dan flag yang harus kita ambil ada dalam mesin remote tersebut.

Soal dalam kategori misc tidak termasuk dalam semua kategori di atas, dan kadang-kadang gabungan dari kategori-kategori di atas.

Berbagai writeup untuk semua kategori di atas bisa dilihat di https://ctftime.org/writeups

<h2>Mulai Ikutan</h2>

Jika ingin ikut sebuah CTF, bisa langsung mendaftar untuk event terdekat, yang bisa dilihat di https://ctftime.org/event/list/upcoming, hampir tiap minggu ada event baru. Kadang ada juga event yang tidak terdaftar di situ, misalnya pada 07 september 2019 Idsiirti & BSSN mengadakan [Cyber Jawara][cyber-jawara] secara online dan final diadakan on-site.

Jika event sifatnya adalah team, Anda tetap bisa mendaftar sebagai individu (atau buat saja team dengan anggota satu orang). Jika punya teman-teman yang tertarik hal yang sama, Anda bisa mendaftar bersama. Ketika event berlangsung, semua bisa bertemu (baik di dunia nyata ataupun maya) untuk membahas dan mengerjakan soalnya.

Silakan mencari-cari event dan silakan mencoba. Event CTF biasanya 48 jam atau lebih dan biasanya weekend, jadi Anda bisa meluangkan waktu sebisanya di weekend, karena gratis, Anda juga nggak akan rugi uang. Sebagian orang memakai nama asli, tapi kebanyakan memakai nickname ketika mendaftar, jadi Anda juga tidak akan merasa malu kalau kalah (atau tidak jadi mengerjakan soalnya jika sibuk saat weekend).

Selain event online, di Indonesia sudah diadakan juga beberapa event CTF offline, tapi sayangnya ini tidak banyak didokumentasikan (jarang yang menulis writeupnya), dan kadang eventnya sangat lokal (misalnya : [Cyber Jawara][cyber-jawara] diselenggarakan Idsirtii & BSSN). 

[cyber-jawara]: https://jawara.idsirtii.or.id/
[pengenalan-reverse-engineering]: https://geoveza.me/reverse/engineering/2019/08/12/pengenalan-reverse-engineering.html
[google-fu]: https://en.wiktionary.org/wiki/Google-fu
[ctfwithgoogle]: https://en.wiktionary.org/wiki/Google-fu