'use client';

import { FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useLocalStorage } from 'usehooks-ts';
import { LocalStorageKeys } from '../models';

export enum PackageManagers {
    npm = 'npm',
    yarn = 'yarn',
    pnpm = 'pnpm',
}

const PACKAGE_MANAGER_LABEL = 'package-manager-selector';
const TBA_SUFFIX = ' (TBA)';

const SelectPackageManager = () => {
    const [_value, setValue] = useLocalStorage(
        LocalStorageKeys.packageManager,
        PackageManagers.npm as string
    );

    return (
        <>
            <FormLabel id={PACKAGE_MANAGER_LABEL}>Package Manager</FormLabel>
            <RadioGroup
                aria-labelledby={PACKAGE_MANAGER_LABEL}
                name={PACKAGE_MANAGER_LABEL}
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
                <FormControlLabel
                    value={PackageManagers.pnpm}
                    control={<Radio />}
                    label={`${PackageManagers.pnpm + TBA_SUFFIX}`}
                    disabled
                />
            </RadioGroup>
        </>
    );
};

export default SelectPackageManager;
