import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';

/**
 * Simple API handler for fetching medal data
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		// Get the path to the medals.json file
		const filePath = path.join(
			process.cwd(),
			'public',
			'data',
			'medals.json'
		);

		// Read the file
		const fileContents = fs.readFileSync(filePath, 'utf8');

		// Parse and return the JSON data
		const data = JSON.parse(fileContents);
		return res.status(200).json(data);
	} catch (error) {
		console.error('API error:', error);
		return res.status(500).json({ error: 'Failed to fetch medal data' });
	}
}
