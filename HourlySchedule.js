export class HourlySchedule{
    constructor(hour,available){
        this.hour = hour
        this.available = available
    }
    makeAvailable(boolean){
        return this.available = boolean
    }
}