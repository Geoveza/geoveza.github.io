---
layout: post
title:  "Menjadi Bug Hunter"
date:   2019-08-22 21:19:59 +0530
categories: Security
---

Tulisan ini adalah pengantar untuk tulisan-tulisan saya berikutnya dalam topik security yang akan saya publish dalam beberapa hari ke depan. Saya akan mendeskripsikan bug-bug yang cukup fatal dalam beberapa aplikasi Indonesia yang pernah saya temukan. Semua bug ini sudah diperbaiki, jadi tidak berbahaya bagi siapapun. Yang sudah saya rencanakan adalah: BCA e-money, Go-jek, Google, Tokopedia, Bukalapak,.

Sebagian akan ada yang mempertanyakan: untuk apa mendeskripsikan bug yang sudah diperbaiki? nanti cuma akan mempermalukan perusahaan itu saja, tidak ada gunanya!. Mendeskripsikan bug sudah merupakan hal yang sangat lazim dilakukan setiap hari di dunia security. Bahkan Google juga memeriksa bug-bug software perusahaan lain melalui [Project Zero][project-zero], [di blog project zero][blog-project-zero], Anda bisa melihat berbagai bug dari mulai Antivirus sampai sistem operasi.

Kegunaan pertama mendeskripsikan bug adalah bagi developer lain: agar pembuat software lain belajar dari kesalahan itu. Kegunaan kedua adalah bagi pentester lain: pentester bisa belajar memeriksa bug jenis baru yang mungkin kurang umum (atau diingatkan lagi bahwa bug tertentu masih sangat umum). Kegunaan ketiga adalah bagi penemu bug itu: dia bisa menceritakan dan menunjukkan keahliannya.

Sekarang saya akan mundur sedikit: buat apa sih memeriksa bug aplikasi orang lain?. Ada beberapa motivasi untuk hal ini, Motivasinya bisa baik, bisa abu-abu dan bisa juga jahat.

Motivasi yang menurut saya paling baik adalah jika kita dibayar untuk melakukan testing/pentesting. Motivasi ini sudah sangat jelas sekali: uang yang legal. Motivasi berikutnya adalah iseng-iseng berhadiah. Beberapa perusahaan, seperti Google, Facebook dan Microsoft, memberikan reward terhadap bug yang ditemukan. Perlu diketahui: meskipun sudah diberi reward, tetap saja bug boleh dideskripsikan dalam bentuk tulisan.

Motivasi jahat tentunya juga ada: ingin mencuri data atau uang dari perusahaan tertentu, motivasi ini juga jelas.

Ketika tidak dibayar khusus untuk mencari bug, motivasi saya mencari bug biasanya adalah rasa ingin tahu. Trigger rasa ingin tahu ini bisa banyak. Contoh kasus: teman saya di sebuah startup posting mengenai deployment dengan git di facebooknya, lalu saya cek di website startupnya: ternyata folder gitnya bisa diakses umum (artinya semua source code, history source code, berbagai API keys bisa diakses).

Contoh lain: Teman saya mengirimkan adb log untuk menanyakan sebuah bug. Selain bug aplikasinya, di adb log yang dikirimkan saya melihat informasi penting dari sebuah aplikasi banking, jadi saya eksplor lebih lanjut bug tersebut.

Kadang error message juga bisa memicu rasa ingin tahu saya. Contoh: setelah saya membayar belanja di sebuah toko komponen elektronik online, saya browsing barang lain: dan menemukan error message. Ternyata situs tersebut memiliki SQL injection. Saya segera memeriksa: apakah akun e-money disimpan? apa saja info yang disimpan. Ketika saya tahu bahwa akun e-money saya disimpan di database, dengan lengkap, tanpa enkripsi, bisa dilihat siapa saja, saya langsung menghubungi pemilik situsnya. Di sini motivasi saya berubah, dari sekedar penasaran, menjadi mengamankan diri sendiri: wah gawat, jangan-jangan sudah ada yang mencuri akun e-money saya :v.

Motivasi mengamankan diri sendiri juga merupakan motivasi yang kuat. Sejak kejadian itu, saya selalu memeriksa keamanan dasar sebuah situs sebelum membayar sesuatu, karena saya khawatir orang lain akan mencuri data saya. Sebenarnya di dunia fisik sehari-hari, orang-orang di Indonesia sangat memperhatikan masalah keamanan ini, misalnya jika akan meninggalkan helm di motor, orang-orang akan memeriksa dulu: apakah ada satpam di sini? apakah kira-kira dijepit saja sudah cukup aman? ataukah perlu kita bawa masuk helmnya?.

Semoga deskripsi di atas cukup menggambarkan: kenapa sih orang-orang mau ngecek bug app lain. Sebagian akan berpikir: kegiatan itu harusnya illegal. Dengan interpretasi hukum yang strict: kegiatan itu memang bisa dianggap illegal. Tapi jika peneliti yang sifatnya white hat tidak diperbolehkan, maka orang-orang black hat akan tetap ada, dan korban akan ada banyak.

Kegiatan testing white hat tanpa ijin ini analoginya begini (walau mungkin tidak 100% tepat): Anda melihat papan kayu yang sepertinya bisa digeser untuk masuk ke tempat yang seharusnya bayar. Anda tidak yakin apakah benar papan kayunya bisa digeser, dan apakah Anda bisa masuk. Jadi Anda coba geser, dan ternyata cukup besar untuk bisa masuk, lalu Anda keluar lagi, kemudian melaporkan hal itu ke pemiliknya. Secara strict: Anda sudah melanggar hukum karena sudah masuk tanpa ijin. Tapi kenyataannya: Anda tidak merugikan siapa-siapa, dan Anda membantu pemilik tempat tersebut mengamankan tempatnya.

Orang jahat mungkin akan segera memikirkan model bisnis: saya akan menarik bayaran setengah harga resmi. Akan saya tutup mata orang, saya bawa masuk lewat lubang itu, dan buka mata lagi setelah sampai di dalam (jadi tidak ada yang tahu di mana lubangnya).

Tentunya Anda bisa membayangkan bahwa reaksi orang ketika diberi tahu ada bug beraneka ragam. Beberapa yang pernah saya temui:

- berterima kasih, langsung membetulkan
- berterima kasih, memberikan voucher/reward
- tidak merespon, sampai harus dihubungi melalui berbagai cara, lalu diperbaiki diam-diam
- tidak merespon, tapi setelah dihack baru sang admin mulai notice

Mengingat bahwa sering kali memberitahukan bug adalah hal yang melelahkan, kadang malah dibego-begoin, diancam dituntut, saya kadang malas memberitahukan sebuah bug, apalagi kalau menurut saya itu tidak terlalu penting.

Saran saya buat perusahaan besar: coba buat program bug bounty. Tanpa program bug bounty, kemungkinan hanya blackhat yang akan mencoba mencari bug di situs Anda, dan kalau ketemu, mungkin akan dimanfaatkan untuk kepentingannya sendiri.

Jika tidak ada program bug bounty, sebagian perusahaan, seperti misalnya Apple, hanya mencantumkan nama orang yang melaporkan bugnya. Para pelapor bug mendapatkan reward bahwa namanya terpajang di website Apple.

Tapi yang paling utama adalah: responlah dengan baik. Saya agak kurang mengerti dengan respon negatif dari sebagian orang dengan laporan bug yang sederhana, jelas, dan tidak merugikan. Apakah kira-kira lebih senang jika bugnya langsung dilempar ke forum secara anomim, dan perusahaan Anda langsung rugi puluhan/ratusan juta, dan kemungkinan Anda langsung dipecat?

Orang-orang super pintar yang bekerja di Facebook dan Google, yang memiliki software development cycle yang ketat, yang memiliki arsitektur yang baik, yang menggunakan metode testing terkini, yang memiliki team pentester internal, masih butuh masukan dari pihak luar yang masih menemukan bug yang tidak ditemukan oleh tim internal mereka. Jadi jangan anggap diri Anda sudah pintar, punya pengalaman belasan atau puluhan tahun di dunia security. Be humble.

Perlu dicatat bahwa peneliti keamanan berhak menerbitkan segala temuan bugnya (setahu saya tidak ada larangan untuk hal ini), apalagi jika bugnya sudah diperbaiki. Kadang jika developer ngotot atau malas tidak mau memperbaiki dalam jangka waktu tertentu, maka mempublikasikan bug adalah hal yang terbaik, karena bisa mendorong developer untuk cepat bekerja, atau membuat user pindah ke produk lain.

Dalam dunia security ada yang namanya [Full Disclosure][full-disclosure], bahwa bug itu perlu dijelaskan dan dideskripsikan dengan detail ke publik demi keamanan bersama, dan ada yang namanya [Responsible Disclosure][respon-disclosure], yang sama dengan full disclosure, tapi memberikan waktu bagi developer untuk memperbaiki bug tersebut. Saya termasuk penganut responsible disclosure, jadi selalu memberikan waktu sebelum membuat sesuatu jadi publik. Kalau bisa, saya akan kontak dengan developernya langsung, supaya diperbaiki segera, tanpa melibatkan managemen atau pihak atas, dan tidak perlu ribut-ribut tidak penting.

Seorang peneliti security tidak boleh meminta uang ke developer/vendor dengan ancaman akan membeberkan bugnya. Ini namanya pemerasan, termasuk dalam kegiatan blackhat.

Seorang whitehat hanya mencari bug, melaporkannya, dan mungkin menerbitkan blog atau tulisan mengenai bug tersebut. Tapi jika pihak developer/vendor merasa bahwa bug tertentu akan sangat merugikan mereka jika diketahui orang, dan vendor yang mengajukan “uang tutup mulut”, maka itu terserah kepada security researcher untuk menerima uang tersebut atau tidak. Saya sendiri lebih suka mempublish hasil temuan saya, kalo temuan itu menurut saya “keren” karena tidak umum, tapi saya berhasil menemukannya.

Alternatif lain: vendor bisa menyewa researcher tersebut dengan kontrak untuk tidak membuka bug apapun kepada umum. Saya sendiri menyambi menjadi pentester, dan untuk pekerjaan itu, ada dokumen yang perlu saya tandatangani, jadi saya tidak akan menuliskan bug-bug dari pekerjaan saya, hanya yang di luar kontrak saja.

Kadang pihak vendor berusaha menggunakan pengadilan untuk mengancam security researcher agar menutup mulutnya. Hal ini biasanya berhasil juga (hanya perlu uang membayar pengacara). Tapi researcher bisa menyebutkan ke publik: saya menemukan bug di produk perusahaan X, tapi tidak diperbolehkan membeberkannya. Biasanya efeknya lebih buruk lagi: orang-orang menjadi tidak percaya pada produk X tersebut. Jadi, coba dipikirkan baik-baik dalam merespon sebuah laporan keamanan.

Semoga uraian ini cukup menjelaskan mengenai motivasi saya mencari bug di awal, sampai kenapa bug tersebut perlu dituliskan.

[respon-disclosure]: https://en.wikipedia.org/wiki/Responsible_disclosure
[full-disclosure]: https://en.wikipedia.org/wiki/Full_disclosure_(computer_security)
[blog-project-zero]: https://googleprojectzero.blogspot.com/
[project-zero]: https://en.wikipedia.org/wiki/Project_Zero
