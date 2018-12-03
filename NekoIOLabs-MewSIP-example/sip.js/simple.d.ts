
import { C } from './c.d';

export class Simple{

    //#region properties
    /**
     * The state that simple is in. See states for a list of states and description of each state.
     */
    state:C.States;
    //#endregion

    //#region methods
    /**
     * start a call with the destination
     * @argument destination: The destination endpoint that you wish to call
     */
     call(destination:string): void;
    //#endregion



}