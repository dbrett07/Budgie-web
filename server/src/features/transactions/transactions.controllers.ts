import { Request, Response } from "express";
import { sequelize } from "../../config/database.js";
import { Op } from 'sequelize';
import { Transaction } from "./transactions.types.js";
import { AuthenticatedRequest } from "../auth/auth.types.js";

export const getTransactions = async (req : Request, res : Response) => { 
    let transactions = null; 
    try {
        let uid = req.user?.uid 
        if (!uid) { 
            return res.status(401).send({error : "Unauthorized"});
        }

        transactions = await Transaction.findAll({
            where : {
                userid : uid
            }
        }); 
    } catch (error) { 
        console.error("[transactions:fetch] ERROR : ", error); 
        return res.status(400).send(error)
    }

    res.status(200).json({transactions : transactions});
}

export const addTransactions = async (req : Request, res : Response) => { 
    let transactions = null;

    try { 
        let uid = req.user?.uid 
        if (!uid) { 
            return res.status(401).send({error : "Unauthorized"});
        }

        transactions = await Transaction.bulkCreate(req.body.transactions);
    } catch (error) { 
        console.error("[transactions:create] ERROR: ", error);
        return res.status(400).send({error : error})
    }

    res.status(201).send({ transactions : transactions});
}

export const updateTransactions = async (req : Request, res : Response) => { 
    try { 
        let uid = req.user?.uid 
        if (!uid) { 
            return res.status(401).send({error : "Unauthorized"});
        }

        if (!Array.isArray(req.body.transactions)) { 
            return res.status(400).send({error : "Transactions must be an array of JSON objects."});
        }

        await Promise.all(
            req.body.transactions.map((element: any) =>
                Transaction.update(element, {
                    where: { id: element.id }
                })
            )
        );
    } catch (error) { 
        console.error("[transactions:update] ERROR: ", error); 
        return res.status(400).send({error : error}); 
    }

    return res.status(204).send()
}

export const deleteTransactions = async (req : Request, res : Response ) => { 
    try { 
        if (!Array.isArray(req.body.transactions) || req.body.transactions.length === 0) { 
            return res.status(400).send({ error : "Transactions must be an array of length 1 or more."});
        }
        
        let deletedCount = Transaction.destroy({ 
            where : { 
                id : { 
                    [Op.in] : req.body.transactions
                }
            }
        })

        return res.status(204).send({ count : deletedCount, message : `Successfully deleted ${deletedCount} transactions.`})
    } catch (error) { 
        console.error("[transactions:delete] ERROR: ", error); 
        return res.status(500).json({error : error}); 
    }
}