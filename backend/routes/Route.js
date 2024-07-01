import { Router } from 'express';
import User from '../model/User.js';

const router = Router();
router.get('/',(req,res)=>{
    res.send('hi');
})

router.post('/user', async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        console.log(userName, email, password)
        
        if (!userName || !email || !password) {
            console.log('if');
            return res.status(400).json({ error: 'Name, email, and password are required' });
        }
        
        const newUser = await User.create({ userName, email, password });
        console.log(req.body);

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error});
    }
});
router.get('/items',async (req,res)=>{
    const data=await User.find({});
    res.json(data);
})
export default router;
