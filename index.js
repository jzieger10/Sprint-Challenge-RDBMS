const express = require("express");
const knex = require("knex");
const knexConfig = require("./knexfile.js");
const server = express();
const db = knex(knexConfig.development);

server.use(express.json());

server.get("/", (req, res) => {
	res.json({ message: "Server Alive on 5001" });
});

server.post("/projects", async (req, res) => {
	const project = req.body;
	try {
		const newProject = await db("projects").insert(project);
		res.status(201).json(newProject);
	} catch (err) {
		res.status(500).json({ err });
	}
});

server.post("/actions", async (req, res) => {
	const action = req.body;
	try {
		const newAction = await db("actions").insert(action);
		res.status(201).json(newAction);
	} catch (err) {
		res.status(500).json({ err });
	}
});

server.get("/projects/:id", async (req, res) => {
    const id = req.params.id;
	try {
        const project = await db
            .select("*")
            .from("projects")
            .where("projects.id", "=", id)
            .first() 
        const actions = await db
			.select("id", "description", "notes", "completed")
			.from("actions")
            .where("actions.project_id", "=", id)
		res.status(201).json({project : project, actions : actions});
	} catch (err) {
		res.status(500).json({ err });
	}
});

server.listen(5001, () => console.log("Server running on 5001"));
