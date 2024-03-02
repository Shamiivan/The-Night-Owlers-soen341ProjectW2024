function customError(value: unknown): Error {
 if (value instanceof Error) return value;
 let stringified = '[Unable to stringify the thrown value]';
 try {
    stringified = JSON.stringify(value);
 } catch {}
 return new Error(`This value was thrown as is, not through an Error: ${stringified}`);
}
export default customError;