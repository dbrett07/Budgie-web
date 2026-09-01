import { initializeApp, getApps, cert } from "firebase-admin/app";

export function initializeAuthService() : void { 
    if ( getApps().length === 0 ) { 
        initializeApp()
    }
}