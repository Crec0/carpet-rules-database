export class ListState {
    constructor(offset?: number);
    offset: number;
    scrollChangeReason: string;
    previous_state: {
        offset: number;
        scrollChangeReason: number;
    };
    get doRefresh(): boolean;
    get doScrollToOffset(): boolean;
    listen(offset: any, scrollChangeReason: any): void;
    update(): void;
    #private;
}
