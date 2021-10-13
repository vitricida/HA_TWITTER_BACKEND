module.exports = async () => {
  // Ejecutar seeders de Usuarios(datos de prueba):
  await require("./seeders/userSeeder")();
  await require("./seeders/tweetSeeder")();
  await require("./seeders/likeSeeder")();
};
