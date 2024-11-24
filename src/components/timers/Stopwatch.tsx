import { useCountdownTimer } from '../../hooks/useCountdownTimer';
import { DisplayRepsForText } from '../../utils/helpers';
import { TimeDisplay, Timer, TimerContainer, TimerTitle } from '../../utils/styles';
import { Button, Buttons } from '../../utils/styles';

const Stopwatch = ({ timeMinInput, timeSecInput, repInput, timeMinInputRest, timeSecInputRest, totalSeconds, isActive, onFinish }) => {
    //const [status, setStatus] = useState<StatusType>(STATUS.INITIAL);
    //const [secondsPassed, setSecondsPassed] = useState(0);
    // const intervalRef = useRef<number | null>();

    const { secondsPassed, fastforward } = useCountdownTimer(totalSeconds, isActive, onFinish, repInput);
    // const totalSeconds = convertToSeconds(timeMinInput, timeSecInput);

    // const secondsOnTimer = secondsPassed % 60;
    // const minutesRemaining = (secondsPassed - secondsOnTimer) / 60;
    // const minutesOnTimer = minutesRemaining % 60;
    // const hoursOnTimer = (minutesRemaining - minutesOnTimer) / 60;

    // const startStopCountdown = () => {
    //     if (Number.isNaN(totalSeconds) || (timeMinInput === '' && timeSecInput === '') || totalSeconds <= 0) {
    //         alert('Please enter a valid time.');
    //     } else if (totalSeconds > 3600) {
    //         alert('Friendly caution: excercise over an hour can lead to overtraining. Please enter a time under an hour.');
    //     } else {
    //         if (status === STATUS.INITIAL) {
    //             //resetting the input to 0 when user clicks "new input" again
    //             setSecondsPassed(0);
    //         }
    //         if (status !== STATUS.STARTED) {
    //             setStatus(STATUS.STARTED);
    //         } else {
    //             setStatus(STATUS.STOPPED);
    //         }
    //     }
    // };

    // const resetCountdown = () => {
    //     setStatus(STATUS.STOPPED);
    //     setSecondsPassed(0);
    // };

    // const fastforwardCountdown = () => {
    //     setStatus(STATUS.FASTFORWARDED);
    //     setSecondsPassed(totalSeconds);
    //     if (intervalRef.current !== null) {
    //         clearInterval(intervalRef.current);
    //         intervalRef.current = null;
    //     }
    // };

    // const initialCountdown = () => {
    //     setStatus(STATUS.INITIAL);
    // };

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

    return (
        <div className="App">
            <TimerContainer isActive={isActive}>
                <TimerTitle>Stopwatch</TimerTitle>
                <Timer isActive={isActive}>
                    <TimeDisplay>
                        <DisplayRepsForText repInput={repInput} />
                        {Math.floor(secondsPassed / 60)}:{secondsPassed % 60}
                    </TimeDisplay>
                </Timer>
            </TimerContainer>
            <Buttons>
                {isActive === true && (
                    <Button onClick={fastforward} style={{ backgroundColor: 'darkgreen' }}>
                        Forward
                    </Button>
                )}
            </Buttons>
        </div>
    );
};

export default Stopwatch;
