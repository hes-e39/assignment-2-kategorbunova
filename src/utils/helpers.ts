// Add helpers here. This is usually code that is just JS and not React code. Example: write a function that
// calculates number of minutes when passed in seconds. Things of this nature that you don't want to copy/paste
// everywhere.

function convertToSeconds(timeMinInput: number | string, timeSecInput: number | string) {
    return Number(timeMinInput || '0') * 60 + Number(timeSecInput || '0');
}

function DisplayTimeForText({ totalSeconds }: { totalSeconds: number }) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const minutesDisplay = minutes > 0 ? `${minutes} min ` : '';
    const secondsDisplay = seconds > 0 ? `${seconds} sec` : minutes > 0 ? '' : '0 sec';

    return `${minutesDisplay}${secondsDisplay}`;
}

function DisplayRepsForText({ repInput }: { repInput: number }) {
    const repDisplay = repInput > 1 ? `for ${repInput} reps ` : '';

    return `${repDisplay}`;
}

type DisplayForTimeProps = {
    hoursOnTimer: number;
    minutesOnTimer: number;
    secondsOnTimer: number;
};

function DisplayForTime({ hoursOnTimer, minutesOnTimer, secondsOnTimer }: DisplayForTimeProps): string {
    const hours = hoursOnTimer > 0 ? `${String(hoursOnTimer).padStart(2, '0')}:` : '';
    const minutes = `${String(minutesOnTimer).padStart(2, '0')}:`;
    const seconds = `${String(secondsOnTimer).padStart(2, '0')}`;

    return `${hours}${minutes}${seconds}`;
}

type TimeOnTimerProps = {
    secondsRemaining: number;
};

type TimeOnTimerReturn = {
    hoursOnTimer: number;
    minutesOnTimer: number;
    secondsOnTimer: number;
};

function TimeOnTimer({ secondsRemaining }: TimeOnTimerProps): TimeOnTimerReturn {
    const secondsOnTimer = secondsRemaining % 60;
    const minutesRemaining = (secondsRemaining - secondsOnTimer) / 60;
    const minutesOnTimer = minutesRemaining % 60;
    const hoursOnTimer = (minutesRemaining - minutesOnTimer) / 60;

    return {
        hoursOnTimer,
        minutesOnTimer,
        secondsOnTimer,
    };
}

export { convertToSeconds, DisplayTimeForText, DisplayRepsForText, DisplayForTime, TimeOnTimer };
