import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database.js';
import { User } from '../users/users.types.js';
import { SyncStatus, TransactionType } from '../../utils/enums.js';

export class Transaction extends Model {}

Transaction.init(
    {
        id : { 
            type : DataTypes.STRING, 
            allowNull : false, 
            primaryKey : true, 
            autoIncrement : false 
        }, 

        userid : { 
            type : DataTypes.STRING, 
            allowNull : false, 
            references : { 
                model : User, 
                key : 'id'
            }
        },

        title : { 
            type : DataTypes.STRING, 
        }, 

        source : { 
            type : DataTypes.STRING
        }, 

        transactiontype : { 
            type : DataTypes.ENUM(...Object.values(TransactionType)), 
            allowNull : false 
        }, 

        amount : { 
            type : DataTypes.DECIMAL, 
            allowNull : false
        }, 

        timestamp : { 
            type : DataTypes.DATE, 
            allowNull : false 
        }, 

        syncstatus : { 
            type : DataTypes.ENUM(...Object.values(SyncStatus)), 
            defaultValue : SyncStatus.PENDING.valueOf(), 
            allowNull : false
        }
    }, 
    { 
        sequelize, 
    }
);

