const formatTime = (timeInSec) => {
    timeInSec = Math.round(timeInSec);
    let startSub = 14;
    if (timeInSec >= 3600) {
        startSub = 12;
        if (timeInSec >= 36000) startSub = 11;
    }

    return new Date(timeInSec * 1000).toISOString().substring(startSub, 19);
};

export { formatTime };
