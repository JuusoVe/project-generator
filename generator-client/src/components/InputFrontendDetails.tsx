import {
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    TextField,
} from '@mui/material';
import { ChangeEvent } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { IDS, TBA_SUFFIX } from '../constants';
import { FrontEnds, StorageKeys } from '../models';

const InputFrontendDetails = () => {
    const [_value, setValue] = useLocalStorage(
        StorageKeys.frontendService,
        FrontEnds.vercel as string
    );

    const [frontendProjectNameValue, setFrontendProjectNameValue] =
        useLocalStorage(StorageKeys.frontendProjectName, '');

    const updateFrontendProjectName = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFrontendProjectNameValue(event.target.value);
    };

    return (
        <>
            <FormLabel id={IDS.FRONTEND}>Frontend</FormLabel>
            <RadioGroup
                aria-labelledby={IDS.FRONTEND}
                name={IDS.FRONTEND}
                onChange={(event) => setValue(event.target.value)}
                defaultValue={FrontEnds.vercel}
            >
                <FormControlLabel
                    value={FrontEnds.vercel}
                    control={<Radio />}
                    label={FrontEnds.vercel}
                />
                <FormControlLabel
                    value={FrontEnds.netlify}
                    control={<Radio />}
                    label={`${FrontEnds.netlify + TBA_SUFFIX}`}
                    disabled
                />
            </RadioGroup>
            <TextField
                id={IDS.FRONTEND}
                label="Frontend project name"
                variant="outlined"
                required
                onChange={updateFrontendProjectName}
                value={frontendProjectNameValue}
            />
        </>
    );
};

export default InputFrontendDetails;
