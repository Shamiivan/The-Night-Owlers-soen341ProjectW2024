
/**
 * Prints the given error message in red color to the console.
 * 
 * @param error - The error message to be printed.
 */
export default function printError(error: any): void{
    console.error('\x1b[1;31m', error, '\x1b[0m'); 
}