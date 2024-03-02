import exp from "constants";
import customError from "./customError";

type Operation<T> = () => Promise<T>;

interface Success<T> {
 success: true;
 value: T;
}

interface Fail {
 success: false;
 error: Error;
}


export default async function executeAsync<T>(operation: Operation<T>): Promise<Success<T> | Fail >{
 try {
    const result = await operation();
    return { success: true, value: result };
 } catch (error: any) {
    error = customError(error);
    return { success: false, error: error };
 }
}

