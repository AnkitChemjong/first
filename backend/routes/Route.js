import { Router } from 'express';
import User from '../model/User.js';

const router = Router();

router.get('/', (req, res) => {
    res.send('hi');
});

router.post('/user', async (req,res) => {
    try {
        const { userName, email, password } = req.body;
        if (!userName || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required' });
        }
        const newUser = await User.create({ userName, email, password });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/log', async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await User.userChecker(email, password);
        res.cookie('cook', token, { httpOnly: true, secure: true, maxAge: 3600000 });
        res.status(200).send('Logged in successfully');
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/items', async (req, res) => {
    const data = await User.find({});
    res.json(data);

});

export default router;
