
import { db } from "./init";
import type { Iathlete, Imatch } from "./interfaces";




export class AthletesCtrl {
    constructor() {
        
    }
    async createAthlete(athlete: Iathlete){
     // await  athleteCollection.insert(athlete)
    }

   static async createMatch(match: Imatch){
      return db.matches.add(match);
   }
   static async getAllPendingMatches(){
    const matches: Imatch[] = await db.matches.toArray();
    return matches;
   }
}