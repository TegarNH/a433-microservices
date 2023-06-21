// Tegar Naufal Hanip - tegarnauf_19

// Mengimport library 'dotenv' untuk memuat semua variabel yang ada di file .env.
require('dotenv').config()

// Mengimport library 'express' untuk membuat web server dan menyimpan objectnya ke dalam variabel app.
const express = require("express");
const app = express();

// Mengimport library 'body-parser'.
const bp = require("body-parser");

// Mengimport library 'amqplib' untuk berinteraksi dengan message queue RabbitMQ.
const amqp = require("amqplib");
const amqpServer = process.env.AMQP_URL; // Mengambil nilai URL RabbitMQ pada file .env.
var channel, connection;

// Menjalankan fungsi 'connectToQueue()' untuk terhubung ke message queue RabbitMQ dan mengonsumsi data untuk ditampilkan ke terminal.
connectToQueue();

async function connectToQueue() {
  // Melakukan try-catch apabila terjadi error pada saat mengkoneksikan ke server RabbitMQ atau saat mengonsumsi data
  try {
    // Membangun koneksi ke server RabbitMQ menggunakan URL AMQP dari file .env.
    connection = await amqp.connect(amqpServer);
    // Membuat channel dari koneksi yang sudah dibuat untuk komunikasi
    channel = await connection.createChannel();
    // Memastikan keberadaan queue 'order'
    await channel.assertQueue("order");

    // Mengonsumsi data dari queue 'order' dan menampilkan datanya pada terminal
    channel.consume("order", data => {
      console.log(`Order received: ${Buffer.from(data.content)}`);
      console.log("** Will be shipped soon! **\n");
      // Mengakui data untuk menghapusnya dari queue
      channel.ack(data);
    });
  } catch (ex) {
    console.error(ex); // apabila terdapat error, akan ditampilkan ke terminal
  }
}

// Mulai menjalankan server dan dengarkan pada port yang ditentukan dari variabel environment yang berada di file .env.
app.listen(process.env.PORT, () => {
  console.log(`Server running at ${process.env.PORT}`);
});
