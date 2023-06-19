# Menggunakan base image node dengan tag 14-alpine (Node.js versi 14). Jika belum ada imagenya pada local maka akan otomatis terdownload dari Docker Hub.
FROM node:14-alpine

# Membuat directory '/app' pada container dan menjadikannya sebagai container working directory. Dengan ini, perintah setelah WORKDIR akan dieksekusi pada direktori '/app'. 
WORKDIR /app

# Tegar Naufal Hanip - tegarnauf_19

# Menyalin semua file dan folder yang ada di local working directory ke dalam container working directory (berada di direktori '/app')
COPY . .

# Mengatur environment aplikasi agar berjalan pada mode 'production' dan menghubungkannya dengan container yang bernama 'item-db' sebagai host database
ENV NODE_ENV=production DB_HOST=item-db

# Menginstall dependencies yang diperlukan aplikasi untuk mode production dan sekaligus menjalankan perintah build untuk melakukan build aplikasi
RUN npm install --production --unsafe-perm && npm run build

# Mengekspos port 8080 yang digunakan oleh container untuk menjalankan aplikasi pada port 8080 berdasarkan mode environment production 
EXPOSE 8080

# Menjalankan perintah npm start pada terminal container untuk menjalankan aplikasi Item App
CMD ["npm", "start"]