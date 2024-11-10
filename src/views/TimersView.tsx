import { SupportText, TimerContainer, Timers } from '../utils/styles';

import Countdown from '../components/timers/Countdown';
import Stopwatch from '../components/timers/Stopwatch';
import Tabata from '../components/timers/Tabata';
import XY from '../components/timers/XY';

const TimersView = () => {
    const timers = [
        { title: 'Stopwatch', C: <Stopwatch /> },
        { title: 'Countdown', C: <Countdown /> },
        { title: 'XY', C: <XY /> },
        { title: 'Tabata', C: <Tabata /> },
    ];

    return (
        <div>
            <Timers>
                {timers.map(timer => (
                    <div key={`timer-${timer.title}`}>
                        <TimerContainer> {timer.C} </TimerContainer>
                    </div>
                ))}
            </Timers>

            <SupportText>Text</SupportText>
            {/* <Buttons>
                <Button onClick={startStopCountdown} isActive={status === STATUS.STARTED}>
                    Pause/Start
                </Button>

                <Button onClick={resetCountdown} style={{ backgroundColor: 'navy' }}>
                    Reset
                </Button>

                <Button onClick={initialCountdown} style={{ backgroundColor: 'steelblue' }}>
                    New Input
                </Button>

                <Button onClick={fastforwardCountdown} style={{ backgroundColor: 'darkgreen' }}>
                    Forward
                </Button>
            </Buttons> */}
        </div>
    );
};

export default TimersView;
