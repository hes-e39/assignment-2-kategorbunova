//import { useContext } from 'react';
import { useCountdownTimer } from '../../hooks/useCountdownTimer';
import { DisplayRepsForText } from '../../utils/helpers';
import { TimeDisplay, Timer, TimerContainer, TimerTitle } from '../../utils/styles';
import { Button, Buttons } from '../../utils/styles';
//import { TimersContext } from '../../views/TimerProvider';

const Countdown = ({ timeMinInput, timeSecInput, repInput, timeMinInputRest, timeSecInputRest, totalSeconds, isActive, onFinish }) => {
    const { secondsPassed, fastforward } = useCountdownTimer(totalSeconds, isActive, onFinish, repInput);

    // const { timersArray } = useContext(TimersContext);
    //const { resetAll } = useContext(TimersContext);
    //const { fastforwardTimer } = useContext(TimersContext); // Access fastforward from context

    //const [status, setStatus] = useState<StatusType>(STATUS.INITIAL);

    // const [secondsPassed, setSecondsPassed] = useState(() => {
    //     const elapsedForCurrentTimer = totalSecondsPassed - timersArray.slice(0, currentTimerIndex).reduce((total, timer) => total + timer.totalSeconds, 0);
    //     return Math.max(0, elapsedForCurrentTimer); // Ensure no negative value
    // });

    // const [secondsRemaining, setSecondsRemaining] = useState(totalSeconds);
    // useEffect(() => {
    //     if (resetAll) {
    //         setSecondsPassed(0); // Reset the passed time
    //     }
    // }, [resetAll]);

    // useEffect(() => {
    //     const elapsedForCurrentTimer = totalSecondsPassed - timersArray.slice(0, currentTimerIndex).reduce((total, timer) => total + timer.totalSeconds, 0);
    //     setSecondsPassed(Math.max(0, elapsedForCurrentTimer)); // Ensure no negative value
    // }, [totalSecondsPassed, currentTimerIndex, timersArray]);

    // const fastforwardCountdown = () => {
    //     setStatus(STATUS.FASTFORWARDED);
    //     setSecondsPassed(totalSeconds); // Fast forward the time to end
    //     if (intervalRef.current !== null) {
    //         clearInterval(intervalRef.current);
    //         intervalRef.current = null;
    //     }
    // };

    // const intervalRef = useRef<number | null>();

    // useEffect(() => {
    //     if (isActive) {
    //         intervalRef.current = setInterval(() => {
    //             setSecondsPassed(prev => {
    //                 if (prev < totalSeconds - 1) return prev + 1;
    //                 else {
    //                     clearInterval(intervalRef.current);
    //                     intervalRef.current = null;
    //                     onFinish(totalSeconds);
    //                     return 0;
    //                 }
    //             });
    //         }, 1000);
    //     } else {
    //         if (intervalRef.current !== null) {
    //             clearInterval(intervalRef.current);
    //         }
    //     }

    //     return () => {
    //         if (intervalRef.current !== null) {
    //             clearInterval(intervalRef.current);
    //             intervalRef.current = null;
    //         }
    //     };
    // }, [status, isActive, onFinish]);

    // useEffect(() => {
    //     if (isActive) {
    //         intervalRef.current = setInterval(() => {
    //             setSecondsPassed(prev => {
    //                 if (prev < totalSeconds - 1) {
    //                     const newSecondsPassed = prev + 1;
    //                     //setTotalSecondsPassed(prevTotal => prevTotal + 1); // Increment global totalSecondsPassed
    //                     return newSecondsPassed;
    //                 } else {
    //                     clearInterval(intervalRef.current);
    //                     intervalRef.current = null;
    //                     onFinish(totalSeconds); // Call onFinish when countdown completes
    //                     return totalSeconds; // Stop at totalSeconds
    //                 }
    //             });
    //         }, 1000);
    //     } else {
    //         if (intervalRef.current !== null) {
    //             clearInterval(intervalRef.current);
    //         }
    //     }

    //     return () => {
    //         if (intervalRef.current !== null) {
    //             clearInterval(intervalRef.current);
    //             intervalRef.current = null;
    //         }
    //     };
    // }, [isActive, totalSeconds, onFinish, setTotalSecondsPassed]);

    return (
        <div className="App">
            <TimerContainer isActive={isActive}>
                <TimerTitle>Countdown</TimerTitle>
                <Timer>
                    <DisplayRepsForText repInput={repInput} />
                    <TimeDisplay>
                        {Math.floor((totalSeconds - secondsPassed) / 60)}:{(totalSeconds - secondsPassed) % 60}
                    </TimeDisplay>
                </Timer>
                <Buttons>
                    <Button onClick={fastforward} style={{ backgroundColor: 'darkgreen' }}>
                        Forward
                    </Button>
                </Buttons>
            </TimerContainer>
        </div>
    );
};

export default Countdown;
