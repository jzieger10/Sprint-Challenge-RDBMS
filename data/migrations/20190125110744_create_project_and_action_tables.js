exports.up = function(knex, Promise) {
	return knex.schema
		.createTable("projects", function(table) {
			table.increments();
			table.string("name", 128).notNullable();
			table.text("description", 256);
			table.boolean("completed").defaultTo(false);
		})
		.createTable("actions", function(table) {
            table.increments();
            table.text("description", 256);
            table.text("notes", 512);
            table.boolean("completed").defaultTo(false);
            table.integer("project_id")
				.unsigned()
				.references("id")
				.inTable("projects");
		});
};

exports.down = function(knex, Promise) {
	return knex.schema
		.dropTableIfExists("projects")
		.dropTableIfExists("actions");
};
