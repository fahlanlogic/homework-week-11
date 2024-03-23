# Workflows and Rules

Konfigurasi yang terdapat di file `config > config.js` merupakan configurasi environment tingkat akhir/CI dan container Docker.

## Menjalankan program di localhost (langkah awal penting)
Untuk menjalankan program didalam **localhost** perlu untuk mengubah `config.js` pada **environtment development** dengan mengubah nilai `host: "localhost",` pada baris 9 (seharusnya) dan untuk melakukan test juga ubah nilai `host: "localhost",` pada baris 17.

### Langkah program hit API todolist di local
- Buat database sesuai environment development = `sequelize db:create --env development` perintah ini akan otomatis memberi nama databasemu sesuai file .env
- Migrasi kan model = `sequelize db:migrate` ini akan otomatis melakukan migrations pada seluruh file didalam folder migrations
- Seeding data = `sequelize db:seed:all` ini akan mengisi tabel mu yang masih kosong dengan data baru yang berasal dari dalam folder seeders
- Selanjutnya kamu bisa menjalankan API pada port `8000`

### Langkah program unit test di local
Cukup jalankan perintah `npm run test` maka proses testing akan berjalan

## Menjalankan program di Docker Container
Untuk menjalankan dalam linkungan container, kamu tidak perlu lagi mengedit `config.js`, karena sudah ter-atur untuk docker. Beberapa hal penting sebelum kamu membuat container:
1. **PORT** pada database container berjalan di `5430`
2. **PORT** hit API berjalan di `8000` **perlu diperhatikan bahwa server localhost dengan container tidak bisa berjalan secara paralel dikarenakan config host nya berbeda. Keduanya berjalan di port 8000 sehingga akan mengakibatkan conflict server**

### Langkah program hit API di container
- Jalankan perintah `docker compose up` untuk membangun sekaligus menjalankan seluruh container yang terdapat di file `docker-compose.yaml`
- Lalu kamu bisa langsung jalankan API di port `8000`

### Langkah program unit test di container
Untuk menjalankan unit test di dalam container kamu perlu lakukan beberapa langkah berikut:
- Buka terminal baru dan jalankan perintah `docker ps` copy id container yang barusan kamu up, dan jalankan perintah `docker exec -it <id_container> sh`
- Jika sudah masuk ke dalam terminal container
- Jalankan perintah `npm run docker-test` hasil test akan terlihat

Khusus script npm run ci-test digunakan untuk melakukan proses CI unit testing.

Terimakasih, semoga membantu.
