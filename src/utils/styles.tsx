import styled from 'styled-components';

const Timers = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: space-between;
  gap: 2rem;
    flex-basis: 100%;
    margin: 3rem 10rem;

`;

const TimerTitle = styled.div`
  font-size: 0.75em;
  font-family: sans-serif;
  color: white;
  text-align: center;
  padding-top: 2rem;
  text-transform: uppercase;
letter-spacing: .1rem;

`;

interface TimerContainerProps {
    isActive?: boolean;
}

const TimerContainer = styled.div<TimerContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: space-between;
  background-color: ${props => (props.isActive ? 'green' : 'grey')};  
  border-radius: 10px;
  flex-basis: 100%;
  flex-grow: 1;
`;

const Timer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  width: 100px;
  padding: 20px;
  margin: 20px;
  margin-bottom: 15px;
  font-size: 1rem;

  background-color: white;
  border-radius: 10px;
`;

const TimeDisplay = styled.div<TimerContainerProps>`
  border: 2px solid white;
  color: ${props => (props.isActive ? 'black' : 'grey')}; 
  display: flex;
    align-items: center;
  justify-content: center;
    gap: 0.5rem;

`;

const Button = styled.button<TimerContainerProps>`
color: white;
margin: 0.25em;
border-radius: 10px;
border: 2px solid;
width: 60px;
height: 30px;
background-color: ${props => (props.isActive ? 'maroon' : 'green')}; 
`;
const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: space-between;
  padding-bottom: 1rem;
`;

const Input = styled.div`
`;

const Inputs = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.25rem;
`;

const SupportText = styled.div`
  font-size: 0.75rem; 
  color: lightgrey; 
  padding: 0.5rem;
  display: flex;
  gap: 1.5px;
  justify-content: center;

`;

const MainText = styled.div`
  font-size: 1rem;
  color: black;
`;

export { Button, Buttons, Input, Inputs, TimeDisplay, TimerContainer, Timer, TimerTitle, SupportText, Timers, MainText };
