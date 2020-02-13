function calculateIntakeEndDate(intakes, stock, frequency, weekDays) {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
    let totalPillsPerDay = 0;
    let skipPillsForToday = 0;
    let isNeedPillsToday = false;
    let timeForLastPills;
    let totalDays;
    let newDate;

    for (let i = 0; i < intakes.length; i++) {
        totalPillsPerDay += intakes[i].pills;
        const hour = Number.parseInt(intakes[i].time.split(':')[0]);
        const minutes = Number.parseInt(intakes[i].time.split(':')[1]);
        if ((currentHour < hour) || 
        (hour === currentHour && currentMinutes < minutes)) {
            isNeedPillsToday = true;
            continue
        } 
        timeForLastPills = {
            hour: hour,
            minutes: minutes
        };

        skipPillsForToday += intakes[i].pills;
        isNeedPillsToday = false;
    }

    if (frequency === 'daily') {
        totalDays = Math.floor(
            isNeedPillsToday ? stock / totalPillsPerDay : stock / totalPillsPerDay + 1
            );
    }

    if (frequency === 'eachOtherDay') {
        totalDays = Math.floor(
            isNeedPillsToday ? ((stock / totalPillsPerDay) * 2) : ((stock / totalPillsPerDay + 1) * 2)
            );
    }

    if (frequency === 'weekly') {

        let currentDay = currentDate.getDay();
        let daysForPills = [];
        let dayNumber = 0;
        let totalDaysForWeekly = -1;
        for (day in weekDays) {
            dayNumber++
            if (weekDays[day]) {
                daysForPills.push(dayNumber);
            }
        }

        while (stock > 0) {
            for (let i = 0; i < daysForPills.length; i++) {
                if (daysForPills[i] === currentDay) {
                    stock -= skipPillsForToday === 0 ? totalPillsPerDay : skipPillsForToday;
                    skipPillsForToday = 0;
                }
            }

            currentDay += 1;

            if (currentDay > 7) {
                currentDay = 1;
            }

            totalDaysForWeekly += 1;
        }
        
        if (isNeedPillsToday) {
            totalDays = totalDaysForWeekly;
        } else {
            totalDays = totalDaysForWeekly;
        }
    }
    
    newDate = addDays(currentDate, totalDays);
    newDate.setHours(timeForLastPills.hour, timeForLastPills.minutes);
    console.log(newDate)
}

function addDays(date, days) {
    const copy = new Date(Number(date))
    copy.setDate(date.getDate() + days)
    return copy
}

function callCalculate() {
    const intakes = [
        {
            time: "9:15",
            pills: 1
        },
        {
            time: "15:35",
            pills: 2
        },
        {
            time: "19:00",
            pills: 1
        },
    ];
    const stock = 40;
    const frequency = 'weekly';
    const weekDays = {
        monday: true,
        tuesday: false,
        wednesday: true,
        thursday: false,
        friday: true,
        saturday: false,
        sunday: false,
    };

    calculateIntakeEndDate(intakes, stock, frequency, weekDays)

}

callCalculate();