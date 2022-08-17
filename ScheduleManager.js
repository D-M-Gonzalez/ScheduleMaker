import { DailySchedule } from "./DailySchedule.js"
import { convertDateToInteger, convertIntegerToDate, convertStringDateToInteger } from "./lib.js"
import { schedule } from "./scheduleModel.js"

class ScheduleManager{
    constructor(initialDate,futureLength,dailyTurns,startingHour,endingHour){
        this.initialDate = initialDate
        this.futureLength = futureLength
        this.dailyTurns = dailyTurns
        this.startingHour = startingHour
        this.endingHour = endingHour
        this.schedules = []
        this._loadStorage()
        this._initScheduleManager()
        this._sortSchedules()
    }
    // Private methods
    _loadStorage(){
        const oldSchedulesJSON = localStorage.getItem("schedules")
        const oldSchedulesArray = JSON.parse(oldSchedulesJSON)

        oldSchedulesArray.forEach((oldSchedule)=>{
            const newDailySchedule = new DailySchedule(
                                                        oldSchedule.day,
                                                        oldSchedule.initialTurns,
                                                        oldSchedule.startingHour,
                                                        oldSchedule.endingHour,
                                                        )

            oldSchedule.turns.forEach((turn)=>{
                if(!turn.available){
                    newDailySchedule.takeTurn(turn.hour)
                }
            })
            this.schedules.push(newDailySchedule)                                                
        })
    }
    _initScheduleManager(){
        const integerDate = convertDateToInteger(this.initialDate)

        for (let i = 0; i<this.futureLength; i++){
            const newDailyString = convertIntegerToDate(integerDate + i)
            const alreadyExists = this.schedules.some((schedule)=>{
                return schedule.day == newDailyString
            })
            if(!alreadyExists){
                const newDailySchedule = new DailySchedule(newDailyString,this.dailyTurns,this.startingHour,this.endingHour)
                this.schedules.push(newDailySchedule)
            }
        }
    }
    _sortSchedules(){
        this.schedules = this.schedules.sort(function(a,b){
            return convertStringDateToInteger(a.day) - convertStringDateToInteger(b.day)
        })
    }
    // saves data in the required format, don't change
    saveStorage(){
        const JSONSchedules = JSON.stringify(this.schedules)
        localStorage.setItem('schedules',JSONSchedules)
    }
    // day = "AAAA-MM-DD", hour = "HH:MM"
    takeTurn(day,hour){
        const selectedDay = this.schedules.find((schedule)=>{
            return schedule.day == day
        })
        selectedDay.takeTurn(hour)
    }
    // day = "AAAA-MM-DD", hour = "HH:MM"
    unTakeTurn(day,hour){
        const selectedDay = this.schedules.find((schedule)=>{
            return schedule.day = day
        })
        selectedDay.unTakeTurn(hour)
    }
}

//const JSONexample = JSON.stringify(schedule)
//localStorage.setItem("schedules",JSONexample)

// Pasar new Date, cantidad de días, cantidad de turnos por día
const newSchedule = new ScheduleManager(new Date(),7,4,"12:00","16:00")
console.log(newSchedule)

newSchedule.takeTurn("2022-08-21","14:00")
console.log(newSchedule)