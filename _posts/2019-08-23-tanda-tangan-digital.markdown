---
layout: post
title: "Tanda Tangan Digital (Digital Signature)"
date:   2019-08-23 21:52:59 +0530
categories: Security
---
Sebagian orang menyangka tanda tangan digital adalah tanda tangan manusia hasil scan/foto/ditulis dengan stylus, tapi dalam kriptografi, maksudnya bukan itu. Tandatangan digital bertujuan untuk membuktikan bahwa:

- seseorang tidak bisa menyangkal bahwa pernah menandatangani sebuah dokumen/file
- semua orang lain bisa memverifikasi bahwa tanda tangan tersebut valid
Ada banyak skema tanda tangan digital. Prinsipnya sama: ada key private yang dimiliki oleh penandatangan (signer) dan ada key publik yang disebarkan publik. Contoh algoritma yang bisa dipakai adalah RSA.

Secara praktis, untuk melakukan signing sebuah file, hal pertama yang dilakukan adalah: hash file tersebut. Pembahasan mengenai fungsi [Hashing][hasing], [padding][padding] terhadap hasil hashingnya akan saya bahas lebih detail pada artikel selanjutnya.

Setelah itu untuk menghasilkan tanda tangan digital dilakukan operasi “dekrip” RSA terhadap hash sebelumnya. Sebenarnya ini bukan benar-benda mendekrip sesuatu. Dinamai “dekrip” karena dilakukan perpangkatan dengan “private key”. Hasilnya adalah bilangan yang bisa direpresentasikan dalam bentuk hex, base64 atau apapun.

Untuk melakukan verifikasi file, maka langkah yang perlu dilakukan adalah:

- Hash file tersebut
- “Enkrip” signature dengan public key orang yang menandatangani dokumen tersebut
- Cek apakah hasilnya sama dengan hash yang dilakukan terhadap file

Skema signature ini sangat bergantung pada keamanan fungsi-fungsi yang membentuknya: hash (jika fungsi hash lemah, bisa dibuat file lain yang isinya berbeda tapi hashnya sama), padding (supaya tidak bisa dilakukan manipulasi terhadap hasil signature RSA, dan fungsi RSA itu sendiri (termasuk juga pemilihan bilangan primanya).

Seperti terlihat di tulisan ini, bahwa untuk memahami signing saja diperlukan pengetahuan mengenai:

- Encoding
- Hash
- RSA (jika algoritma signingnya bukan RSA, maka perlu tahu yang lain misalnya El Gamal)
- Padding

Nantinya di bagian lain signing ini juga jadi bagian dari sesuatu yang lebih kompleks. Tapi sebelum meneruskan lagi, saya akan membahas mengenai stream dan block cipher di bagian-bagian berikutnya.

[hasing]: #
[padding]: #