import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { connectDB } from '../config/db';
import { User } from '../model/user';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

export const signUp = (req: Request, res: Response) => {
  const { username, password } = req.body;

  connectDB().get(
    'SELECT * FROM users WHERE username = ?',
    [username],
    async (err, row) => {
      if (row) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      connectDB().run(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [username, hashedPassword],
        function (err) {
          if (err) return res.status(500).json({ error: err.message });
          return res.status(201).json({ message: 'User created successfully' });
        },
      );
    },
  );
};

export const signIn = (req: Request, res: Response) => {
  const { username, password } = req.body;

  connectDB().get(
    'SELECT * FROM users WHERE username = ?',
    [username],
    async (err, user: User) => {
      if (!user) return res.status(400).json({ error: 'Invalid credentials' });

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid)
        return res.status(400).json({ error: 'Invalid credentials' });

      const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: '1h' },
      );

      return res.json({ token });
    },
  );
};
