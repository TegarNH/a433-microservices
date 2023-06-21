# Tegar Naufal Hanip - tegarnauf_19

# Menggunakan base image node dengan tag 14-alpine (Node.js versi 14). Jika belum ada imagenya pada local maka akan otomatis terdownload dari Docker Hub.
FROM node:14-alpine

# Membuat directory '/app' pada container dan menjadikannya sebagai container working directory. Dengan ini, perintah setelah WORKDIR akan dieksekusi pada direktori '/app'. 
WORKDIR /app

# Menyalin semua file dan folder yang ada di local working directory ke dalam container working directory (berada di direktori '/app')
COPY . .

# Menginstall dependencies yang diperlukan order service
RUN npm install

# Mengekspos port 3000 yang digunakan oleh container untuk menjalankan order service pada port 3000
EXPOSE 3000

# Menjalankan perintah npm start pada terminal container untuk menjalankan order service
CMD ["npm", "start"]