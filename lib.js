export function convertHourToMinuteInteger(hourlyString){
    const parseTime = hourlyString.split(":")
    const totalMinutes = parseInt((parseTime[0]*60)) + parseInt(parseTime[1])
    return totalMinutes
}

export function convertMinuteToHourlyString(minuteString){
    const minutes = minuteString % 60 < 10 ? "0" + minuteString % 60 : minuteString % 60
    const hours = (minuteString - minutes) / 60
    const hourlyString = hours + ":" + minutes

    return hourlyString
}

export function convertDateToInteger(date){
    const newDate = date.toISOString().split("T")
    const integerDate = parseInt(newDate[0].replace(/-/g,""))
    return integerDate
}

//format AAAA-MM-DD
export function convertStringDateToInteger(dateString){
    const integerDate = parseInt(dateString.replace(/-/g,""))
    return integerDate
}

export function convertIntegerToDate(dateInteger){
    const integerArray = dateInteger.toString().split("")
    const newString = 
        integerArray[0] + 
        integerArray[1] + 
        integerArray[2] +
        integerArray[3] +
        "-" +
        integerArray[4] +
        integerArray[5] +
        "-" +
        integerArray[6] +
        integerArray[7]

    return newString
}