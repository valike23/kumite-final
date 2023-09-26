import Dexie, { type Table } from 'dexie';
import type { Imatch } from './interfaces';



export class MySubClassedDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  matches!: Table<Imatch>; 

  constructor() {
    super('kumiteDB');
    this.version(1).stores({
      matches: '++id, status' // Primary key and indexed props
    });
  }
}

export const db = new MySubClassedDexie();