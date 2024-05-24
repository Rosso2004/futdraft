import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 15,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
}));



interface CmpProgressProps {
    value: number;
    maxValue?: number;
}

export default function CmpProgress({ value = 150, maxValue = 150 }: CmpProgressProps) {
    // Normalizza il valore per un massimo di 100
    const normalizedValue = (value / maxValue) * 100;

    return (
        <Stack spacing={2} sx={{ flexGrow: 1 }}>
            <BorderLinearProgress variant="determinate" value={normalizedValue} />
        </Stack>
    );
}