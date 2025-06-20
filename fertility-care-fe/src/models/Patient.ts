import type Profile from "./Profile";

export interface Patient {

    id?: string,

    profile?: Profile,

    medicalHistory?: string,

    note?: string,

    partnerFullName?: string,

    partnerEmail?: string,

    partnerPhone?: string

}  