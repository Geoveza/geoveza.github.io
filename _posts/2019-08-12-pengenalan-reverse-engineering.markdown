---
layout: post
title:  "Pengenalan Reverse Engineering"
date:   2019-08-12 20:50:00 +0530
categories: Reverse Engineering
---
Sudah beberapa kali saya ditanya: kalo ada aplikasi X bagaimana cara membongkarnya? Bahasa kerennya: bagaimana saya melakukan [Reverse Engineering][reverse-engineering] terhadap aplikasi tertentu?. Sayangnya tidak ada jawaban sederhana untuk ini. Bagaimana membongkar sesuatu tergantung pada teknologi yang digunakan untuk membangun dan memproteksi benda itu. Berbagai tools juga bergantung pada sistem operasi yang menjadi target.

Saya sudah menulis secara umum tentang reverse engineering, tapi belum memberikan jawaban praktis, jadi di posting ini saya akan berusaha menuliskan secara praktis langkah-langkah untuk memulai reverse engineering.

Asumsi dalam tulisan ini

Asumsi saya: Anda tahu hal sangat dasar, seperti: apa bedanya [“source code”][source-code], [“file executable”][file-executeable], [“file data”,][file-data] dsb.  Jika Anda masih bingung dan berusaha membuka file source code atau file data dengan [IDA Pro][ida-pro], atau berusaha membuka executable dengan Notepad, maka saran saya adalah:
belajarlah dulu programming, belajar minimal meng-compile source code menjadi file executable.
belajar tool dasar seperti [hex editor][hex-editor], [text editor][text-editor], [image viewer][image-viewer]

Identifikasi

Tahap pertama dalam reverse engineering adalah identifikasi teknologi. Mari kita mulai dari satu contoh yang umum dulu: aplikasi Windows. Berikutnya akan saya bahas sedikit contoh aplikasi di OS lain. Aplikasi Windows bisa ditulis dalam ribuan bahasa pemrograman. Saya asumsikan aplikasinya sudah terinstall. Pertama yang harus kita cari adalah mencari tahu apa yang dieksekusi ketika shortcut aplikasi diklik. Ini dilakukan dengan melihat target shortcut (klik kanan pada shortcut, properties).

Jika kita menemui sebuah file batch (.BAT), maka kita perlu melihat apa yang dilakukan oleh file batch itu, misalnya bisa saja dia memanggil java dengan parameter file jar. Walau kadang Anda menemui file batch atau file lain, kemungkinan besar yang kita temui adalah file EXE, sekarang kita perlu mengetahui file ini melakukan apa.

Untuk mengetahui file EXE ini isinya apa, kita bisa memulai dengan PEID. Sebuah file Executable bisa saja dikompres atau dienkripsi atau keduanya. Beberapa sangat sederhana, misalnya menggunakan UPX (open source, gampang diunpack) tapi ada yang super rumit yang butuh debugger atau unpacker khusus untuk membongkarnya. Silakan dibaca berbagai tutorial bagaimana mendekompress dan atau mendekrip file tersebut (ini salah satu contoh unpacking sederhana).

Sebagian file EXE kadang hanya memanggil file/DLL lain, misalnya memanggil Java (contoh kasus: Android Studio). Dalam kasus ini file EXE bisa diabaikan karena kode utama ada dalam file JAR (Java archive). Kadang file EXE hanya membungkus skrip dalam bahasa lain, misalnya skrip python bisa dijadikan EXE dengan Py2EXE, skrip Ruby bisa dijadikan EXE dengan ocra, batch file bisa dijadikan EXE dengan bat to exe converter, dst.

Saat ini saya tidak menemukan satu tool yang bisa mengidentifikasi dengan tepat berbagai jenis file EXE, biasanya saya harus membuka dengan 7-zip (jika ternyata file tersebut adalah self decompressing archive) dan Hex editor. Dari berbagai string yang ada di file biasanya bisa diidentifikasi teknologi yang digunakan untuk menciptakan file tersebut.

Saya tidak akan menjelaskan semua teknologi yang bisa dipakai untuk membuat sebuah file aplikasi. Semoga sampel itu cukup untuk menjelaskan bahwa tidak ada satu jawaban: pakai tool X untuk membongkar sebuah aplikasi karena bahkan untuk mengidentifikasi saja tidak semudah itu. Ibaratnya kalau ada yang bertanya “mas bagaimana caranya merawat binatang peliharaan?” tentu jawabannya beda sekali antara ikan dan anjing, dan bahkan anjing jenis tertentu perawatannya berbeda sekali dari anjing lain.

Situasi di sistem operasi lain juga serupa. Di OS X kita perlu membuka bundle .app, lalu melihat ke dalamnya. Di dalam sebuah bundle Anda bisa melihat semua file executable, library, dan asset yang dipakai oleh sebuah aplikasi. Sebuah file .app di OSX bisa dibangun dengan berbagai teknologi juga, hampir sama banyaknya dengan EXE di Windows. Sebagai informasi: file IPA di iOS sebenarnya adalah file ZIP dan didalamnya ada .app.

Bongkar

Jika sudah berhasil mengidentifikasi: teknologi apa yang dipakai untuk membuat file EXE, maka kita bisa membongkarnya. Contoh: jika ternyata EXE dibangun dengan Python, kita bisa mengekstrak file pyc dan melakukan dekompilasi dengan uncompyle.

Di Windows saat ini banyak file EXE yang merupakan hasil kompilasi dari bahasa .NET (VB .NET/C#, dsb). File EXE seperti ini bisa dibuka dengan .NET decompiler (ada banyak yang komersial maupun open source). Umumnya jika tidak diobfuscate, maka kita bisa mendapatkan source codenya dengan mudah.

Jika kita berhadapan dengan kode java (.class/.jar) kita bisa menggunakan Java decompiler. Jika Aplikasi ditulis dengan Adobe Air, kita bisa menggunakan Flash decompiler. Jika aplikasi dibuat dengan Electron maka kita cuma perlu membaca HTML/JS dan menjalankan tool untuk mengembalikan JS dari minifier (menggunakan prettifier atau beautifier).

Tidak bisa saya sebutkan satu persatu semua tools yang mungkin dipakai karena ada terlalu banyak. Berbagai tools bermunculan dan hilang. Setiap kali sebuah teknologi diupdate, maka tools yang lama mungkin tidak akan bekerja dan perlu tools yang baru.

Di Android, file APK juga bisa dibangun dengan berbagai teknologi. Teknologi yang cukup umum saat ini: Java biasa (gampang dibongkar dengan dex2jar misalnya), Unity (menggunakan .NET), Cocos2D (native code), Cordova (HTML/JS), Adobe Air (ActionScript), Ruboto (Ruby), Kivy (Python), Corona SDK (Lua), dan masih banyak lagi.

Secara singkat: jika aplikasi dibangun dengan teknologi yang memakai VM/Interpreter maka biasanya ada decompilernya, walaupun tidak semua nama akan kembali. Jika aplikasi dikompilasi menjadi native code (dengan compiler C/Swift/Pascal/D/Go dsb) maka kita harus melakukan reverse engineering binary code/assembly.

Untuk tiap bahasa yang tidak menggunakan native code biasanya ada tools untuk bahasa tersebut yang namanya obfuscator. Obfuscator akan merename method dan variabel supaya sulit dipahami. Obfuscator yang sederhana hanya menggantikan nama kelas dan method menjadi karakter sangat singkat seperti a, ab, ac, yang rumit bisa menggunakan karakter-karakter tak terbaca dan memasukkan instruksi tambahan yang mempersulit pemahaman.

Tools seperti IDA Pro (resminya sangat mahal, ratusan juta) bisa melakukan dekompilasi kode menjadi bahasa mendekati C. Tapi kode yang dihasilkan IDA Pro kurang memuaskan jika program ditulis dalam bahasa selain C (misanya GO/Swift).

Hasil dari membongkar adalah:

Source code (jika Anda beruntung)
Hasil disassembly (jika tidak ad a decompiler untuk executable tersebut)
Pahami
Sekarang setelah berhasil “membongkar” sebuah aplikasi menjadi kode teks (baik teks source code dan/atau assembly), tahap berikutnya adalah memahami aplikasi tersebut, dan ini bagian tersulit. Mudahnya begini: apakah Anda pernah melihat source code berbagai aplikasi dan library open source yang Anda pakai? Jika belum, coba download source dari berbagai aplikasi (atau pergi ke github) dan coba pahami isinya.

Sebagian besar programmer yang saya kenal mengalami kesulitan jika harus membaca kode-kode library opensource, padahal kode ini memiliki nama variabel yang jelas, memiliki komentar, memiliki dokumentasi lengkap dan bahkan sebagian ada bukunya. Nah sekarang bayangkan membaca kode tanpa dokumentasi, tanpa nama yang jelas (bahkan kadang sengaja dibuat menyesatkan).

Analisis Dinamik

Untungnya ketika membongkar sesuatu biasanya kita hanya mengejar satu bagian spesifik. Contohnya: kita hanya ingin membypass registrasi, atau kita ingin mengekstrak sesuatu encryption key dari aplikasi, jadi kita tidak perlu memahami seluruh kode. Masalah utamanya adalah: mencari kode yang relevan yang kita inginkan. Untuk mencari ini dibutuhkan kesabaran yang sangat tinggi dan biasanya tidak cukup analisis statik (dengan membaca kode saja).

Analisis berikutnya adalah analisis dinamik menggunakan debugger. Artinya di sini kita menjalankan program yang ingin kita bongkar, lalu kita memulai titik penelusuran program dari sebuah titik. Sebuah program yang rumit biasanya meload banyak data (dari disk, dari jaringan), lalu memproses data tersebut. Dengan debugger kita bisa melihat berbagai data yang diload oleh program dan state program saat ini. Kemudian kita bisa memulai penelusuran hanya fungsi yang kita mau saja.

Contoh realnya: jika kita ingin mencari kode registrasi di aplikasi Windows kita bisa melakukan breakpoint di fungsi GetWindowText (ini hanya salah satu fungsi yang bisa digunakan untuk mengambil nilai textbox), lalu ketika kita pencet tombol “Register”, maka debugger akan berhenti di GetWindowText dan kita bisa meneruskan dari situ untuk mencari di mana pemeriksaan serial number dilakukan.

Belajarlah Memprogram

Saya tidak mencari ribuan file untuk saya reverse engineer dan pahami. Saya belajar dari sisi yang lain: memprogram. Ketika saya memprogram, saya akan membongkar file yang saya program. Saya berusaha memahami apa output file yang dihasilkan oleh tool dan berusaha mencari apakah ada cara untuk membongkarnya kembali.

Banyak sekali hal dasar akan bisa diketahui dari sekedar mengcompile lalu membongkar kembali program. Bahkan tidak selalu harus program buatan Anda sendiri, Anda bisa mencari berbagai program di github untuk dicompile lalu bongkar lagi. Anda bisa mendapatkan feeling setelah banyak melihat program. Feeling yang saya maksud seperti ini: filenya sangat kecil kemungkinan memakai C, ada lua.dll jadi ada lua interpreter di dalamnya. Seperti juga kalau Anda berkecimpung di dunia grafik akan segera tahu kira-kira ukuran file yang wajar untuk sebuah file JPG dengan dimensi tertentu.

Kemampuan programming juga penting untuk memanipulasi program yang ingin kita bongkar. Selain itu pemahaman akan berbagai aspek sistem operasi juga diperlukan (berbagai API yang ada di OS). Silakan lihat bahwa ada banyak trik yang saya pakai untuk menyelesaikan Flare On 2018.

Penutup

Tentunya tidak semua yang saya sarankan cocok buat Anda. Bagi yang suka langsung terjun mendalami assembly Intel bisa mencoba membaca Introductory Intel x86: Architecture, Assembly, Applications, & Alliteration. Alternatif lain adalah dengan membaca berbagai buku reverse engineering yang saat ini sudah ada, walau menurut saya kebanyakan buku hanya berfokus langsung pada native code. Jika Anda adalah tipe yang lebih gampang belajar dari contoh, Anda juga bisa mencoba berbagai tutorial di Internet untuk mengcrack program spesifik versi tertentu (ini ada satu blog yang relatif baru).

Semoga pengantar ini bisa sedikit menjawab pertanyaan: bagaimana membongkar program X dan bagaimana memulai reverse engineering. Intinya adalah: mengidentifikasi file yang akan dibongkar, mencari tool yang tepat untuk membongkarnya (unpacker, decompiler), dan memahami isinya (mungkin perlu dengan debugger untuk menelusuri programnya).

Terima kasih telah meluangkan sedikit waktu anda untuk membaca tulisan yang saya sampaikan bagi anda yang baru belajar merekayasa ulang perangkat elektronik atau program komputer, untuk part berikutnya tentang [Reverse Engineeing : Program Sederhana][update] akan saya update sesegera mungkin. Stay Tuned Guys!!.  

Referensi :

https://reverseengineering.stackexchange.com/questions/
https://www.owasp.org/index.php/OWASP_Reverse_Engineering_and_Code_Modification_Prevention_Project




[reverse-engineering]: https://id.wikipedia.org/wiki/Rekayasa_balik
[file-executeable]:   https://en.wikipedia.org/wiki/Executable
[file-data]: https://id.wikipedia.org/wiki/Berkas_komputer
[source-code]: https://simple.wikipedia.org/wiki/Source_code
[ida-pro]:https://www.hex-rays.com/products/ida/support/download.shtml
[hex-editor]:https://mh-nexus.de/en/hxd/
[text-editor]:https://code.visualstudio.com/
[image-viewer]:https://en.wikipedia.org/wiki/Image_viewer
[update]:#
