import { ScheduleManager } from "./ScheduleManager.js";

const morningSchedule = new ScheduleManager('morning',new Date(), 30, 4, "08:00", "12:00")

morningSchedule.takeTurn("2022-08-28","09:00")

morningSchedule.unTakeTurn("2022-08-28","09:00")

//console.log(morningSchedule.getDaySchedules("2022-08-28"))

console.log(morningSchedule.getAllSchedules())