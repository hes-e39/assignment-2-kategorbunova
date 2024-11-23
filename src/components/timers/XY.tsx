import { useCountdownTimer } from '../../hooks/useCountdownTimer';
import { convertToSeconds } from '../../utils/helpers';
import { Button, Buttons, TimeDisplay, Timer, TimerContainer, TimerTitle } from '../../utils/styles';

const XY = ({ timeMinInput, timeSecInput, repInput, timeMinInputRest, timeSecInputRest, totalSeconds, isActive, onFinish }) => {
    // const [timeMinInput, setTimeMinInput] = useState('');
    // const [timeSecInput, setTimeSecInput] = useState('');
    // const [repInput, setRepInput] = useState('');

    // const [status, setStatus] = useState<StatusType>(STATUS.INITIAL);
    // const [secondsRemaining, setSecondsRemaining] = useState(totalSeconds);
    //const [repsRemaining, setRepsRemaining] = useState(Number(repInput) || 1);

    const totalSecondsRest = convertToSeconds(timeMinInputRest, timeSecInputRest) * repInput;

    const { secondsPassed, fastforward, repsRemaining, oneRoundSecondsLeft } = useCountdownTimer(totalSeconds, isActive, onFinish, repInput, totalSecondsRest);

    // const [repRemaining, setRepRemaining] = useState(0);
    // const intervalRef = useRef<number | null>();

    // const secondsOnTimer = secondsRemaining % 60;
    // const minutesRemaining = (secondsRemaining - secondsOnTimer) / 60;
    // const minutesOnTimer = minutesRemaining % 60;
    // const hoursOnTimer = (minutesRemaining - minutesOnTimer) / 60;

    // const totalSeconds = convertToSeconds(timeMinInput, timeSecInput);

    // const startStopCountdown = () => {
    //     if (Number.isNaN(totalSeconds) || (timeMinInput === '' && timeSecInput === '') || totalSeconds <= 0 || Number.isNaN(repInput) || repInput === '') {
    //         alert('Please enter a valid time.');
    //     } else if (totalSeconds > 3600) {
    //         alert('Friendly caution: excercise over an hour can lead to overtraining. Please enter a time under an hour.');
    //     } else {
    //         if (status !== STATUS.STARTED) {
    //             if (status === STATUS.INITIAL) {
    //                 setSecondsRemaining(totalSeconds);
    //                 setRepRemaining(Number(repInput));
    //             }
    //             setStatus(STATUS.STARTED);
    //         } else {
    //             setStatus(STATUS.STOPPED);
    //         }
    //     }
    // };

    // const resetCountdown = () => {
    //     setStatus(STATUS.STOPPED);
    //     const totalSeconds = convertToSeconds(timeMinInput, timeSecInput);
    //     setSecondsRemaining(totalSeconds);
    //     setRepRemaining(Number(repInput));
    // };

    // const fastforwardCountdown = () => {
    //     setStatus(STATUS.FASTFORWARDED);
    //     setSecondsRemaining(0);
    //     setRepRemaining(0);
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
    //             setSecondsRemaining(prevSec => {
    //                 if (prevSec > 1) {
    //                     return prevSec - 1;
    //                 }
    //                 return 0;
    //             });
    //         }, 1000);
    //     }

    //     return () => {
    //         if (intervalRef.current !== null) {
    //             clearInterval(intervalRef.current);
    //             intervalRef.current = null;
    //         }
    //     };
    // }, [isActive]);

    return (
        <div className="App">
            <TimerContainer isActive={isActive}>
                <TimerTitle>XY</TimerTitle>
                <Timer>
                    <TimeDisplay isActive={isActive}>
                        <div style={{ fontSize: '14px' }}>Left</div>
                        <div>
                            {Math.floor(oneRoundSecondsLeft / 60)}:{oneRoundSecondsLeft % 60}
                        </div>
                        <div style={{ fontSize: '20px', color: 'lightgrey' }}>|</div>
                        <div style={{ fontSize: '14px' }}>On round</div> {repsRemaining}
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

export default XY;
