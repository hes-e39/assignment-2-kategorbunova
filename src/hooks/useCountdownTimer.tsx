import { useContext, useEffect, useRef, useState } from 'react';
import { TimersContext } from '../views/TimerProvider';

export const useCountdownTimer = (totalSeconds: number, isActive: boolean, onFinish: () => void, totalReps: number, totalSecondsRest: number) => {
    const { resetAll, setTotalSecondsPassed } = useContext(TimersContext);

    const [secondsPassed, setSecondsPassed] = useState(0);
    const [repsRemaining, setRepsRemaining] = useState(totalReps);

    const oneRoundSecondsRest = totalSecondsRest / totalReps;
    const oneRoundSecondsWork = totalSeconds / totalReps - oneRoundSecondsRest;
    const oneRoundSeconds = oneRoundSecondsRest + oneRoundSecondsWork;
    const [oneRoundSecondsLeft, setOneRoundSecondsLeft] = useState(oneRoundSeconds);
    const [isWorkPhase, setIsWorkPhase] = useState(true);

    const intervalRef = useRef<number | null>(null);

    const fastforward = () => {
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        const remainingTime = totalSeconds - secondsPassed;
        setSecondsPassed(totalSeconds);
        setRepsRemaining(0);
        setTotalSecondsPassed(prevTotal => prevTotal + remainingTime);
        onFinish();
    };

    useEffect(() => {
        if (resetAll) {
            setSecondsPassed(0); // Reset the passed time
            setOneRoundSecondsLeft(oneRoundSeconds);
            setRepsRemaining(totalReps);
        }
    }, [resetAll, totalReps, oneRoundSeconds]);

    useEffect(() => {
        if (isActive) {
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
            }
            intervalRef.current = setInterval(() => {
                setSecondsPassed(prev => {
                    if (prev < totalSeconds - 1) {
                        const newSecondsPassed = prev + 1;
                        return newSecondsPassed;
                    } else {
                        clearInterval(intervalRef.current);
                        intervalRef.current = null;
                        onFinish();
                        return totalSeconds;
                    }
                });
                setTotalSecondsPassed(prevTotal => prevTotal + 1);
            }, 1000);
        } else {
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }

        return () => {
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [isActive, totalSeconds, onFinish, setTotalSecondsPassed]);

    useEffect(() => {
        if (isActive && repsRemaining >= 0 && secondsPassed % oneRoundSeconds === 0) {
            const remainingReps = Math.ceil((totalSeconds - secondsPassed) / oneRoundSeconds);
            setRepsRemaining(remainingReps);
        }
    }, [repsRemaining, isActive, oneRoundSeconds, secondsPassed, totalSeconds]);

    useEffect(() => {
        let updatedOneRoundSecondsLeft: number;

        if (secondsPassed === 0) {
            updatedOneRoundSecondsLeft = oneRoundSeconds - oneRoundSecondsRest;
        } else if (secondsPassed >= totalSeconds) {
            updatedOneRoundSecondsLeft = 0;
        } else if (secondsPassed % oneRoundSeconds === 0) {
            updatedOneRoundSecondsLeft = oneRoundSecondsWork;
        } else if (secondsPassed % oneRoundSeconds < oneRoundSecondsWork) {
            updatedOneRoundSecondsLeft = oneRoundSecondsWork - (secondsPassed % oneRoundSeconds);
        } else if (secondsPassed % oneRoundSeconds >= oneRoundSecondsWork) {
            updatedOneRoundSecondsLeft = (totalSeconds - secondsPassed) % oneRoundSeconds;
        } else updatedOneRoundSecondsLeft = (totalSeconds - secondsPassed) % oneRoundSeconds;

        setOneRoundSecondsLeft(updatedOneRoundSecondsLeft);
    }, [secondsPassed, oneRoundSeconds, oneRoundSecondsWork, oneRoundSecondsRest, totalSeconds]);

    useEffect(() => {
        if (secondsPassed % oneRoundSeconds < oneRoundSecondsWork) {
            setIsWorkPhase(true);
        } else {
            setIsWorkPhase(false);
        }
    }, [secondsPassed, oneRoundSeconds, oneRoundSecondsWork]);

    return { secondsPassed, setSecondsPassed, fastforward, repsRemaining, setRepsRemaining, oneRoundSecondsLeft, isWorkPhase, oneRoundSeconds, totalReps };
};
