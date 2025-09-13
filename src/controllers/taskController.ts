import { Response } from 'express';
import { connectDB } from '../config/db';
import { AuthRequest } from '../middleware/auth';

const db = connectDB();

export const createTask = (req: AuthRequest, res: Response) => {
  const { title, description, category, completed } = req.body;
  const userId = req.user?.id;

  db.run(
    'INSERT INTO tasks (title, description, category, completed, user_id) VALUES (?, ?, ?, ?, ?)',
    [title, description, category, completed, userId],
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

export const getTasks = (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;

  db.all('SELECT * FROM tasks WHERE user_id = ?', [userId], function (err, rows) {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(rows);
  });
};

export const getTaskById = (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.id;

  db.get('SELECT * FROM tasks WHERE id = ? AND user_id = ?', [id, userId], function (err, row) {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(row);
  });
};

export const updateTask = (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { title, description, category, completed } = req.body;
  const userId = req.user?.id;

  db.run(
    'UPDATE tasks SET title = ?, description = ?, category = ?, completed = ? WHERE id = ? AND user_id = ?',
    [title, description, category, completed, id, userId],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
      }
      res.status(200).json({ id, title, description, category, completed });
    },
  );
};

export const deleteTask = (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.id;

  db.run('DELETE FROM tasks WHERE id = ? AND user_id = ?', [id, userId], function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  });
};
