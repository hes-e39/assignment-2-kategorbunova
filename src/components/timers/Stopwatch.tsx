import { useContext, useEffect } from 'react';
import { useCountdownTimer } from '../../hooks/useCountdownTimer';
import type { TimerProps } from '../../utils/TimerProps';
import { DisplayRepsForText } from '../../utils/helpers';
import { TimeDisplay, Timer, TimerContainer, TimerTitle } from '../../utils/styles';
import { Button, Buttons } from '../../utils/styles';
import { TimersContext } from '../../views/TimerProvider';

const Stopwatch: React.FC<TimerProps> = ({ repInput, totalSeconds, isActive, isCurrent, onFinish }) => {
    const { totalSecondsPassed, currentTimerIndex, timersArray } = useContext(TimersContext);

    const { secondsPassed, setSecondsPassed, fastforward } = useCountdownTimer(totalSeconds, isActive, onFinish, Number(repInput), 0);

    useEffect(() => {
        if (isCurrent) {
            const timerElapsedTime = totalSecondsPassed - timersArray.slice(0, currentTimerIndex).reduce((total, timer) => total + timer.totalSeconds, 0);
            setSecondsPassed(Math.max(0, timerElapsedTime));
        }
    }, [totalSecondsPassed, currentTimerIndex, isCurrent, timersArray, setSecondsPassed]);

    const remainingTime = totalSeconds - secondsPassed;

    return (
        <div className="App">
            <TimerContainer isActive={isActive}>
                <TimerTitle>Stopwatch</TimerTitle>
                <Timer isActive={isActive}>
                    <TimeDisplay>
                        <DisplayRepsForText repInput={Number(repInput)} />
                        {Math.floor(remainingTime / 60)}:{remainingTime % 60}
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
