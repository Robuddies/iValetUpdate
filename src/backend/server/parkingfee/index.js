const { DateTime } = require('luxon');

const maxWeekday = 18;
const maxWeekend = 15;

const calculateFeeHelper = (currFeeTill, exitTime, currFee) => {
    const duration = exitTime.diff(currFeeTill, ['days', 'hours', 'minutes']);
    const currDOW = currFeeTill.weekday;
    if (duration.days > 0) {
        const todayFee = currDOW < 6 ? maxWeekday : maxWeekend;
        currFee = calculateFeeHelper(
            currFeeTill.plus({ days: 1 }),
            exitTime,
            currFee + todayFee
        );
    } else if (duration.hours > 0 || duration.minutes > 0) {
        // calculate additional fee for the same day
        if (currFeeTill.hour < 6) {
            // 0000H - 0559H
            const addFee = 5;
            currFee = calculateFeeHelper(
                currFeeTill.set({ hour: 6, minutes: 0, seconds: 0 }),
                exitTime,
                currFee + addFee
            );
        } else if (currFeeTill.hour < 20) {
            // 0600H - 1959H
            if (currDOW > 5) {
                // weekend
                const addFee = 5;
                currFee = calculateFeeHelper(
                    currFeeTill.set({ hour: 20, minutes: 0, seconds: 0 }),
                    exitTime,
                    currFee + addFee
                );
            } else {
                const timeChangeFee = currFeeTill.set({
                    hour: 20,
                    minutes: 0,
                    seconds: 0,
                });
                const endTime =
                    exitTime.diff(timeChangeFee) < 0 ? exitTime : timeChangeFee;
                const remainingTime = endTime.diff(currFeeTill, [
                    'hours',
                    'minutes',
                ]);
                //weekday
                var hoursWithinPeriod = remainingTime.hours;
                hoursWithinPeriod += remainingTime.minutes > 0 ? 1 : 0;
                var addFee = hoursWithinPeriod * 2;
                addFee = addFee > 8 ? 8 : addFee;

                currFee = calculateFeeHelper(
                    currFeeTill.plus({ hour: hoursWithinPeriod }),
                    exitTime,
                    currFee + addFee
                );
            }
        } else {
            // 2000H- 2359H
            const addFee = 5;
            currFee = calculateFeeHelper(
                currFeeTill.plus({ day: 1 }).startOf('day'),
                exitTime,
                currFee + addFee
            );
        }
    }

    return currFee;
};

const calculateFee = (dateEntered) => {
    const currTime = DateTime.now();

    return calculateFeeHelper(dateEntered, currTime, 0);
};

module.exports = calculateFee;
