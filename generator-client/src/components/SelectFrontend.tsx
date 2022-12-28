import { RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useLocalStorage } from 'usehooks-ts';
import { IDENTIFIERS, TBA_SUFFIX } from '../constants';
import { LocalStorageKeys } from '../models';

export enum FrontEnds {
    vercel = 'vercel',
    netlify = 'netlify',
}

const SelectFrontend = () => {
    const [_value, setValue] = useLocalStorage(
        LocalStorageKeys.frontendService,
        FrontEnds.vercel as string
    );

    return (
        <>
            <RadioGroup
                aria-labelledby={IDENTIFIERS.FRONTEND}
                name={IDENTIFIERS.FRONTEND}
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
        </>
    );
};

export default SelectFrontend;
