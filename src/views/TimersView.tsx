import { useContext } from 'react';
import Countdown from '../components/timers/Countdown';
import Stopwatch from '../components/timers/Stopwatch';
import Tabata from '../components/timers/Tabata';
import XY from '../components/timers/XY';
import { SupportText } from '../utils/styles';
import { TimerContainer, Timers } from '../utils/styles';
import { TimersContext } from './TimerProvider';

const TimersView = () => {
    const { timersArray } = useContext(TimersContext);

    const timers = [
        { title: 'Stopwatch', C: <Stopwatch /> },
        { title: 'Countdown', C: <Countdown /> },
        { title: 'XY', C: <XY /> },
        { title: 'Tabata', C: <Tabata /> },
    ];

    return (
        <div>
            <Timers>
                {timersArray.map((timer, index) => {
                    const matchedTimer = timers.find(t => t.title === timer.title);

                    return (
                        <div key={`timer-${timer.title}-${index}`}>
                            {index + 1}. {timer.title}
                            <TimerContainer>{matchedTimer?.C}</TimerContainer>
                        </div>
                    );
                })}
            </Timers>
            <SupportText>Text</SupportText>
        </div>
    );
};

export default TimersView;
