const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

// Get exercises - Slash(/) references "/api/exercises" from index.js
router.get("/", async (req, res) => {
    const exercises = await loadExercisesCollection();
    res.send(await exercises.find({}).toArray());
});

// Add exercise
router.post("/", async (req, res) => {
    const exercises = await loadExercisesCollection();
    await exercises.insertOne({
        title: req.body.title,
        type: req.body.type,
        muscle: req.body.muscle,
        description: req.body.description,
    });
    res.status(201).send();
});

// Update exercise
router.put("/:id", async (req, res) => {
    const exercises = await loadExercisesCollection();
    await exercises.updateOne(
        { _id: new mongodb.ObjectID(req.params.id) },
        {
            $set: {
                title: req.body.title,
                type: req.body.type,
                muscle: req.body.muscle,
                description: req.body.description,
            },
        }
    );
    res.status(200).send();
});

// Delete exercise
router.delete("/:id", async (req, res) => {
    const exercises = await loadExercisesCollection();
    await exercises.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
    res.status(200).send();
});

// DB/client connect
async function loadExercisesCollection() {
    const client = await mongodb.MongoClient.connect(
        "mongodb+srv://zbsjr:1245zoilO@cluster0.klu38.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
        { useNewUrlParser: true }
    );

    return client.db("myFirstDatabase").collection("exercises");
}
//  End - DB/client connect

module.exports = router;
