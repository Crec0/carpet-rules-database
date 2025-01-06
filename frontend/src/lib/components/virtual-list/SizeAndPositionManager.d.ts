/**
 * @callback ItemSizeGetter
 * @param {number} index
 * @return {number}
 */
/**
 * @typedef ItemSize
 * @type {number | number[] | ItemSizeGetter}
 */
/**
 * @typedef SizeAndPosition
 * @type {object}
 * @property {number} size
 * @property {number} offset
 */
/**
 * @typedef SizeAndPositionData
 * @type {Object.<number, SizeAndPosition>}
 */
/**
 * @typedef Options
 * @type {object}
 * @property {number} itemCount
 * @property {ItemSize} itemSize
 * @property {number} estimatedItemSize
 */
export default class SizeAndPositionManager {
    /**
     * @param {Options} options
     */
    constructor({ itemSize, itemCount, estimatedItemSize }: Options);
    /**
     * @private
     * @type {ItemSize}
     */
    private itemSize;
    /**
     * @private
     * @type {number}
     */
    private itemCount;
    /**
     * @private
     * @type {number}
     */
    private estimatedItemSize;
    /**
     * Cache of size and position data for items, mapped by item index.
     *
     * @private
     * @type {SizeAndPositionData}
     */
    private itemSizeAndPositionData;
    /**
     * Measurements for items up to this index can be trusted; items afterward should be estimated.
     *
     * @private
     * @type {number}
     */
    private lastMeasuredIndex;
    get justInTime(): boolean;
    /**
     * @param {Options} options
     */
    updateConfig({ itemSize, itemCount, estimatedItemSize }: Options): void;
    totalSize: number;
    checkForMismatchItemSizeAndItemCount(): void;
    /**
     * @param {number} index
     */
    getSize(index: number): number;
    /**
     * Compute the totalSize and itemSizeAndPositionData at the start,
     * only when itemSize is a number or an array.
     */
    computeTotalSizeAndPositionData(): void;
    getLastMeasuredIndex(): number;
    /**
     * This method returns the size and position for the item at the specified index.
     *
     * @param {number} index
     */
    getSizeAndPositionForIndex(index: number): SizeAndPosition;
    /**
     * This is used when itemSize is a function.
     * just-in-time calculates (or used cached values) for items leading up to the index.
     *
     * @param {number} index
     */
    getJustInTimeSizeAndPositionForIndex(index: number): SizeAndPosition;
    getSizeAndPositionOfLastMeasuredItem(): SizeAndPosition;
    /**
     * Total size of all items being measured.
     *
     * @return {number}
     */
    getTotalSize(): number;
    /**
     * Determines a new offset that ensures a certain item is visible, given the alignment.
     *
     * @param {'auto' | 'start' | 'center' | 'end'} align Desired alignment within container
     * @param {number | undefined} containerSize Size (width or height) of the container viewport
     * @param {number | undefined} currentOffset
     * @param {number | undefined} targetIndex
     * @return {number} Offset to use to ensure the specified item is visible
     */
    getUpdatedOffsetForIndex({ align, containerSize, currentOffset, targetIndex }: "auto" | "start" | "center" | "end"): number;
    /**
     * @param {number} containerSize
     * @param {number} offset
     * @param {number} overscanCount
     * @return {{stop: number|undefined, start: number|undefined}}
     */
    getVisibleRange({ containerSize, offset, overscanCount }: number): {
        stop: number | undefined;
        start: number | undefined;
    };
    /**
     * Clear all cached values for items after the specified index.
     * This method should be called for any item that has changed its size.
     * It will not immediately perform any calculations; they'll be performed the next time getSizeAndPositionForIndex() is called.
     *
     * @param {number} index
     */
    resetItem(index: number): void;
    /**
     * Searches for the item (index) nearest the specified offset.
     *
     * If no exact match is found the next lowest item index will be returned.
     * This allows partially visible items (with offsets just before/above the fold) to be visible.
     *
     * @param {number} offset
     */
    findNearestItem(offset: number): number;
    /**
     * @private
     * @param {number} low
     * @param {number} high
     * @param {number} offset
     */
    private binarySearch;
    /**
     * @private
     * @param {number} index
     * @param {number} offset
     */
    private exponentialSearch;
}
export type ItemSizeGetter = (index: number) => number;
export type ItemSize = number | number[] | ItemSizeGetter;
export type SizeAndPosition = {
    size: number;
    offset: number;
};
export type SizeAndPositionData = {
    [x: number]: SizeAndPosition;
};
export type Options = {
    itemCount: number;
    itemSize: ItemSize;
    estimatedItemSize: number;
};
