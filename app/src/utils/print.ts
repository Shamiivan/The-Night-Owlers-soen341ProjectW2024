export default function printError(error: any): void{
    console.error('\x1b[1;31m', error, '\x1b[0m'); 
}