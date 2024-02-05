import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
  const { email, password, confirmPassword, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use!' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match!' });
    }

    if (!['admin', 'user'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role!' });
    }

    const user = await User.create({
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ message: 'User created successfully!', user });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const secretKey = process.env.JWT_SECRET;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password!' });
    }

    if (user.role === 'admin') {
      return res.status(200).json({ message: 'Admin logged in successfully!' });

    } else {
      const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
      return res.status(200).json({ message: 'User logged in successfully!', token });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};