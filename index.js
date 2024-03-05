  import express from "express";
  import bodyParser from "body-parser";
  import pg from "pg";

  const app = express();
  const port = 3000;

  const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "Capstone_Book",
    password: "Delrosario21",
    port: 5434,
  });
  db.connect();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static("public"));

  let jjk = [
    {id: 1, name: "yuji", village: "japan" },
  ];

  app.get("/", async(req, res) => {
    try {
      const result = await db.query ("SELECT * FROM jjk ORDER BY id ASC");
      jjk = result.rows;

      res.render("index.ejs", {
        listItems: jjk,
      });
      console.log(jjk);
    } catch (err) {
      console.log(err);
    };
  });

  app.post("/add", async (req,res) => {
    const characterName = req.body.newName;
    const villageName = req.body.newVillage;
    try {
      await db.query("INSERT INTO jjk (name, village) VALUES ($1, $2)", [characterName, villageName]);
      res.redirect("/");
      console.log(characterName, villageName), "Post successfully"
    } catch (err) {
      console.log(err);
    };
  });

  app.post("/delete", async (req, res) => {
    const deletePost = req.body.deleteCharacter;

    try {
      await db.query("DELETE FROM jjk WHERE id = ($1)", [deletePost])
      res.redirect("/");
      console.log(deletePost);
    } catch (err) {
      console.log(err);
    };
  });


  app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
    