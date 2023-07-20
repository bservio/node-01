import { Database } from "./database"
import { randomUUID } from 'node:crypto';

const database = new Database()

export const routes = [
	{
		method: 'GET',
		path: '/tasks',
		handler: (req, res) => {
			const tasks = database.select("tasks")

			return res
				.end(JSON.stringify(tasks))
		}
	},
	{
		method: 'POST',
		path: '/tasks',
		handler: (req, res) => {
			const { title, description, created_at } = req.body
			const task = {
				id: randomUUID(),
				title,
				description,
				completed_at: null,
				created_at,
				updated_at: null,
			}

			database.insert('task', task)

			return res.writeHead(201).end()
		}
	},
]