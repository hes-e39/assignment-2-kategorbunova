import { useContext, useEffect, useRef, useState } from 'react';
import { TimersContext } from '../views/TimerProvider';

export const useCountdownTimer = (totalSeconds: number, isActive: boolean, onFinish: () => void, totalReps: number, totalSecondsRest: number) => {
    const { resetAll, setTotalSecondsPassed } = useContext(TimersContext);

    const [secondsPassed, setSecondsPassed] = useState(0);
    const [repsRemaining, setRepsRemaining] = useState(totalReps);

    //const oneRoundSeconds = totalSeconds / totalReps;

    const oneRoundSecondsRest = totalSecondsRest / totalReps;
    const oneRoundSecondsWork = totalSeconds / totalReps - oneRoundSecondsRest;
    const oneRoundSeconds = oneRoundSecondsRest + oneRoundSecondsWork;
    const [oneRoundSecondsLeft, setOneRoundSecondsLeft] = useState(oneRoundSeconds);

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
                clearInterval(intervalRef.current); // Ensure no overlapping intervals
            }
            intervalRef.current = setInterval(() => {
                setSecondsPassed(prev => {
                    if (prev < totalSeconds - 1) {
                        const newSecondsPassed = prev + 1;
                        return newSecondsPassed;
                    } else {
                        clearInterval(intervalRef.current);
                        intervalRef.current = null;
                        onFinish(); // Call onFinish when countdown completes
                        return totalSeconds; // Stop at totalSeconds
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

    //this is counting down reps when the round is complete
    useEffect(() => {
        if (isActive && repsRemaining > 1 && secondsPassed % oneRoundSeconds === 0) {
            setRepsRemaining((totalSeconds - secondsPassed) / oneRoundSeconds);
        }
    }, [repsRemaining, isActive, oneRoundSeconds, secondsPassed, totalSeconds, totalReps]);

    //this displays the total seconds for XY and Tabata timers wihtout dividing it by the reps at the non-started initial state
    useEffect(() => {
        if (secondsPassed === 0) {
            setOneRoundSecondsLeft(totalSeconds / totalReps - oneRoundSecondsRest);
        } else if (secondsPassed < oneRoundSecondsWork) {
            setOneRoundSecondsLeft(oneRoundSeconds - secondsPassed - oneRoundSecondsRest);
        } else setOneRoundSecondsLeft((totalSeconds - secondsPassed) % totalReps);
    }, [secondsPassed, totalSeconds, totalReps, oneRoundSecondsRest, oneRoundSecondsLeft, oneRoundSeconds]);

    return { secondsPassed, setSecondsPassed, fastforward, repsRemaining, oneRoundSecondsLeft };
};
