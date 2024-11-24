import { useContext } from 'react';
import { Link } from 'react-router-dom'; // Make sure to import Link
import Countdown from '../components/timers/Countdown';
import Stopwatch from '../components/timers/Stopwatch';
import Tabata from '../components/timers/Tabata';
import XY from '../components/timers/XY';
import { STATUS } from '../utils/constants';
import { Button, Buttons } from '../utils/styles';
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
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <progress
                    value={totalSecondsPassed / totalQueueSeconds}
                    max="1"
                    style={{ width: '80%', height: '1rem' }} // Customize the width and height of the progress bar
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%' }}>
                    <p style={{ margin: 0 }}>
                        Total Time Passed: {Math.floor(totalSecondsPassed / 60)} min {totalSecondsPassed % 60} sec
                    </p>
                    <p style={{ margin: 0 }}>
                        Total Queue Time: {Math.floor(totalQueueSeconds / 60)} min {totalQueueSeconds % 60} sec
                    </p>
                </div>
            </div>
            {timersArray.length > 0 && (
                <Buttons>
                    <Button onClick={startStopQueue} style={{ backgroundColor: statusQueue === STATUS.STARTED ? 'maroon' : 'green' }}>
                        {statusQueue === STATUS.STARTED ? 'Pause Queue' : 'Start Queue'}
                    </Button>

                    {statusQueue !== STATUS.INITIAL && (
                        <Button onClick={resetQueue} style={{ backgroundColor: 'navy' }}>
                            Reset Queue
                        </Button>
                    )}
                </Buttons>
            )}
            {timersArray.length === 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'grey', padding: '2rem' }}>
                    <p>
                        Navigate to the{' '}
                        <Link to="/add" style={{ color: 'blue', textDecoration: 'underline' }}>
                            Add page
                        </Link>{' '}
                        to add timers to your queue
                    </p>
                </div>
            )}
            <Timers>
                {timersArray.map((timer, index) => {
                    const matchedTimer = timers.find(t => t.title === timer.title);

                    const Timer = matchedTimer.C;

                    return (
                        <div key={`timer-${index}`}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div style={{ fontSize: '1.5rem' }}>
                                    Timer {index + 1} {index === currentTimerIndex && '(Active)'}
                                </div>
                                <div style={{ fontStyle: 'italic' }}>Total seconds: {timer.totalSeconds}</div>
                            </div>
                            <Timer
                                timeMinInput={timer.timeMinInput}
                                timeSecInput={timer.timeSecInput}
                                repInput={timer.repInput}
                                timeMinInputRest={timer.timeMinInputRest}
                                timeSecInputRest={timer.timeSecInputRest}
                                totalSeconds={timer.totalSeconds}
                                isActive={index === currentTimerIndex && statusQueue === STATUS.STARTED}
                                isCurrent={index === currentTimerIndex && statusQueue !== STATUS.INITIAL}
                                onFinish={handleTimerFinish}
                            />
                        </div>
                    );
                })}
            </Timers>
        </div>
    );
};

export default TimersView;
