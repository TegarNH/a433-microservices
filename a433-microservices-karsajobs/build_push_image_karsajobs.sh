# Tegar Naufal Hanip - tegarnauf_19

# Melakukan build image dari file Dockerfile menjadi image 'karsajobs' dengan tag latest
echo "======= BUILD IMAGE DOCKER ======="
docker build -t karsajobs:latest .

# Melihat daftar image yang tersedia pada local
echo "======= DAFTAR IMAGE ======="
docker image ls

# mengubah nama image sesuai dengan format Github Packages
echo "======= MENGUBAH NAMA IMAGE GITHUB PACKAGE ======="
docker tag karsajobs:latest ghcr.io/tegarnh/a433-microservices/karsajobs:latest

# Melakukan login ke github package milik TegarNH menggunakan metode Personal Access Token
echo "======= LOGIN GITHUB PACKAGE ======="
echo $GITHUB_PACKAGE_ACCESS_TOKEN | docker login ghcr.io -u TegarNH --password-stdin

# Mengunggah image yang sudah di build sebelumnya ke Github Package milik TegarNH
echo "======= PUSH IMAGE ======="
docker push ghcr.io/tegarnh/a433-microservices/karsajobs:latest