import { useEffect, useState } from 'react';
import { DisplayRepsForText, DisplayTimeForText } from '../utils/helpers';
import { Button, Input, MainText, SupportText, Timers } from '../utils/styles';

import Countdown from '../components/timers/Countdown';
import Stopwatch from '../components/timers/Stopwatch';
import Tabata from '../components/timers/Tabata';
import XY from '../components/timers/XY';

const AddTimersView = () => {
    const [timerInputs, setTimerInputs] = useState({
        Stopwatch: { timeMinInput: '', timeSecInput: '' },
        Countdown: { timeMinInput: '', timeSecInput: '' },
        XY: { timeMinInput: '', timeSecInput: '', repInput: '' },
        Tabata: { timeMinInputRest: '', timeSecInputRest: '', timeMinInputWork: '', timeSecInputWork: '', repInput: '' },
    });

    const timers = [
        { title: 'Stopwatch', C: <Stopwatch /> },
        { title: 'Countdown', C: <Countdown /> },
        { title: 'XY', C: <XY /> },
        { title: 'Tabata', C: <Tabata /> },
    ];

    const handleInputChange = (title, field, value) => {
        setTimerInputs(prevInputs => ({ ...prevInputs, [title]: { ...prevInputs[title], [field]: value } }));
    };

    //var timersArray = new Array();

    //const timersArray = [];
    const [timersArray, setTimersArray] = useState([]);

    const addTimer = title => {
        const { timeMinInput = '0', timeSecInput = '0', repInput = '1' } = timerInputs[title];
        const totalSeconds = (Number.parseInt(timeMinInput, 10) || 0) * 60 + (Number.parseInt(timeSecInput, 10) || 0);

        setTimersArray(prevArray => [...prevArray, { title, totalSeconds, repInput }]);
    };

    const removeLastTimer = () => {
        setTimersArray(prevArray => prevArray.slice(0, -1));
    };

    useEffect(() => {
        console.log(timersArray);
    }, [timersArray]);

    return (
        <div style={{ textAlign: 'center', paddingTop: '4rem' }}>
            Timers available for your custom workout
            <SupportText>enter the time and add to workout</SupportText>
            <Timers>
                {timers.map(timer => (
                    <div key={`timer-${timer.title}`}>
                        {timer.title}
                        <Input>
                            <input
                                style={{ maxWidth: '2rem', border: '0px solid white', fontSize: '1rem', textAlign: 'right' }}
                                id="timeMinInput"
                                placeholder="Min"
                                value={timerInputs[timer.title].timeMinInput}
                                onChange={e => {
                                    handleInputChange(timer.title, 'timeMinInput', e.target.value);
                                }}
                            />
                            :
                            <input
                                style={{ maxWidth: '2rem', border: '0px solid white', fontSize: '1rem', textAlign: 'left' }}
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
                                    style={{ maxWidth: '2rem', border: '0px solid white', fontSize: '1rem', textAlign: 'right' }}
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
                                    style={{ maxWidth: '2rem', border: '0px solid white', fontSize: '1rem', textAlign: 'right' }}
                                    id="timeMinInputRest"
                                    placeholder="Min"
                                    value={timerInputs[timer.title].timeMinInputRest}
                                    onChange={e => {
                                        handleInputChange(timer.title, 'timeMinInputRest', e.target.value);
                                    }}
                                />
                                :
                                <input
                                    style={{ maxWidth: '2rem', border: '0px solid white', fontSize: '1rem', textAlign: 'left' }}
                                    id="timeSecInputRest"
                                    placeholder="Sec"
                                    value={timerInputs[timer.title].timeSecInputRest}
                                    onChange={e => {
                                        handleInputChange(timer.title, 'timeSecInputRest', e.target.value);
                                    }}
                                />
                            </Input>
                        )}

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
                        <DisplayTimeForText totalSeconds={timer.totalSeconds} /> <DisplayRepsForText repInput={timer.repInput} /> ({timer.title})
                    </li>
                ))}
            </ol>
            <Button onClick={() => removeLastTimer()} style={{ backgroundColor: 'maroon', width: '100px' }}>
                Undo
            </Button>
        </div>
    );
};

export default AddTimersView;
