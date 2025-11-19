import { Registration, Event } from "src/models";
export declare class AutoCancelTask {
    private readonly registrationModel;
    private readonly eventModel;
    constructor(registrationModel: typeof Registration, eventModel: typeof Event);
    handle(): Promise<void>;
}
