import { useEffect, useRef, useState } from 'react';
import { STATUS } from '../../utils/constants';
import type { StatusType } from '../../utils/constants';
import { DisplayForTime, convertToSeconds } from '../../utils/helpers';
import { Input, Inputs, TimeDisplay, Timer, TimerContainer, TimerTitle } from '../../utils/styles';

const XY = () => {
    const [timeMinInput, setTimeMinInput] = useState('');
    const [timeSecInput, setTimeSecInput] = useState('');
    const [repInput, setRepInput] = useState('');

    const [status, setStatus] = useState<StatusType>(STATUS.INITIAL);
    const [secondsRemaining, setSecondsRemaining] = useState(0);
    const [repRemaining, setRepRemaining] = useState(0);
    const intervalRef = useRef<number | null>();

    const secondsOnTimer = secondsRemaining % 60;
    const minutesRemaining = (secondsRemaining - secondsOnTimer) / 60;
    const minutesOnTimer = minutesRemaining % 60;
    const hoursOnTimer = (minutesRemaining - minutesOnTimer) / 60;

    const totalSeconds = convertToSeconds(timeMinInput, timeSecInput);

    const startStopCountdown = () => {
        if (Number.isNaN(totalSeconds) || (timeMinInput === '' && timeSecInput === '') || totalSeconds <= 0 || Number.isNaN(repInput) || repInput === '') {
            alert('Please enter a valid time.');
        } else if (totalSeconds > 3600) {
            alert('Friendly caution: excercise over an hour can lead to overtraining. Please enter a time under an hour.');
        } else {
            if (status !== STATUS.STARTED) {
                if (status === STATUS.INITIAL) {
                    setSecondsRemaining(totalSeconds);
                    setRepRemaining(Number(repInput));
                }
                setStatus(STATUS.STARTED);
            } else {
                setStatus(STATUS.STOPPED);
            }
        }
    };

    const resetCountdown = () => {
        setStatus(STATUS.STOPPED);
        const totalSeconds = convertToSeconds(timeMinInput, timeSecInput);
        setSecondsRemaining(totalSeconds);
        setRepRemaining(Number(repInput));
    };

    const fastforwardCountdown = () => {
        setStatus(STATUS.FASTFORWARDED);
        setSecondsRemaining(0);
        setRepRemaining(0);
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const initialCountdown = () => {
        setStatus(STATUS.INITIAL);
    };

    useEffect(() => {
        if (status === STATUS.STARTED && secondsRemaining === 0 && repRemaining > 0) {
            const totalSeconds = convertToSeconds(timeMinInput, timeSecInput);
            setSecondsRemaining(totalSeconds);
            setRepRemaining(Number(repInput));
            const reps = repRemaining - 1;

            if (reps === 0) {
                setSecondsRemaining(0);
                setStatus(STATUS.STOPPED);
            } else {
                setSecondsRemaining(totalSeconds);
            }
            setRepRemaining(reps);
        }
    }, [secondsRemaining, status, repRemaining, repInput, timeMinInput, timeSecInput]);

    useEffect(() => {
        if (status === STATUS.STARTED) {
            //this decrements the seconds immideately without waiting for the first second
            setSecondsRemaining(prev => {
                if (prev > 1) return prev - 1;
                return prev; //this is added to fix a TypeScript error to ensure we never return undefined
            });

            intervalRef.current = setInterval(() => {
                setSecondsRemaining(prevSec => {
                    if (prevSec > 1) {
                        return prevSec - 1;
                    }
                    return 0;
                });
            }, 1000);
        }

        return () => {
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [status]);

    return (
        <div className="App">
            <TimerContainer isActive={status === STATUS.STARTED}>
                <TimerTitle>XY</TimerTitle>

                {/* INPUTS FOR INITIAL STATE*/}
                <Timer>
                    {status === STATUS.INITIAL && (
                        <Inputs>
                            <Input>
                                <input
                                    style={{ maxWidth: '1.5rem', border: '0px solid white', fontSize: '1rem', textAlign: 'right' }}
                                    id="timeMinInput"
                                    placeholder="10"
                                    value={timeMinInput}
                                    onChange={e => {
                                        setTimeMinInput(e.target.value);
                                    }}
                                    disabled={secondsRemaining > 0}
                                />
                            </Input>
                            <Input>
                                :
                                <input
                                    style={{ maxWidth: '1.5rem', border: '0px solid white', fontSize: '1rem', textAlign: 'left' }}
                                    id="timeInput"
                                    value={timeSecInput}
                                    placeholder="00"
                                    onChange={e => {
                                        setTimeSecInput(e.target.value);
                                    }}
                                    disabled={secondsRemaining > 0}
                                />
                            </Input>
                            <Input>
                                x
                                <input
                                    style={{ maxWidth: '1.5rem', border: '0px solid white', fontSize: '0.75rem', textAlign: 'left' }}
                                    id="timeInput"
                                    value={repInput}
                                    placeholder="Reps"
                                    onChange={e => {
                                        setRepInput(e.target.value);
                                    }}
                                    disabled={secondsRemaining > 0}
                                />
                            </Input>
                        </Inputs>
                    )}

                    {/* TIME DISPLAY*/}
                    {status !== STATUS.INITIAL && (
                        <TimeDisplay isActive={status === STATUS.STARTED}>
                            <div style={{ fontSize: '14px' }}>Left</div>
                            <DisplayForTime hoursOnTimer={hoursOnTimer} minutesOnTimer={minutesOnTimer} secondsOnTimer={secondsOnTimer} />
                            <div style={{ fontSize: '20px', color: 'lightgrey' }}>|</div>
                            <div style={{ fontSize: '14px' }}>On round</div> {repRemaining}
                        </TimeDisplay>
                    )}
                </Timer>

                {/* DYMANIC TEXT LINE*/}

                {/* Show this text at initial state*/}
                {/* {status === STATUS.INITIAL &&
                <SupportText>
                Please input time for a time and repetitions above
                </SupportText>} */}

                {/* Show this text when timer in progress */}
                {/* {status !== STATUS.INITIAL && (status !== STATUS.FASTFORWARDED) && (secondsRemaining !== 0) &&
                <SupportText>
                In progress:
                <DisplayForText totalSeconds={totalSeconds} timeSecInput={timeSecInput}/>
                , for {repInput} rounds
                </SupportText>} */}

                {/* Show this text when timer is finished or fastforwarded */}
                {/* {(status === STATUS.FASTFORWARDED || (secondsRemaining === 0 && status !== STATUS.INITIAL)) &&
              <SupportText>
                Finished:
                <DisplayForText totalSeconds={totalSeconds} timeSecInput={timeSecInput}/>
                , for {repInput} rounds
                </SupportText>}
               */}

                {/* DYMANIC BUTTONS*/}

                {/* <Buttons>
                
            {(status !== STATUS.FASTFORWARDED && (secondsRemaining !== 0 || status === STATUS.INITIAL)) &&    
                <Button onClick={startStopCountdown} isActive={status === STATUS.STARTED}>
                {status === STATUS.STARTED ? 'Pause' : 'Start'}
                </Button>}

            {(status !== STATUS.INITIAL || (secondsRemaining !== totalSeconds && repRemaining !== 0)) &&
                <Button onClick={resetCountdown} style={{backgroundColor: 'navy'}}>
                Reset
                </Button>}

            {(status === STATUS.FASTFORWARDED || (secondsRemaining === 0 && status !== STATUS.INITIAL)) &&     
                <Button onClick={initialCountdown} style={{backgroundColor: 'steelblue'}}>
                New Input
                </Button>}

            {status !== STATUS.INITIAL && status !== STATUS.FASTFORWARDED && secondsRemaining !== 0 && 
                <Button onClick={fastforwardCountdown} style={{backgroundColor: 'darkgreen'}}>
                Forward
                </Button>}   
              
            </Buttons> */}
            </TimerContainer>
        </div>
    );
};

export default XY;
