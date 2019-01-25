const express = require("express");
const knex = require("knex");
const knexConfig = require("./knexfile.js");
const server = express();
const db = knex(knexConfig.development);

server.use(express.json());

server.get("/", (req, res) => {
	res.json({ message: "Server Alive on 5001" });
});


//  PROJECTS 

server.get('/projects', async (req, res) => {
	try {
        const projectList = await db
            .select("*")
            .from("projects")
		res.status(201).json(projectList);
	} catch (err) {
		res.status(500).json({ err });
	}
})

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
        if(project) {
            res.status(201).json({project : project, actions : actions});
        } else {
            res.status(404).json({message: "The requested ID was not found"})
        }
    } catch (err) {
        res.status(500).json({ err });
    }
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

server.put('/projects/:id', async (req, res) => {
    const id = req.params.id;
    const project = req.body;
    try {
        const updatedProject = await db("projects").where("id", id).update(project);
        res.status(201).json(updatedProject);
    } catch (err) {
        res.status(500).json({ err });
    }
})

server.delete('/projects/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deletedProject = await db("projects").where("id", id).del();
        res.status(201).json(deletedProject);
    } catch (err) {
        res.status(500).json({ err });
    }
})



// ACTIONS BELOW

server.get('/actions', async (req, res) => {
	try {
        const actionList = await db
            .select("*")
            .from("actions")
		res.status(201).json(actionList);
	} catch (err) {
		res.status(500).json({ err });
	}
})

server.post("/actions", async (req, res) => {
    const action = req.body;
    if (action.description) {
        try {
            const newAction = await db("actions").insert(action);
            res.status(201).json(newAction);
        } catch (err) {
            res.status(500).json({ err });
        }
    } else {
        res.status(400).json({error: "You must include a description"})
    }
});

server.put('/actions/:id', async (req, res) => {
    const id = req.params.id;
    const action = req.body;
    try {
        const updatedAction = await db("actions").where("id", id).update(action);
        res.status(201).json(updatedAction);
    } catch (err) {
        res.status(500).json({ err });
    }
})

server.delete('/actions/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deletedAction = await db("actions").where("id", id).del();
        res.status(201).json(deletedAction);
    } catch (err) {
        res.status(500).json({ err });
    }
})


server.listen(5001, () => console.log("Server running on 5001"));
