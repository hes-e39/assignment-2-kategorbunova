import { useContext } from 'react';
import Countdown from '../components/timers/Countdown';
import Stopwatch from '../components/timers/Stopwatch';
import Tabata from '../components/timers/Tabata';
import XY from '../components/timers/XY';
import { STATUS } from '../utils/constants';
import { Button, Buttons, SupportText } from '../utils/styles';
import { Timers } from '../utils/styles';
import { TimersContext } from './TimerProvider';

const TimersView = () => {
    const { timersArray, resetTimers, resetAll, totalQueueSeconds, totalSecondsPassed, setTotalSecondsPassed, currentTimerIndex, setCurrentTimerIndex, statusQueue, setStatusQueue } =
        useContext(TimersContext);

    const timers = [
        { title: 'Stopwatch', C: Stopwatch },
        { title: 'Countdown', C: Countdown },
        { title: 'XY', C: XY },
        { title: 'Tabata', C: Tabata },
    ];

    const handleTimerFinish = () => {
        // const newSeconds = totalSecondsPassed;
        // const newObject = newSeconds + secondsElapsed;
        // setTotalSecondsPassed(newObject);

        const newIndex = currentTimerIndex;
        const newObject2 = newIndex + 1;
        setCurrentTimerIndex(newObject2);
    };

    const startStopQueue = () => {
        if (statusQueue !== STATUS.STARTED) {
            setStatusQueue(STATUS.STARTED); // Start the queue
        } else {
            setStatusQueue(STATUS.STOPPED); // Stop the queue
        }
    };

    const resetQueue = () => {
        resetTimers();
        setTotalSecondsPassed(0);
        setCurrentTimerIndex(0);
        setStatusQueue(STATUS.INITIAL);
    };

    return (
        <div>
            <p>
                Total Queue Time: {Math.floor(totalQueueSeconds / 60)} min {totalQueueSeconds % 60} sec
            </p>
            <p>
                Total Time Passed: {Math.floor(totalSecondsPassed / 60)} min {totalSecondsPassed % 60} sec
            </p>
            {statusQueue},{currentTimerIndex}
            <progress value={totalSecondsPassed / totalQueueSeconds} />
            <Timers>
                {timersArray.map((timer, index) => {
                    const matchedTimer = timers.find(t => t.title === timer.title);

                    const Timer = matchedTimer.C;

                    return (
                        <div key={`timer-${index}`}>
                            <h2>
                                Timer {index + 1}: {timer.title} {index === currentTimerIndex && '(Active)'}
                            </h2>
                            <Timer
                                timeMinInput={timer.timeMinInput}
                                timeSecInput={timer.timeSecInput}
                                repInput={timer.repInput}
                                timeMinInputRest={timer.timeMinInputRest}
                                timeSecInputRest={timer.timeSecInputRest}
                                totalSeconds={timer.totalSeconds}
                                isActive={index === currentTimerIndex && statusQueue === STATUS.STARTED}
                                onFinish={handleTimerFinish}
                            />
                            <p>Total seconds: {timer.totalSeconds}</p>
                        </div>
                    );
                })}
            </Timers>
            <Buttons>
                <Button onClick={startStopQueue}>{statusQueue === STATUS.STARTED ? 'Pause Queue' : 'Start Queue'}</Button>
                <Button onClick={resetQueue} style={{ backgroundColor: 'navy' }}>
                    Reset
                </Button>
            </Buttons>
            <SupportText>Text</SupportText>
        </div>
    );
};

export default TimersView;
