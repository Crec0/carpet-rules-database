export class ListProps {
    constructor(scrollToIndex?: number, scrollToAlignment?: string, scrollOffset?: number, itemCount?: number, itemSize?: number, estimatedItemSize?: number, height?: number, width?: string, stickyIndices?: any[]);
    scrollToIndex: number;
    scrollToAlignment: string;
    scrollOffset: number;
    itemCount: number;
    itemSize: number;
    estimatedItemSize: number;
    height: number;
    width: number;
    stickyIndices: any[];
    previous_state: {
        scrollToIndex: number;
        scrollToAlignment: string;
        scrollOffset: number;
        itemCount: number;
        itemSize: number;
        estimatedItemSize: number;
        height: number;
        width: string;
        stickyIndices: any[];
    };
    get hasScrollOffsetChanged(): boolean;
    get haveScrollPropsChanged(): boolean;
    get haveSizesChanged(): boolean;
    get hasScrollIndexChanged(): boolean;
    get haveDimsOrStickyIndicesChanged(): boolean;
    listen(scrollToIndex: any, scrollToAlignment: any, scrollOffset: any, itemCount: any, itemSize: any, estimatedItemSize: any, height: any, width: any, stickyIndices: any): void;
    update(): void;
    #private;
}
