export interface TimerProps {
    timeMinInput?: string;
    timeSecInput?: string;
    repInput: string;
    timeMinInputRest?: string;
    timeSecInputRest?: string;
    totalSeconds: number;
    isActive: boolean;
    isCurrent: boolean;
    onFinish: () => void;
}
