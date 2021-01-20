module.exports = {
  async up(db) {
    await db.collection("users").insert({
      _id: "67514d3a-6bdd-487a-8521-647d2ece3b28",
      email: "e2e-test@gmail.com",
      username:"e2e-test",
      hashedPassword: "$2b$10$ZuZ3mGv5XqBBsB1d3By0HuPdY7c9Z6jWCeqNWliwWlzmDuC2dopEW",
      status: "CONFIRMED",
      createdAt: new Date(1611150991571),
      updatedAt: new Date(1611150991571),
    });
  },

  async down(db) {
    await db.collection("users").remove({
      email: "e2e-test@gmail.com",
    });
  }
};
