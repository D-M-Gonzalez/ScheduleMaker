import { HourlySchedule } from "./HourlySchedule.js"
import { convertHourToMinuteInteger, convertMinuteToHourlyString } from "./lib.js"

export class DailySchedule{
    constructor(day,initialTurns,startingHour,endingHour){
        this.day = day
        this.initialTurns = initialTurns
        this.startingHour = startingHour
        this.endingHour = endingHour
        this.turns = []
        this.initDailySchedule()
    }

    initDailySchedule(){
        const endingMinutes = convertHourToMinuteInteger(this.endingHour)
        const startingMinutes = convertHourToMinuteInteger(this.startingHour)
        const lengthInMinutes = endingMinutes - startingMinutes
        const minutesPerTurn = lengthInMinutes / this.initialTurns

        for(let i = 0; i<this.initialTurns; i++){
            const hourlyString = convertMinuteToHourlyString(startingMinutes + (minutesPerTurn * i))
            const newHourlySchedule = new HourlySchedule(hourlyString,true)
            this.turns.push(newHourlySchedule)
        }
    }

    appendTurn(hour){
        const newHourlySchedule = new HourlySchedule(hour,true)
        this.turns.push(newHourlySchedule)
    }

    takeTurn(hour){
        const searchedTurn = this.turns.find((turn)=>{return turn.hour == hour})
        searchedTurn.makeAvailable(false)
    }

    untakeTurn(hour){
        const searchedTurn = this.turns.find((turn)=>{return turn.hour == hour})
        searchedTurn.makeAvailable(true)
    }
}