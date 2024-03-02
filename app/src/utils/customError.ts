
/**
 * Converts a value into an Error object.
 * If the value is already an Error, it is returned as is.
 * If the value is not an Error, it is stringified and returned as part of a new Error object.
 * @param value - The value to be converted into an Error object.
 * @returns An Error object representing the converted value.
 * @remarks If the value cannot be stringified, the error message will indicate that.
 */
function customError(value: unknown): Error {
 if (value instanceof Error) return value;
 let stringified = '[Unable to stringify the thrown value]';
 try {
    stringified = JSON.stringify(value);
 } catch {}
 return new Error(`This value was thrown as is, not through an Error: ${stringified}`);
}
export default customError;