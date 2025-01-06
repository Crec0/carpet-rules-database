export default VirtualList;
type VirtualList = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
} & {
    recomputeSizes: (startIndex?: any) => void;
};
declare const VirtualList: import("svelte").Component<{
    height?: string;
    width?: string;
    itemCount?: number;
    itemSize?: number;
    estimatedItemSize?: number;
    stickyIndices?: any[];
    getKey?: any;
    scrollDirection?: any;
    scrollOffset?: number;
    scrollToIndex?: any;
    scrollToAlignment?: string;
    scrollToBehaviour?: string;
    overscanCount?: number;
    onListItemsUpdate?: Function;
    onAfterScroll?: Function;
    header: any;
    footer: any;
    children: any;
}, {
    recomputeSizes: (startIndex?: any) => void;
}, "">;
type $$ComponentProps = {
    height?: string;
    width?: string;
    itemCount?: number;
    itemSize?: number;
    estimatedItemSize?: number;
    stickyIndices?: any[];
    getKey?: any;
    scrollDirection?: any;
    scrollOffset?: number;
    scrollToIndex?: any;
    scrollToAlignment?: string;
    scrollToBehaviour?: string;
    overscanCount?: number;
    onListItemsUpdate?: Function;
    onAfterScroll?: Function;
    header: any;
    footer: any;
    children: any;
};
