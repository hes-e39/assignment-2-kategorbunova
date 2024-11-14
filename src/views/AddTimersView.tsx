import { useContext } from 'react';
import Countdown from '../components/timers/Countdown';
import Stopwatch from '../components/timers/Stopwatch';
import Tabata from '../components/timers/Tabata';
import XY from '../components/timers/XY';
import { DisplayRepsForText, DisplayTimeForText } from '../utils/helpers';
import { Button, Input, Inputs, MainText, SupportText, Timers } from '../utils/styles';
import { TimersContext } from './TimerProvider';

const AddTimersView = () => {
    const { addTimer, timersArray, timerInputs, handleInputChange, removeLastTimer } = useContext(TimersContext);

    const timers = [
        { title: 'Stopwatch', C: <Stopwatch /> },
        { title: 'Countdown', C: <Countdown /> },
        { title: 'XY', C: <XY /> },
        { title: 'Tabata', C: <Tabata /> },
    ];

    return (
        <div style={{ textAlign: 'center', paddingTop: '4rem' }}>
            Timers available for your custom workout
            <SupportText>enter the time and add to workout</SupportText>
            <Timers>
                {timers.map(timer => (
                    <div key={`timer-${timer.title}`}>
                        {timer.title}
                        <Inputs>
                            <Input>
                                <input
                                    style={{ maxWidth: '3rem', fontSize: '1rem', textAlign: 'right' }}
                                    id="timeMinInput"
                                    placeholder="Min"
                                    value={timerInputs[timer.title].timeMinInput}
                                    onChange={e => {
                                        handleInputChange(timer.title, 'timeMinInput', e.target.value);
                                    }}
                                />
                                :
                                <input
                                    style={{ maxWidth: '3rem', fontSize: '1rem', textAlign: 'left' }}
                                    id="timeSecInput"
                                    value={timerInputs[timer.title].timeSecInput}
                                    placeholder="Sec"
                                    onChange={e => {
                                        handleInputChange(timer.title, 'timeSecInput', e.target.value);
                                    }}
                                />
                            </Input>
                            {(timer.title === 'XY' || timer.title === 'Tabata') && (
                                <Input>
                                    <input
                                        style={{ maxWidth: '3rem', fontSize: '1rem', textAlign: 'right' }}
                                        id="repInput"
                                        placeholder="Rep"
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
                                        style={{ maxWidth: '3rem', fontSize: '1rem', textAlign: 'right' }}
                                        id="timeMinInputRest"
                                        placeholder="Rest Min"
                                        value={timerInputs[timer.title].timeMinInputRest}
                                        onChange={e => {
                                            handleInputChange(timer.title, 'timeMinInputRest', e.target.value);
                                        }}
                                    />
                                    :
                                    <input
                                        style={{ maxWidth: '3rem', fontSize: '1rem', textAlign: 'left' }}
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
            <ol style={{ textAlign: 'left', position: 'relative', left: '40%' }}>
                {timersArray.map((timer, index) => (
                    <li key={index} style={{ listStylePosition: 'inside' }}>
                        {DisplayTimeForText(timer.timeMinInput, timer.timeSecInput)}
                        <DisplayRepsForText repInput={timer.repInput} /> ({timer.title})
                    </li>
                ))}
            </ol>
            {timersArray.length !== 0 && (
                <Button onClick={() => removeLastTimer()} style={{ backgroundColor: 'maroon', width: '100px' }}>
                    Undo
                </Button>
            )}
        </div>
    );
};

export default AddTimersView;
