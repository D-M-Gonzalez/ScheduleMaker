import { _DailySchedule } from "./DailySchedule.js"
import { convertDateToString, convertStringDateToDate } from "./lib.js"

export class ScheduleManager{
    // new Date(), 30, 4, "08:00", "12:00"
    constructor(name,initialDate,futureLength,dailyTurns,startingHour,endingHour){
        this._name = name
        this._initialDate = initialDate
        this._futureLength = futureLength
        this._dailyTurns = dailyTurns
        this._startingHour = startingHour
        this._endingHour = endingHour
        this._schedules = []
        this._loadStorage()
        this._initScheduleManager()
        this._sortSchedules()
    }
    // Private methods
    _loadStorage(){
        const oldSchedulesJSON = localStorage.getItem(this._name)
        const oldSchedulesArray = JSON.parse(oldSchedulesJSON)

        oldSchedulesArray && oldSchedulesArray.forEach((oldSchedule)=>{
            const newDailySchedule = new _DailySchedule(
                                                        oldSchedule._day,
                                                        oldSchedule._initialTurns,
                                                        oldSchedule._startingHour,
                                                        oldSchedule._endingHour,
                                                        )

            oldSchedule._turns.forEach((turn)=>{
                if(!turn._available){
                    newDailySchedule._takeTurn(turn._hour)
                } else {
                    newDailySchedule._unTakeTurn(turn._hour)
                }
            })
            this._schedules.push(newDailySchedule)                                                
        })
    }
    _initScheduleManager(){
        const initialDate = this._initialDate

        for (let i = 0; i<this._futureLength; i++){
            const newDate = new Date(initialDate.getFullYear(),initialDate.getMonth(),initialDate.getDate() + i)
            const newDailyString = convertDateToString(newDate)
            const alreadyExists = this._schedules.some((schedule)=>{
                return schedule._day == newDailyString
            })
            if(!alreadyExists){
                const newDailySchedule = new _DailySchedule(newDailyString,this._dailyTurns,this._startingHour,this._endingHour)
                this._schedules.push(newDailySchedule)
            }
        }
    }
    _sortSchedules(){
        this._schedules = this._schedules.sort(function(a,b){
            return convertStringDateToDate(a._day) - convertStringDateToDate(b._day)
        })
    }
    // saves data in the required format, don't change
    _saveStorage(day){
        const activeSchedules = []
        this._schedules.forEach((schedule)=>{
            const active = schedule._turns.some((turn)=>{
                return turn._available == false
            })
            if (active == true || schedule._day == day){
                activeSchedules.push(schedule)
            }
        })
        const JSONSchedules = JSON.stringify(activeSchedules)
        localStorage.setItem(this._name,JSONSchedules)
    }
    // makes a turn taken, unavailable, day = "YYYY-MM-DD", hour = "HH:MM"
    takeTurn(day,hour){
        try{
            const selectedDay = this._schedules.find((schedule)=>{
                return schedule._day == day
            })
            selectedDay._takeTurn(hour)
            this._saveStorage()
        } catch (error){
            error.name == "TypeError" && console.error("Schedule not found")
        }
    }
    // makes a turn untaken, available, day = "YYYY-MM-DD", hour = "HH:MM"
    unTakeTurn(day,hour){
        try{
            const selectedDay = this._schedules.find((schedule)=>{
                return schedule._day == day
            })
            selectedDay._unTakeTurn(hour)
            this._saveStorage(day)
        } catch (error){
            error.name == "TypeError" && console.error("Schedule not found")
        }
    }
    // Gets the list of all schedules
    getAllSchedules(){
        const schedulesList = []
        this._schedules.forEach((schedule)=>{
            const parsedSchedule = {
                day: schedule._day,
                turns: schedule._turns.map((turn)=>{
                    return {
                        hour: turn._hour,
                        available: turn._available,
                    }
                }),
            }
            schedulesList.push(parsedSchedule)
        })

        return schedulesList
    }
    // Gets a schedule by it's day, day = "YYYY-MM-DD"
    getDaySchedules(day){
        const schedulesList = []
        const searchedDay = this._schedules.find((schedule)=>{
            return schedule._day == day
        })
        try{
            searchedDay._turns.forEach((turn)=>{
                const turnObject = {
                    hour: turn._hour,
                    available: turn._available,
                }
                schedulesList.push(turnObject)
            })
        } catch (error){
            error.name == "TypeError" && console.error("Schedule not found")
        }
        return schedulesList
    }
    // Gets a single turn, day = "YYYY-MM-DD", hour = "HH:MM"
    getHourSchedule(day,hour){
        const searchedTurn = {
            hour: "",
            available: false,
        }
        const searchedDay = this._schedules.find((schedule)=>{
            return schedule._day == day
        })
        try{
            const foundTurn = searchedDay._turns.find((turn)=>{
                return turn._hour == hour
            })
            searchedTurn.hour = foundTurn._hour
            searchedTurn.available = foundTurn._available
        } catch (error){
            error.name == "TypeError" && console.error("Schedule not found")
        }
        return searchedTurn     
    }
}