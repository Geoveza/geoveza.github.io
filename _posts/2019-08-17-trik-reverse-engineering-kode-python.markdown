---
layout: post
title:  "Trik Reverse Engineering Kode Python"
date:   2019-08-17 11:31:00 +0530
categories: Reverse Engineering
---
Entah kenapa akhir-akhir ini saya banyak melihat pertanyaan mengenai reverse engineering kode Python yang sudah di-obfuscate, baik di Facebook maupun Telegram. Sudah ada beberapa artikel dalam Bahasa Indonesia yang membahas ini misalnya Bermain dengan Python Bytecode dan  Reverse Engineering Python Bytecode. Kedua artikel itu sudah bagus, jadi saya sarankan untuk membaca kedua artikel itu untuk dasar reversing bytecode Python.

Artikel ini hanya ingin membahas trik untuk mempermudah revers engineering proteksi tertentu yang memakai marshal dan gagal didekompilasi.
Setelah membaca kedua artikel tersebut, beberapa hal yang penting diketahui adalah:
Sebuah fungsi atau modul (file) python bisa didapatkan byte codenya (dengan marshal yang merupakan modul bawaan Python)
Kita bisa mengeksekusi hasil marshal dengan exec marshal.loads(bytecode)
File pyc sebenarnya hanyalah file marshal dengan header
Bytecode bisa dilihat versi teksnya dengan dis (modul bawaan Python juga)
Ada decompiler (uncompyle6) yang bisa mengembalikan (mendekompilasi) kode pyc  kembali menjadi kode Python, tapi ini tidak selalu berhasil
Beberapa proteksi yang dilakukan secara umum seperti ini:Kode python dicompile menjadi pyc, headernya dihapus, dan dijadikan string, jadinya:
''
exec marshal.loads(bytecode);
Seperti sudah dibahas di artikel lain, untuk mendekompilasi kita bisa mengambil bytecode, menuliskan ke file dan menambah header, lalu kita decompile dengan kode seperti ini:

bytecode = '....' #isi bytecode di sini

import imp
magic_number = imp.get_magic()

import struct, time
timestamp = struct.pack('i', int(time.time()))

with open('temp.pyc', 'wb') as f:
    f.write(magic_number)
    f.write(timestamp)
    f.write(bytecode)
''

Lalu kita coba decompile filenya (uncompyle6 temp.pyc). Tapi kadang dekompilasi ini gagal, contohnya adalah di artikel: Reverse Engineering Python Bytecode. Cara yang pasti berhasil adalah dengan membaca bytecodenya (seperti dijelaskan di artikel tersebut), walau kadang ini sulit jika kodenya rumit.

Di sini saya akan menjelaskan trik untuk proteksi sejenis. Perhatikan bahwa di dalam bytecode file tersebut diakhiri dengan:
''
12     >> 39161 LOAD_NAME                0 (marshal)  #
          39164 LOAD_ATTR                8 (loads)    #
          39167 LOAD_NAME                2 (e)        #
          39170 CALL_FUNCTION            1            # marshal.loads(e)
          39173 LOAD_CONST               1 (None)     #
          39176 DUP_TOP                               #
          39177 EXEC_STMT                             # exec(marshal.loads(e))
          39178 LOAD_CONST               1 (None)     #
          39181 RETURN_VALUE                          #
''
Yang artinya, pasti ada kode dekripsi, dan terakhir memanggil: exec marshal.loads. Dalam kasus ini saya tidak peduli proses dekripsinya bagaimana. Tapi saya memperhatikan bahwa tidak ada fungsi berbahaya yang dipanggil selain marshal.loads.
Sekarang trik cara mendapatkan kodenya yang terdekrip tanpa harus membaca dan memahami bytecodenya: kita bisa memaksa agar tidak memanggil marshal, tapi marshax (saya ganti huruf terakhir), lalu membuat modul marshax yang akan menuliskan hasil dekripsi ke file.
Contohnya begini: saya simpan kode yang sudah di-marshal ke file temp, lalu saya baca, ganti teks marshal dengan marshax dan eksekusi. Karena sudah diubah, maka ini akan error karena modul marshax tidak ada,

''
import marshal

with open("temp", "rb") as f:
  c = marshal.loads(f.read().replace("marshal", "marshax"))
exec c
Tujuan kita adalah untuk menangkap kode yang sudah didekrip. Jadi untuk ini kita buat file marshax.py di direktori yang sama dengan isi:

def loads(x):
    with open("temp2", "w") as f:
        f.write(x)
''
Hasilnya, ketika exec c dipanggil, fungsi loads di marshax yang akan dipangil dan akan menuliskan kode yang sudah didekrip ke dalam file temp2.
Sekarang file temp2 bisa dicoba diberi header dan didecompile lagi. Jika dekompilasi gagal dan masih berakhir dengan marshal.loads lagi, ulangi langkah yang sama.
Demikian trik kecil dari saya. Semoga bisa membantu reverse engineering file Python lain. Teknik serupa (mengganti implementasi kode) juga bisa diterapkan di kasus lain. Semoga semakin banyak lagi yang menuliskan artikel reverse engineering dalam bahasa Indonesia, sehingga mudah saya link seperti di posting ini.
