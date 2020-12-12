export interface StreamState {
    playing: boolean,
    currentTime: number | undefined,
    duration: number|undefined,
    readableCurrentTime : string,
    readableDuration : string,
    canplay: boolean,
    error: boolean

}
