import { Request, Response, NextFunction } from 'express';
import { getAuth } from 'firebase-admin/auth'; 
import { AuthenticatedRequest } from './auth.types.js';

export async function verifyFirebaseToken(
    req : Request, 
    res : Response, 
    next : NextFunction
) : Promise<void | Response> { 
    const authHeader = req.headers.authorization; 

    if (!authHeader || !authHeader.startsWith('Bearer ')) { 
        return res.status(401).json({error : "Unauthorized request: Missing bearer token"}); 
    }

    const token = authHeader.split(' ')[1]; 
    try { 
        const decodedToken =  await getAuth().verifyIdToken(token); 
        (req as AuthenticatedRequest).user = { 
            uid: decodedToken.uid, 
            email : decodedToken.email, 
        }; 

        return next(); 
    } catch (error) { 
        console.error("[auth] Firebase token verification failed: ", error); 
        return res.status(403).json({ error: "Forbidden: Invalid token"}); 
    }
}