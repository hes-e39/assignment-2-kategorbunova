import { type ReactNode, createContext, useState } from 'react';
import { TotalSeconds } from '../utils/helpers';
import { InputsValidation } from '../utils/helpers';

export type Timer = {
    title: string;
    totalSeconds: number;
    timeMinInput: string;
    timeSecInput: string;
    repInput: string;
};

export type TimersContextType = {
    timersArray: Timer[];
    timerInputs: typeof initialTimerInputs;
    addTimer: (title: string) => void;
    handleInputChange: (title: string, field: string, value: string) => void;
    removeLastTimer: () => void;
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
});

export const TimersProvider = ({ children }: { children: ReactNode }) => {
    const [timersArray, setTimersArray] = useState<Timer[]>([]);

    const [timerInputs, setTimerInputs] = useState(initialTimerInputs);

    const handleInputChange = (title: string, field: string, value: string) => {
        setTimerInputs(prevInputs => ({ ...prevInputs, [title]: { ...prevInputs[title], [field]: value } }));
    };

    const addTimer = (title: string) => {
        const { timeMinInput = '0', timeSecInput = '0', timeMinInputRest = '0', timeSecInputRest = '0', repInput = '1' } = timerInputs[title];
        const totalSeconds = TotalSeconds(timeMinInput, timeSecInput, timeMinInputRest, timeSecInputRest, repInput);

        if (InputsValidation(totalSeconds) === false) {
            alert('Please enter a valid time.');
        } else {
            setTimersArray(prevArray => [...prevArray, { title, totalSeconds, repInput, timeMinInput, timeSecInput }]);
        }
    };

    const removeLastTimer = () => {
        setTimersArray(prevArray => prevArray.slice(0, -1));
    };

    return <TimersContext.Provider value={{ timersArray, addTimer, timerInputs, handleInputChange, removeLastTimer }}>{children}</TimersContext.Provider>;
};

export default TimersProvider;
