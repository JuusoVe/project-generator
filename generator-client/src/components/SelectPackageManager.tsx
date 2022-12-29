import { FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useLocalStorage } from 'usehooks-ts';
import { IDS, TBA_SUFFIX } from '../constants';
import { StorageKeys } from '../models';

export enum PackageManagers {
    npm = 'npm',
    yarn = 'yarn',
}

const SelectPackageManager = () => {
    const [_value, setValue] = useLocalStorage(
        StorageKeys.packageManager,
        PackageManagers.npm as string
    );

    return (
        <>
            <FormLabel id={IDS.PACKAGE_MANAGER}>Package Manager</FormLabel>
            <RadioGroup
                aria-labelledby={IDS.PACKAGE_MANAGER}
                name={IDS.PACKAGE_MANAGER}
                onChange={(event) => setValue(event.target.value)}
                defaultValue={PackageManagers.npm}
            >
                <FormControlLabel
                    value={PackageManagers.npm}
                    control={<Radio />}
                    label={PackageManagers.npm}
                />
                <FormControlLabel
                    value={PackageManagers.yarn}
                    control={<Radio />}
                    label={`${PackageManagers.yarn + TBA_SUFFIX}`}
                    disabled
                />
            </RadioGroup>
        </>
    );
};

export default SelectPackageManager;
