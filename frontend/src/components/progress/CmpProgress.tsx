import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 15,
    borderRadius: 5,
    position: 'relative',
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
}));

interface ICmpProgress {
    value: number;
    maxValue: number;
}

const CmpProgress: React.FC<ICmpProgress> = (props) => {
    const { value, maxValue } = props;
    const normalizedValue = (value / maxValue) * 100;

    return (
        <Stack spacing={2} sx={{ flexGrow: 1 }}>
            <Box position="relative" display="inline-flex" width="100%">
                <BorderLinearProgress variant="determinate" value={normalizedValue} sx={{ width: '100%' }} />
                <Box
                    top={0}
                    left={`calc(${normalizedValue}% - ${Math.round(normalizedValue) >= 10 ? '6%' : '4.3%'})`}
                    bottom={0}
                    position="absolute"
                    display="flex"
                    alignItems="center"
                >
                    <Typography variant="body2" color="white">{`${Math.round(normalizedValue)}%`}</Typography>
                </Box>
            </Box>
        </Stack>
    );
}

export default CmpProgress;
