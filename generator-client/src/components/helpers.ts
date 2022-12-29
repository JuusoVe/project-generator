/**
 * Returns an object that can be passed to MUI inputProps
 * when the nested input element needs to be given a data-testid=testIdParam
 * property.
 */
export const createTestIdProp = (testId: string) => {
    return { 'data-testid': testId };
};
