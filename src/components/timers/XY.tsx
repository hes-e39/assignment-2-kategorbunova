import { useContext, useEffect } from 'react';
import { useCountdownTimer } from '../../hooks/useCountdownTimer';
import type { TimerProps } from '../../utils/TimerProps';
import { convertToSeconds } from '../../utils/helpers';
import { Button, Buttons, TimeDisplay, Timer, TimerContainer, TimerTitle } from '../../utils/styles';
import { TimersContext } from '../../views/TimerProvider';

const XY: React.FC<TimerProps> = ({ repInput, timeMinInputRest, timeSecInputRest, totalSeconds, isActive, isCurrent, onFinish }) => {
    const totalSecondsRest = convertToSeconds(timeMinInputRest || 0, timeSecInputRest || 0) * Number(repInput);

    const { secondsPassed, setSecondsPassed, fastforward, repsRemaining, setRepsRemaining, oneRoundSeconds, oneRoundSecondsLeft } = useCountdownTimer(
        totalSeconds,
        isActive,
        onFinish,
        Number(repInput),
        totalSecondsRest,
    );
    const { totalSecondsPassed, currentTimerIndex, timersArray } = useContext(TimersContext);

    useEffect(() => {
        if (isCurrent) {
            const timerElapsedTime = totalSecondsPassed - timersArray.slice(0, currentTimerIndex).reduce((total, timer) => total + timer.totalSeconds, 0);
            setSecondsPassed(Math.max(0, timerElapsedTime));
        }
    }, [totalSecondsPassed, currentTimerIndex, isCurrent, timersArray, setSecondsPassed]);

    useEffect(() => {
        if (isCurrent) {
            const remainingReps = Math.ceil((totalSeconds - secondsPassed) / oneRoundSeconds);
            setRepsRemaining(remainingReps);
        }
    }, [oneRoundSeconds, secondsPassed, totalSeconds, isCurrent, setRepsRemaining]);

    return (
        <div className="App">
            <TimerContainer isActive={isActive}>
                <TimerTitle>XY</TimerTitle>
                <Timer isActive={isActive}>
                    <TimeDisplay isActive={isActive}>
                        <div style={{ fontSize: '14px' }}>Left</div>
                        <div>
                            {Math.floor(oneRoundSecondsLeft / 60)}:{oneRoundSecondsLeft % 60}
                        </div>
                        <div style={{ fontSize: '20px', color: 'lightgrey' }}>|</div>
                        <div style={{ fontSize: '14px' }}>On round</div> {repsRemaining}
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

export default XY;