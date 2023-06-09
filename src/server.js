const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, DELETE, PUT"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/orders", require("./modules/orders"));
app.use("/testTask", require("./modules/testTask"));
app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/products", async (req, res) => {
  try {
    const insertQuery =
      "INSERT INTO items (title, image, price, weight,shop) VALUES ";
    const values = db
      .map(
        (product) =>
          `('${product.title}', '${product.image}', ${product.price}, ${product.weight}, ${product.shop})`
      )
      .join(", ");
    const query = insertQuery + values;

    await pool.query(query);

    res.send("Products inserted successfully");
  } catch (error) {
    console.error("Error inserting products:", error);
    res.status(500).send("An error occurred while inserting products.");
  }
});
app.post("/products2", async (req, res) => {
  try {
    const insertQuery =
      "INSERT INTO items (title, image, price, shop, type) VALUES ";
    const values = db
      .map(
        (product) =>
          `('${product.title}', '${product.image}', ${product.price}, ${product.shop},'${product.type}')`
      )
      .join(", ");
    const query = insertQuery + values;

    await pool.query(query);

    res.send("Products inserted successfully");
  } catch (error) {
    console.error("Error inserting products:", error);
    res.status(500).send("An error occurred while inserting products.");
  }
});
app.delete("/delete-products", async (req, res) => {
  try {
    const deleteQuery = "DELETE FROM products WHERE shop = 1";
    await pool.query(deleteQuery);
    res.send("Products deleted successfully");
  } catch (error) {
    console.error("Error deleting products:", error);
    res.status(500).send("An error occurred while deleting products.");
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
