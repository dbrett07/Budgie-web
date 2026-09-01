import { Router } from 'express'; 
import { verifyFirebaseToken } from '../auth/auth.js'
import { addTransactions, deleteTransactions, getTransactions, updateTransactions } from './transactions.controllers.js';

const router = Router()
router.get('/', verifyFirebaseToken, getTransactions);
router.post('/add', verifyFirebaseToken, addTransactions);
router.patch('/update', verifyFirebaseToken, updateTransactions);
router.delete('/delete', verifyFirebaseToken, deleteTransactions);
