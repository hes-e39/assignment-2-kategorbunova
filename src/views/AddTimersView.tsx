import { useContext } from 'react';
import Countdown from '../components/timers/Countdown';
import Stopwatch from '../components/timers/Stopwatch';
import Tabata from '../components/timers/Tabata';
import XY from '../components/timers/XY';
import { DisplayRepsForText, DisplayTimeForText } from '../utils/helpers';
import { Button, Buttons, Input, Inputs, MainText, SupportText, Timers } from '../utils/styles';
import { TimersContext } from './TimerProvider';

const AddTimersView = () => {
    const { addTimer, timersArray, timerInputs, handleInputChange, removeLastTimer, removeAllTimers, totalQueueSeconds, totalSecondsPassed, currentTimerIndex } = useContext(TimersContext);

    const timers = [
        { title: 'Stopwatch', C: Stopwatch },
        { title: 'Countdown', C: Countdown },
        { title: 'XY', C: XY },
        { title: 'Tabata', C: Tabata },
    ];

    return (
        <div style={{ textAlign: 'center', paddingTop: '4rem' }}>
            Timers available for your custom workout. Enter the time and add to workout.
            <Timers>
                {timers.map(timer => (
                    <div key={`timer-${timer.title}`}>
                        {timer.title}
                        <Inputs>
                            <Input>
                                <input
                                    style={{ maxWidth: '4rem', fontSize: '0.75rem', textAlign: 'right' }}
                                    id="timeMinInput"
                                    placeholder="Min"
                                    value={timerInputs[timer.title]?.timeMinInput || ''}
                                    onChange={e => {
                                        handleInputChange(timer.title, 'timeMinInput', e.target.value);
                                    }}
                                />
                                :
                                <input
                                    style={{ maxWidth: '4rem', fontSize: '0.75rem', textAlign: 'left' }}
                                    id="timeSecInput"
                                    value={timerInputs[timer.title]?.timeSecInput || ''}
                                    placeholder="Sec"
                                    onChange={e => {
                                        handleInputChange(timer.title, 'timeSecInput', e.target.value);
                                    }}
                                />
                            </Input>
                            {(timer.title === 'XY' || timer.title === 'Tabata') && (
                                <Input>
                                    <input
                                        style={{ maxWidth: '4rem', fontSize: '0.75rem', textAlign: 'left' }}
                                        id="repInput"
                                        placeholder="Reps"
                                        value={timerInputs[timer.title].repInput}
                                        onChange={e => {
                                            handleInputChange(timer.title, 'repInput', e.target.value);
                                        }}
                                    />
                                </Input>
                            )}
                            {timer.title === 'Tabata' && (
                                <Input>
                                    <input
                                        style={{ maxWidth: '4rem', fontSize: '0.75rem', textAlign: 'right' }}
                                        id="timeMinInputRest"
                                        placeholder="Rest Min"
                                        value={timerInputs[timer.title].timeMinInputRest}
                                        onChange={e => {
                                            handleInputChange(timer.title, 'timeMinInputRest', e.target.value);
                                        }}
                                    />
                                    :
                                    <input
                                        style={{ maxWidth: '4rem', fontSize: '0.75rem', textAlign: 'left' }}
                                        id="timeSecInputRest"
                                        placeholder="Rest Sec"
                                        value={timerInputs[timer.title].timeSecInputRest}
                                        onChange={e => {
                                            handleInputChange(timer.title, 'timeSecInputRest', e.target.value);
                                        }}
                                    />
                                </Input>
                            )}
                        </Inputs>
                        <Button onClick={() => addTimer(timer.title)} style={{ backgroundColor: 'navy', width: '100px' }}>
                            Add
                        </Button>
                    </div>
                ))}
            </Timers>
            <MainText style={{ paddingTop: '2rem' }}>Your Workout</MainText>
            <SupportText>
                Total Time: {Math.floor(totalQueueSeconds / 60)} min {totalQueueSeconds % 60} sec
            </SupportText>
            <ol style={{ textAlign: 'left', position: 'relative', left: '40%' }}>
                {timersArray.map((timer, index) => {
                    const isStarted = index <= currentTimerIndex;
                    return (
                        <li key={index} style={{ listStylePosition: 'inside', color: isStarted && totalSecondsPassed > 0 ? 'gray' : 'black' }}>
                            {DisplayTimeForText(timer.timeMinInput, timer.timeSecInput)}
                            {(Number(timer.timeSecInputRest) !== 0 || Number(timer.timeMinInputRest) !== 0) && (
                                <> (Work) + {DisplayTimeForText(timer.timeMinInputRest, timer.timeSecInputRest)} (Rest)</>
                            )}
                            <DisplayRepsForText repInput={Number(timer.repInput)} /> ({timer.title}){isStarted && totalSecondsPassed > 0 && ' (started)'}
                        </li>
                    );
                })}
            </ol>
            {timersArray.length !== 0 && (
                <Buttons>
                    <Button onClick={() => removeLastTimer()} style={{ backgroundColor: 'maroon', width: '100px' }}>
                        Remove Last
                    </Button>
                    <Button onClick={() => removeAllTimers()} style={{ backgroundColor: 'maroon', width: '100px' }}>
                        Remove All
                    </Button>
                </Buttons>
            )}
        </div>
    );
};

export default AddTimersView;
