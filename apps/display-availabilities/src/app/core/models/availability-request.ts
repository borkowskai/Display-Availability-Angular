export interface AvailabilityRequest {
    from: string, 
    to: string,
    motive_id: string, 
    is_new_patient:boolean, 
    calendar_ids:string, 
    state:string
}
