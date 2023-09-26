
export interface Iclub {
    clubName?: string;
    flag?: string;
}

export interface Iathlete {
    firstName?: string;
    lastName?: string;
    club?: Iclub

}
export enum Estatus {
    ACTIVE = 1,
    INACTIVE= 0
}

export interface Imatch {
    redAthlete?: Iathlete,
    blueAthlete?: Iathlete,
    redScore?: number;
    blueScore?: number;
    status?: Estatus
}