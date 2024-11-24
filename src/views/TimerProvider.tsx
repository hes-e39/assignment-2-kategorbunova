import { type ReactNode, createContext, useState } from 'react';
import { STATUS } from '../utils/constants';
import type { StatusType } from '../utils/constants';
import { TotalSeconds } from '../utils/helpers';
import { InputsValidation } from '../utils/helpers';

export type Timer = {
    title: string;
    totalSeconds: number;
    timeMinInput: string;
    timeSecInput: string;
    timeMinInputRest: string;
    timeSecInputRest: string;
    repInput: string;
};

export type TimersContextType = {
    timersArray: Timer[];
    timerInputs: typeof initialTimerInputs;
    addTimer: (title: string) => void;
    handleInputChange: (title: string, field: string, value: string) => void;
    removeLastTimer: () => void;
    resetTimers: () => void;
    resetAll: boolean;
    removeAllTimers: () => void;
    totalSecondsPassed: number;
    currentTimerIndex: number;
    totalQueueSeconds: number;
    statusQueue: StatusType;
    setTotalSecondsPassed: (value: number) => void;
    setCurrentTimerIndex: (index: number) => void;
    setStatusQueue: (status: StatusType) => void;
};

const initialTimerInputs = {
    Stopwatch: { timeMinInput: '', timeSecInput: '' },
    Countdown: { timeMinInput: '', timeSecInput: '' },
    XY: { timeMinInput: '', timeSecInput: '', repInput: '' },
    Tabata: { timeMinInputRest: '', timeSecInputRest: '', timeMinInput: '', timeSecInput: '', repInput: '' },
};

export const TimersContext = createContext<TimersContextType>({
    timersArray: [],
    timerInputs: initialTimerInputs,
    addTimer: () => {},
    handleInputChange: () => {},
    removeLastTimer: () => {},
    resetTimers: () => {},
    resetAll: false,
    removeAllTimers: () => {},
    totalSecondsPassed: 0,
    currentTimerIndex: 0,
    totalQueueSeconds: 0,
    statusQueue: STATUS.INITIAL,
    setTotalSecondsPassed: () => {},
    setCurrentTimerIndex: () => {},
    setStatusQueue: () => {},
});

export const TimersProvider = ({ children }: { children: ReactNode }) => {
    const [timersArray, setTimersArray] = useState<Timer[]>([]);
    const [timerInputs, setTimerInputs] = useState(initialTimerInputs);
    const [currentTimerIndex, setCurrentTimerIndex] = useState(0);
    const [totalSecondsPassed, setTotalSecondsPassed] = useState<number>(0);
    const [statusQueue, setStatusQueue] = useState(STATUS.INITIAL);

    const handleInputChange = (title: string, field: string, value: string) => {
        setTimerInputs(prevInputs => ({ ...prevInputs, [title]: { ...prevInputs[title], [field]: value } }));
    };

    const addTimer = (title: string) => {
        const { timeMinInput = '0', timeSecInput = '0', timeMinInputRest = '0', timeSecInputRest = '0', repInput = '1' } = timerInputs[title];
        const totalSeconds = TotalSeconds(timeMinInput, timeSecInput, timeMinInputRest, timeSecInputRest, repInput);

        if (InputsValidation(totalSeconds) === false) {
            alert('Please enter a valid time.');
        } else {
            setTimersArray(prevArray => [...prevArray, { title, totalSeconds, repInput, timeMinInput, timeSecInput, timeMinInputRest, timeSecInputRest }]);
        }
    };

    const removeLastTimer = () => {
        setTimersArray(prevArray => {
            // edge case for removing the first timer
            if (prevArray.length === 1 && totalSecondsPassed === 0) {
                return prevArray.slice(0, -1);
            } else if (prevArray.length > 1) {
                return prevArray.slice(0, -1);
            }
            alert('Cannot undo a timer that has already started. Please remove all.');
            return prevArray;
        });
    };

    const removeAllTimers = () => {
        setTimersArray([]);
        setTotalSecondsPassed(0);
        setCurrentTimerIndex(0);
    };

    const [resetAll, setResetAll] = useState(false);

    const resetTimers = () => {
        setResetAll(true);
        setTimeout(() => setResetAll(false), 0);
    };

    const totalQueueSeconds = timersArray.reduce((total, timer) => {
        const totalSeconds =
            ((Number(timer.timeMinInput) || 0) * 60 + (Number(timer.timeSecInput) || 0) + (Number(timer.timeMinInputRest) || 0) * 60 + (Number(timer.timeSecInputRest) || 0)) *
            (Number(timer.repInput) || 1);

        return total + totalSeconds;
    }, 0);

    return (
        <TimersContext.Provider
            value={{
                timersArray,
                addTimer,
                timerInputs,
                handleInputChange,
                removeLastTimer,
                removeAllTimers,
                resetTimers,
                resetAll,
                totalSecondsPassed,
                totalQueueSeconds,
                currentTimerIndex,
                statusQueue,
                setTotalSecondsPassed,
                setCurrentTimerIndex,
                setStatusQueue,
            }}
        >
            {children}
        </TimersContext.Provider>
    );
};

export default TimersProvider;
