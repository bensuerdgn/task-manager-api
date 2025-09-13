import { Request, Response } from 'express';
import { connectDB } from '../config/db';

const db = connectDB();

export const createTask = (req: Request, res: Response) => {
  const { title, description, category, completed } = req.body;
  db.run(
    'INSERT INTO tasks (title, description, category, completed) VALUES (?, ?, ?, ?)',
    [title, description, category, completed],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
      }
      res
        .status(200)
        .json({ id: this.lastID, title, description, category, completed });
    },
  );
};

export const getTasks = (req: Request, res: Response) => {
  db.all('SELECT * FROM tasks', function (err, rows) {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(rows);
  });
};

export const getTaskById = (req: Request, res: Response) => {
  const { id } = req.params;
  db.get('SELECT * FROM tasks WHERE id = ?', [id], function (err, row) {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(row);
  });
};

export const updateTask = (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, category, completed } = req.body;
  db.run(
    'UPDATE tasks SET title = ?, description = ?, category = ?, completed = ? WHERE id = ?',
    [title, description, category, completed, id],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
      }
      res.status(200).json({ id, title, description, category, completed });
    },
  );
};

export const deleteTask = (req: Request, res: Response) => {
  const { id } = req.params;
  db.run('DELETE FROM tasks WHERE id = ?', [id], function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  });
};
