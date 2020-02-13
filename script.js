function calculateIntakeEndDate(intakes, stock, frequency, weekDays) {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
    let totalPillsPerDay = 0;
    let addDaysToTotal = 0;
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
            timeForLastPills = {
                hour: Number.parseInt(intakes[0].time.split(':')[0]),
                minutes: Number.parseInt(intakes[0].time.split(':')[1])
            };
            isNeedPillsToday = true;
            continue
        } 

        timeForLastPills = {
            hour: hour,
            minutes: minutes
        };

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

        const currentDay = currentDate.getDay();
        let daysForPills = [];
        let daysPerWeek = 0;
        let totalWeeks;
        let pillsPerWeek;
        let skipDaysPerWeek = 0;
        let totalDaysForPells;
        let dayNumber = 0;
        for (day in weekDays) {
            dayNumber++
            if (weekDays[day]) {
                daysPerWeek += 1;
                lastDayForPills = dayNumber;
                daysForPills.push(dayNumber);
            }
        }

        pillsPerWeek = daysPerWeek * totalPillsPerDay
        totalWeeks = stock / pillsPerWeek;
        skipDaysPerWeek = 7 - daysPerWeek;
        totalDaysForPells = stock / totalPillsPerDay;
        skipdays = skipDaysPerWeek * totalWeeks;
        totalDays = skipdays + totalDaysForPells;

        for (let i = 0; i < daysForPills.length; i++) {
            if (currentDay === daysForPills[i]) {
                totalDays += isNeedPillsToday ? addDaysToTotal : 0;
                newDate = addDays(currentDate, totalDays);
                newDate.setHours(timeForLastPills.hour, timeForLastPills.minutes)
                console.log(newDate)
                return;
            }
        }

        if (currentDay > lastDayForPills) {
            totalDays -= currentDay - lastDayForPills;
        }

        if (currentDay < lastDayForPills) {
            totalDays -= lastDayForPills - currentDay;
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
        friday: false,
        saturday: false,
        sunday: false,
    };

    calculateIntakeEndDate(intakes, stock, frequency, weekDays)

}

callCalculate();