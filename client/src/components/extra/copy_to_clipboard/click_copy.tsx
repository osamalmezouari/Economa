import {
    Tooltip,
    TextField,
    IconButton,
    InputAdornment,
} from '@mui/material';
import useCopyToClipboard from '../../../hooks/useCopyToClipboard';
import Iconify from '../../base/iconify';
import { useSnackbar } from 'notistack';
import CopyInputTextProps from './interface';

export default function CopyInputText({
    value,
    ...props
} : CopyInputTextProps ) {
    const { enqueueSnackbar } = useSnackbar();
    const { copy } = useCopyToClipboard();
    const onCopy = (text: string) => {
        if (text) {
            enqueueSnackbar('Copied!');
            copy(text);
        }
    };

    return (
        <>
            <TextField
                fullWidth
                disabled
                value={value}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Tooltip title="Copy">
                                <IconButton onClick={() => onCopy(value)}>
                                    <Iconify icon="eva:copy-fill" width={24} />
                                </IconButton>
                            </Tooltip>
                        </InputAdornment>
                    ),
                }}
                {...props}
            />

        </>
    );
}
