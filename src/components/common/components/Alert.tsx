import React from 'react';
import Alert, { AlertColor } from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

type Props = {
    alertType: AlertColor | undefined;
    message: string;
}

export default function AlertComponents({ alertType, message }: Props) {
    return (
        <Stack sx={{ width: '100%',marginBottom:'2rem' }} spacing={2}>
            <Alert severity={alertType}>{message}</Alert>
        </Stack>
    );
}