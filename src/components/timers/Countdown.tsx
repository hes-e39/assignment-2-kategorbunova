import { useContext, useEffect } from 'react';
import type React from 'react';
import { useCountdownTimer } from '../../hooks/useCountdownTimer';
import { DisplayRepsForText } from '../../utils/helpers';
import { TimeDisplay, Timer, TimerContainer, TimerTitle } from '../../utils/styles';
import { Button, Buttons } from '../../utils/styles';
import { TimersContext } from '../../views/TimerProvider';

const Countdown: React.FC<TimerProps> = ({ repInput, totalSeconds, isActive, isCurrent, onFinish }) => {
    const { secondsPassed, setSecondsPassed, fastforward } = useCountdownTimer(totalSeconds, isActive, onFinish, repInput);

    const { totalSecondsPassed, currentTimerIndex, timersArray } = useContext(TimersContext);

    //This is to keep the UI of timers consistent with global variables and not reset them when clicking from Add to Home pages.
    //I know I'm reusing this across components because composers stayed local. I would like to DRY this as well and move the components to naturally take in global variables,
    //but that required a lot of changed logic and I already was running out of time. Could be an improvement for A3.
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
                <TimerTitle>Countdown</TimerTitle>
                <Timer>
                    <DisplayRepsForText repInput={repInput} />
                    <TimeDisplay>
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

export default Countdown;
