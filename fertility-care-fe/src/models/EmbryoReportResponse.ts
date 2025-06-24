

export interface EmbryoReportResponse {
    id?: number,

    embryoGrade?: string,

    eggGrade?: string,

    eggId?: number,

    embryoStatus?: string,

    isViable?: boolean,

    isFrozen?: boolean,

    isTransferred?: boolean,

    orderId?: string
}