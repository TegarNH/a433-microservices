// Tegar Naufal Hanip - tegarnauf_19

// Mengimport library 'dotenv' untuk memuat semua variabel yang ada di file .env.
require('dotenv').config()

// Mengimport library 'express' untuk membuat web server dan menyimpan objectnya ke dalam variabel app.
const express = require("express");
const app = express();

// Mengimport library 'body-parser' untuk mengurai data JSON pada request body HTTP.
const bp = require("body-parser");
app.use(bp.json());

// Mengimport library 'amqplib' untuk berinteraksi dengan message queue RabbitMQ.
const amqp = require("amqplib");
const amqpServer = process.env.AMQP_URL; // Mengambil nilai URL RabbitMQ pada file .env.
var channel, connection;

// Menjalankan fungsi 'connectToQueue()' untuk terhubung ke message queue RabbitMQ.
connectToQueue();

async function connectToQueue() {
  // Membangun koneksi ke server RabbitMQ menggunakan URL AMQP dari file .env.
  connection = await amqp.connect(amqpServer);
  // Membuat channel dari koneksi yang sudah dibuat untuk komunikasi
  channel = await connection.createChannel();

  // Melakukan try-catch apabila terjadi error pada saat mengkoneksikan ke server RabbitMQ
  try {
    const queue = "order";
    await channel.assertQueue(queue);
    console.log("Connected to the queue!")
  } catch (ex) {
    console.error(ex); // apabila terdapat error, akan ditampilkan ke terminal
  }
}

// Menangani permintaan POST ke endpoint '/order'.
app.post("/order", (req, res) => {
  // Mengambil data 'order' dari request body.
  const { order } = req.body;
  // Memanggil fungsi 'createOrder' untuk mengirim pesanan ke message queue.
  createOrder(order);
  // Mengirim data 'order' kembali sebagai respons.
  res.send(order);
});

// Fungsi untuk mengirim data order ke message queue.
const createOrder = async order => {
  const queue = "order";
  // Mengubah data object order menjadi string JSON dan mengirimkan ke queue.
  await channel.sendToQueue(queue, Buffer.from(JSON.stringify(order)));
  console.log("Order succesfully created!")

  // Menangkap sinyal SIGINT (Ctrl+C) untuk menutup koneksi dan menghetikan program.
  process.once('SIGINT', async () => {
    console.log('got sigint, closing connection');
    await channel.close();
    await connection.close();
    process.exit(0);
  });
};

// Mulai menjalankan server dan dengarkan pada port yang ditentukan dari variabel environment yang berada di file .env.
app.listen(process.env.PORT, () => {
  console.log(`Server running at ${process.env.PORT}`);
});

