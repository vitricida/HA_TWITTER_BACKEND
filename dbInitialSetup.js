module.exports = async () => {
  // Ejecutar seeders de Usuarios(datos de prueba):
  await require("./seeders/userSeeder")();
  console.log("[Database] ¡Los datos de prueba para Usuarios fueron insertados!");
};
