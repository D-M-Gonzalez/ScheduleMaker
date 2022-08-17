export function convertHourToMinuteInteger(hourlyString){
    const parseTime = hourlyString.split(":")
    const totalMinutes = parseInt((parseTime[0]*60)) + parseInt(parseTime[1])
    return totalMinutes
}

export function convertMinuteToHourlyString(minuteString){
    const minutes = minuteString % 60 < 10 ? "0" + minuteString % 60 : minuteString % 60
    const hours = (minuteString - minutes) / 60 < 10 ? "0" + (minuteString - minutes) / 60 : (minuteString - minutes) / 60
    const hourlyString = hours + ":" + minutes

    return hourlyString
}

export function convertDateToString(date){
    const newDate = date.toISOString().split("T")
    return newDate[0]
}

//format AAAA-MM-DD
export function convertStringDateToDate(dateString){
    const GMT = "T00:00:00"
    const newDate = new Date(dateString + GMT)
    return newDate
}
