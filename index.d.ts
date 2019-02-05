// Type definitions for MapKit JS 5.13.0
// Project: https://developer.apple.com/documentation/mapkitjs
// Definitions by: Jon Nermut <asdeqlabs.com>, Will Ross <paxswill.com>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/** The JavaScript API for embedding Apple maps on your website. */
export as namespace mapkit

/* Non-exported utility types used within this file. */

declare interface MapKitError
{
    /* MapKit JS uses an Error type in a couple of spots. */
    code: number
    message: string
}

declare interface SelectEventTypes
{
    /*
     * Maps, Annotations and Overlays all have events with these names. This is
     * the most general typing of them. See MapEventTypes, AnnotationEventTypes,
     * and OverlayEventTypes for more details
     */
    "select": AnnotationEvent | OverlayEvent
    "deselect": AnnotationEvent | OverlayEvent
}

declare class MapKitEvented<T>
{
    /*
     * Helper type so that event listeners can be added in a more type-safe
     * manner. See MapEventTypes and Map for an example of usage.
     */
    addEventListener<K extends keyof T>(type: K, listener: (event: T[K]) => void, thisObject?: any): void
    removeEventListener<K extends keyof T>(type: K, listener: (event: T[K]) => void, thisObject?: any): void
}

/** Initialize a mapkit object by providing an authorization callback and language. */
export function init(options: MapKitInitOptions): void

declare enum MapKitInitSuccessStatus
{
    /** MapKit successfully initialized and configured. */
    initialized = "Initialized",

    /** MapKit configuration updated. */
    refreshed = "Refreshed"
}

declare enum MapKitInitFailureStatus
{
    /** The authorization token provided is invalid. */
    unauthorized = "Unauthorized",

    /** The authorization token provided is based on a Maps ID, which has exceeded its allowed daily usage. */
    tooManyRequests = "Too Many Requests"
}

declare class MapKitInitSuccessEvent extends Event
{
    status: MapKitInitSuccessStatus
}

declare class MapKitInitFailureEvent extends Event
{
    status: MapKitInitFailureStatus
}

interface MapKitEventTypes
{
    "configuration-change": MapKitInitSuccessEvent
    "error": MapKitInitFailureEvent
}

/** Subscribes a listener function to an event type. */
export function addEventListener<K extends keyof MapKitEventTypes>(type: K, listener: (event: MapKitEventTypes[K]) => void, thisObject?: any): void

/** Unsubscribes a listener function from an event type. */
export function removeEventListener<K extends keyof MapKitEventTypes>(type: K, listener: (event: MapKitEventTypes[K]) => void, thisObject?: any): void

/** An array to which maps are automatically added and removed as they are initialized and destroyed. */
export let maps: Map[]

/** A language ID indicating the selected language. */
export let language: string

/** A build string that is used internally. It is helpful to include this in bug reports. */
export const build: string

/** Initialization options for MapKit JS. */
export interface MapKitInitOptions
{
    /**
     * The callback function MapKit JS will invoke to asynchronously obtain an authorization token.
     * authorizationCallback will be invoked by MapKit JS throughout a session and should be prepared to obtain a new token and pass it to the done function, which will be provided my MapKit JS as the sole argument each time the authorizationCallback function is called.
     */
    authorizationCallback: (done: (jwt: (string)) => void) => void

    /** An ID that indicates the preferred language in which to display map labels, controls, directions, and other text. */
    language?: string
}

/** An object representing the latitude and longitude for a point on the Earth's surface. */
export class Coordinate
{
    /** Creates a coordinate object with the specified latitude and longitude. */
    constructor(latitude: number, longitude: number)

    /** The latitude in degrees. */
    latitude: number

    /** The longitude in degrees. */
    longitude: number

    /** Returns a copy of the coordinate. */
    copy(): Coordinate

    /** Returns a Boolean value indicating whether two coordinates are equal. */
    equals(other: Coordinate): boolean

    /** Returns the map point that corresponds to the coordinate. */
    toMapPoint(): MapPoint

    /** Returns the unwrapped map point that corresponds to the coordinate. */
    toUnwrappedMapPoint(): MapPoint
}

/** An object that contains options for initializing a map's features. */
export interface MapConstructorOptions
{
    /** The visible area of the map defined in map units.  */
    visibleMapRect?: MapRect 

    /** The area currently displayed by the map. */
    region?: CoordinateRegion

    /** The map coordinate at the center of the map view. */
    center?: Coordinate

    /** The map's rotation, in degrees. */
    rotation?: number

    /** The CSS color that is used to paint the user interface controls on the map. */
    tintColor?: string

    /** The map’s color scheme when displaying standard or muted standard map types. */
    colorScheme?: Map.ColorSchemes

    /** The type of data displayed by the map view. */
    mapType?: Map.MapTypes

    /** The map's inset margins. */
    padding?: Padding

    /** A Boolean value that determines whether to display a control that lets users choose the map type. */
    showsMapTypeControl?: boolean

    /** A Boolean value that determines whether the user may rotate the map using the compass control or a rotate gesture. */
    isRotationEnabled?: boolean

    /** A feature visibility setting that determines when the compass is visible. */
    showsCompass?: FeatureVisibility

    /** A Boolean value that determines whether the user may zoom in and out on the map using pinch gestures or the zoom control. */
    isZoomEnabled?: boolean

    /** A Boolean value that determines whether to display a control for zooming in and zooming out on a map. */
    showsZoomControl?: boolean

    /** A Boolean value that determines whether the user may scroll the map with a pointing device or gestures on a touchscreen. */
    isScrollEnabled?: boolean

    /** A feature visibility setting that determines when the map's scale is displayed. */
    showsScale?: FeatureVisibility

    /** A delegate method for modifying cluster annotations. */
    annotationForCluster?: (clusterAnnotation: Annotation) => void | Annotation

    /** An array of all the annotations on the map. */
    annotations?: Annotation[]

    /** The annotation on the map that is selected. */
    selectedAnnotation?: Annotation

    /** An array of all of the map's overlays. */
    overlays?: Overlay[]

    /** The overlay on the map that is selected. */
    selectedOverlay?: Overlay

    /** A Boolean value that determines whether the map displays points of interest. */
    showsPointsOfInterest?: boolean

    /** A Boolean value that determines whether to show the user's location on the map. */
    showsUserLocation?: boolean

    /** A Boolean value that determines whether to center the map on the user's location. */
    tracksUserLocation?: boolean

    /** A Boolean value that determines whether the user location control is visible. */
    showsUserLocationControl?: boolean

}

declare class MapEvent extends Event
{
    /* Just in case Apple adds more properties to Map events. */
}

declare class OverlayEvent extends Event
{
    overlay: Overlay
}

declare class UserLocationChangeEvent extends Event
{
    coordinate: Coordinate
    timestamp: Date
}

declare enum LocationError
{
    PERMISSION_DENIED = 1,
    POSITION_UNAVAILABLE = 2,
    TIMEOUT = 3,
    MAPKIT_NOT_INITIALIZED = 4
}

declare class UserLocationErrorEvent implements MapKitError
{
    code: LocationError
    message: string
}

interface MapEventTypes extends SelectEventTypes, AnnotationEventWithoutSelectTypes, OverlayEventWithoutSelectTypes
{
    "region-change-start": MapEvent
    "region-change-end": MapEvent
    "scroll-start": MapEvent
    "scroll-end": MapEvent
    "zoom-start": MapEvent
    "zoom-end": MapEvent
    "map-type-change": MapEvent

    "user-location-change": UserLocationChangeEvent
    "user-location-error": UserLocationErrorEvent
}

/** An embeddable interactive map that you add to a webpage. */
export class Map extends MapKitEvented<MapEventTypes>
{
    /** Creates a map that you embed on a webpage, and initializes its display properties and other options. */
    constructor(parent?: string | HTMLElement, options?: MapConstructorOptions)

    /** A Boolean value that indicates if map rotation is available. */
    isRotationAvailable: boolean

    /** A Boolean value that determines whether the user may rotate the map using the compass control or a rotate gesture. */
    isRotationEnabled: boolean

    /** A Boolean value that determines whether the user may scroll the map with a pointing device or with gestures on a touchscreen. */
    isScrollEnabled: boolean

    /** A Boolean value that determines whether the user may zoom in and out on the map using pinch gestures or the zoom control. */
    isZoomEnabled: boolean

    /** The map coordinate at the center of the map view. */
    center: Coordinate

    /** Centers the map to the provided coordinate, with optional animation. */
    setCenterAnimated(coordinate: Coordinate, animate?: boolean): Map

    /** The area currently displayed by the map. */
    region: CoordinateRegion

    /** Changes the map's region to the region provided, with optional animation. */
    setRegionAnimated(egion: CoordinateRegion, animate?: boolean): Map

    /** The map's rotation, in degrees. */
    rotation: number

    /** Changes the map's rotation setting to the number of degrees specified. */
    setRotationAnimated(degrees: number, animate?: boolean): Map

    /** The visible area of the map defined in map units. */
    visibleMapRect: MapRect

    /** Changes the map's visible map rectangle to the specified map rectangle. */
    setVisibleMapRectAnimated(mapRect: MapRect, animate?: boolean): Map

    /** The map’s color scheme when displaying standard or muted standard map types. */
    colorScheme: Map.ColorSchemes

    /** The system of measurement displayed on the map. */
    distances: Map.Distances

    /** The type of data displayed by the map view. */
    mapType: Map.MapTypes

    /** The map's inset margins. */
    padding: Padding

    /** A feature visibility setting that determines when the compass is visible. */
    showsCompass: FeatureVisibility

    /** A Boolean value that determines whether to display a control that lets users choose the map type. */
    showsMapTypeControl: boolean

    /** A Boolean value that determines whether to display a control for zooming in and zooming out on a map. */
    showsZoomControl: boolean

    /** A Boolean value that determines whether the user location control is visible. */
    showsUserLocationControl: boolean

    /** A Boolean value that determines whether the map displays points of interest. */
    showsPointsOfInterest: boolean

    /** A feature visibility setting that determines when the map's scale is displayed. */
    showsScale: FeatureVisibility

    /** The CSS color that is used to paint the user interface controls on the map. */
    tintColor: string

    /** Adjusts the map's visible region to bring the specified overlays and annotations into view. */
    showItems(items: (Annotation | Overlay)[], options?: MapShowItemsOptions): (Annotation | Overlay)[]

    /** A delegate method for modifying cluster annotations. */
    annotationForCluster?: (clusterAnnotation: Annotation) => void | Annotation

    /** An array of all the annotations on the map. */
    annotations?: Annotation[]

    /** The annotation on the map that is selected. */
    selectedAnnotation: Annotation | null

    /** Returns the list of annotation objects located in the specified map rectangle. */
    annotationsInMapRect(mapRect: MapRect): Annotation[]

    /** Adds an annotation to the map. */
    addAnnotation(annotation: Annotation): Annotation

    /** Adds multiple annotations to the map. */
    addAnnotations(annotations: Annotation[]): Annotation[]

    /** Removes an annotation from the map. */
    removeAnnotation(annotation: Annotation): Annotation

    /** Removes multiple annotations from the map. */
    removeAnnotations(annotations: Annotation[]): Annotation[]

    /** An array of all of the map's overlays. */
    overlays: Overlay[]

    /** The overlay on the map that is selected. */
    selectedOverlay: Overlay | null

    /** Returns an array of overlays at a given point on the webpage. */
    overlaysAtPoint(point: DOMPoint): Overlay[]

    /** Adds an overlay to the map. */
    addOverlay(overlay: Overlay): Overlay

    /** Adds multiple overlays to the map. */
    addOverlays(overlays: Overlay[]): Overlay[]

    /** Removes an overlay from the map. */
    removeOverlay(overlay: Overlay): Overlay

    /** Removes multiple overlays from the map. */
    removeOverlays(overlays: Overlay[]): Overlay[]

    /** Returns the topmost overlay at a given point on the webpage. */
    topOverlayAtPoint(point: DOMPoint): Overlay

    /** An array of all of the map's tile overlays. */
    tileOverlays: TileOverlay[]

    /** Adds a tile overlay to the map. */
    addTileOverlay(overlay: TileOverlay): TileOverlay

    /** Adds an array of tile overlays to the map. */
    addTileOverlays(overlays: TileOverlay[]): TileOverlay[]

    /** Removes a tile overlay from the map. */
    removeTileOverlay(overlay: TileOverlay): TileOverlay

    /** Removes an array of tile overlays from the map. */
    removeTileOverlays(overlays: TileOverlay[]): TileOverlay[]

    /** A Boolean value that determines whether to show the user's location on the map. */
    showsUserLocation: boolean

    /** A Boolean value that determines whether to center the map on the user's location. */
    tracksUserLocation: boolean

    /** An annotation that indicates the user's location on the map. */
    userLocationAnnotation: Annotation | null

    /** Converts a coordinate on the map to a point in the page's coordinate system. */
    convertCoordinateToPointOnPage(coordinate: Coordinate): DOMPoint

    /** Converts a point in page coordinates to the corresponding map coordinate. */
    convertPointOnPageToCoordinate(point: DOMPoint): Coordinate

    /** Removes the map's element from the DOM and releases internal references to this map to free up memory. */
    destroy(): void

    /** The map's DOM element. */
    element: HTMLElement
}

export namespace Map 
{
    /** Constants representing the type of map to display. */
    export enum MapTypes
    {
        /** A satellite image of the area with road and road name information layered on top. */
        Hybrid = 'Hybrid',

        /** Satellite imagery of the area. */
        Satellite = 'Satellite',

        /** A street map that shows the position of all roads and some road names. */
        Standard = 'Standard',

        /** In this style, map features are less prominent, which allows user features such as annotations and overlays to stand out by comparison. */
        MutedStandard = 'MutedStandard'

    }

    /** Constants indicating the color scheme of the map. */
    export enum ColorSchemes
    {
        /** A constant indicating a light color scheme. */
        Light = 'Light',

        /** A constant indicating a dark color scheme. */
        Dark = 'Dark'
    }

    /** Constants indicating the system of measurement displayed on the map. */
    export enum Distances
    {
        /** A constant indicating the measurement system is adaptive, and determined based on the map's language. */
        Adaptive = 'Adaptive',

        /** A constant indicating the measurement system is metric. */
        Metric = 'Metric',

        /** A constant indicating the measurement system is imperial. */
        Imperial = 'Imperial'
    }
}

/** Options that determine map parameters used when showing items. */
export interface MapShowItemsOptions
{
    /** A Boolean value that determines whether the map is animated as the map region changes to show the items. */
    animate?: boolean

    /** The minimum longitudinal and latitudinal span the map should display. */
    minimumSpan?: CoordinateSpan

    /** Spacing that is added around the computed map region when showing items. */
    padding: Padding
}

/** A location on a map when the Earth's surface is projected onto a two-dimensional surface. */
export class MapPoint
{
    /** Initializes a mapkit.MapPoint object. */
    constructor(x: number, y: number)

    /** The location of the point along the x-axis of the map. */
    x: number

    /** The location of the point along the y-axis of the map. */
    y: number

    /** Returns a copy of a map point. */
    copy(): MapPoint

    /** Indicates whether two map points are equal. */
    equals(other: MapPoint): boolean

    /** Returns a coorindate containing the latitude and longitude corresponding to a map point. */
    toCoordinate(): Coordinate
}

/** A pair of values in map units that define the width and height of a projected coordinate span. */
export class MapSize
{
    /** Initializes a mapkit.MapSize object. */
    constructor(width: number, height: number)

    /** The width value, in map point units. */
    width: number

    /** The height value, in map point units. */
    height: number

    /** Returns a copy of a map size. */
    copy: MapSize

    /** Indicates whether two map sizes are equal. */
    equals(anotherSize: MapSize): boolean
}

/** A rectangular area on a two-dimensional map projection. */
export class MapRect
{
    /** Initializes a mapkit.MapRect object. */
    constructor(x: number, y: number, width: number, height: number)

    /** The origin point of a rectangle. */
    origin: MapPoint

    /** The width and height of a rectangle, starting from the origin point. */
    size: MapSize

    /** The maximum x-axis value of a rectangle. */
    maxX: number

    /** The maximum y-axis value of a rectangle. */
    maxY: number

    /** The mid-point along the x-axis of a rectangle. */
    midX: number

    /** The mid-point along the y-axis of a rectangle.*/
    midY: number

    /** The minimum x-axis value of a rectangle. */
    minX: number

    /** The minimum y-axis value of a rectangle. */
    minY: number

    /** Returns a copy of a map rectangle. */
    copy(): MapRect

    /** Indicates whether two map rectangles are equal. */
    equals(other: MapRect): boolean

    // NOTE: Apple doesn't have a short description for this function in their documentation
    scale(scaleFactor: number, scaleCenter: MapPoint): MapRect

    /**  Returns the region that corresponds to a map rectangle. */
    toCoordinateRegion(): CoordinateRegion
}

/** A rectangular area on a map defined by a center coordinate and a span, expressed in degrees of latitude and longitude. */
export class CoordinateRegion
{
    /** A rectangular geographic region centered around a latitude and longitude coordinate. */
    constructor(center: Coordinate, span: CoordinateSpan)

    /** The center point of the region. */
    center: Coordinate

    /** The horizontal and vertical span representing the amount of map to display. */
    span: CoordinateSpan

    /**  Returns a copy of this region. */
    copy(): CoordinateRegion

    /** Returns a Boolean value indicating whether two regions are equal. */
    equals(other: CoordinateRegion): boolean

    /** Returns the bounding region that corresponds to this region. */
    toBoundingRegion(): BoundingRegion

    /** Returns the map rectangle that corresponds to the region. */
    toMapRect(): MapRect
}

/** The width and height of a map region. */
export class CoordinateSpan
{
    /** Creates a new coordinate span object with the specified latitude and longitude deltas. */
    constructor(latitudeDelta: number, longitudeDelta: number)

    /** The amount of north-to-south distance (measured in degrees) to display on the map. */
    latitudeDelta: number

    /** The amount of east-to-west distance (measured in degrees) to display for the map region. */
    longitudeDelta: number

    /** Returns a copy of the coordinate span. */
    copy(): CoordinateSpan

    /** Returns a Boolean value that indicates whether two spans are equal. */
    equals(other: CoordinateSpan): boolean
}

/** A rectangular area on a map, defined by coordinates of the rectangle's northeast and southwest corners. */
export class BoundingRegion
{
    /** Creates a rectangular bounding region defined by the latitude and longitude coordinates of the rectangle's northeast and southwest corners. */
    constructor( northLatitude: number,  eastLongitude: number, southLatitude: number, westLongitude: number)

    /** The north latitude of the bounding region. */
    northLatitude: number

    /** The east longitude of the bounding region. */
    eastLongitude: number

    /** The south latitude of the bounding region. */
    southLatitude: number

    /** The west longitude of the bounding region. */
    westLongitude: number

    /** Returns a copy of the calling bounding region. */
    copy(): BoundingRegion

    /** Returns the coordinate region that corresponds to the calling bounding region. */
    toCoordinateRegion(): CoordinateRegion
}

/** Initial values of the edge insets for padding. */
export interface PaddingConstructorOptions
{
    /** The amount of padding, in CSS pixels, to inset the map from the bottom edge. */
    bottom: number

    /** The amount of padding, in CSS pixels, to inset the map from the left edge. */
    left: number

    /** The amount of padding, in CSS pixels, to inset the map from the right edge. */
    right: number

    /** The amount of padding, in CSS pixels, to inset the map from the top edge. */
    top: number
}

/** The values that define content padding within the map view frame. */
export class Padding
{
    /** Creates a padding object, and initializes its inset margin properties. */
    constructor(options?: PaddingConstructorOptions|number[] )

    /** The amount of padding, in CSS pixels, to inset the map from the bottom edge. */
    bottom: number

    /** The amount of padding, in CSS pixels, to inset the map from the left edge. */
    left: number

    /** The amount of padding, in CSS pixels, to inset the map from the right edge. */
    right: number

    /** The amount of padding, in CSS pixels, to inset the map from the top edge. */
    top: number
}

/** An object that contains options for initializing annotation features. */
export interface AnnotationConstructorOptions
{
    /** Data that you define that is assigned to the annotation. */
    data?: any

    /** The text to display in the annotation's callout. */
    title?: string

    /** The text to display as a subtitle, on the second line of an annotation's callout. */
    subtitle?: string

    /** The offset in CSS pixels of the element from the bottom center. */
    anchorOffset?: DOMPoint

    /** A CSS animation that runs when the annotation appears on the map. */
    appearanceAnimation?: string

    /** A hint that provides the priority of displaying the annotation. */
    displayPriority?: number

    /** The desired dimensions of the annotation, in CSS pixels. */
    size?: { height: number, width: number }

    /** A Boolean value that determines if the annotation is visible or hidden. */
    visible?: boolean

    /** A Boolean value that determines if the annotation should be animated. */
    animates?: boolean

    /** A Boolean value that determines whether the user can drag the annotation. */
    draggable?: boolean

    /** A Boolean value that determines whether the annotation responds to user interaction. */
    enabled?: boolean

    /** A Boolean value that determines whether the annotation is selected. */
    selected?: boolean

    /** A delegate that enables you to customize the callout for the annotation. */
    callout?: AnnotationCalloutDelegate

    /** A Boolean value that determines whether a callout should be shown. */
    calloutEnabled?: boolean

    /** The offset in CSS pixels of a callout from the top center of the element. */
    calloutOffset?: DOMPoint

    /** An identifer used for grouping annotations into the same cluster. */
    clusteringIdentifier?: string

    /** A mode that determines the shape of the collision frame. */
    collisionMode?: Annotation.CollisionMode

    /** Accessibility text for the annotation. */
    accessibilityLabel?: string
}

declare class AnnotationEvent extends Event
{
    annotation: Annotation
}

interface AnnotationEventWithoutSelectTypes
{
    /*
     * This type is inherited by MapEventTypes, so if adding an event here,
     * double check that it is also listenable as an event on Map objects.
     */
    "drag-start": AnnotationEvent
    "dragging": AnnotationEvent
    "drag-end": AnnotationEvent
}

interface AnnotationEventTypes extends SelectEventTypes, AnnotationEventWithoutSelectTypes
{
    "select": AnnotationEvent
    "deselect": AnnotationEvent
}

/**
 * The base object for annotations, used when creating custom annotations.
 */
export class Annotation extends MapKitEvented<AnnotationEventTypes>
{
    /** Creates a new annotation given its location and initialization options. */
    constructor(coordinate: Coordinate, factory: Function, options?: AnnotationConstructorOptions)

    /** The annotation's coordinate. */
    coordinate: Coordinate

    /** Data that you define that is assigned to the annotation. */
    data: any

    /** The text to display in the annotation's callout. */
    title: string

    /** The text to display as a subtitle, on the second line of an annotation's callout. */
    subtitle: string

    /** An offset that changes the annotation's default anchor point. */
    anchorOffset: DOMPoint

    /** A CSS animation that runs when the annotation appears on the map. */
    appearanceAnimation: string

    /** A numeric hint the map uses to prioritize displaying annotations. */
    displayPriority: number

    /** The desired dimensions of the annotation, in CSS pixels. */
    size: { height: number, width: number }

    /** A Boolean value that determines if the annotation is visible or hidden. */
    visible: boolean

    /** A Boolean value that determines if the annotation should be animated. */
    animates: boolean

    /** A Boolean value that determines whether the user can drag the annotation. */
    draggable: boolean

    /** A Boolean value indicating whether the annotation is selected. */
    selected: boolean

    /** A Boolean value that determines whether the annotation responds to user interaction. */
    enabled: boolean

    /** The map to which the annotation was added. */
    map: Map

    /** The annotation's element in the DOM. */
    element: HTMLElement

    /** A delegate that enables you to customize the annotation's callout. */
    callout: AnnotationCalloutDelegate

    /** A Boolean value that determines whether an annotation's callout should be shown. */
    calloutEnabled: boolean

    /** An offset that changes the annotation callout's default placement. */
    calloutOffset: DOMPoint

    /** An array of annotations that are grouped together in a cluster. */
    memberAnnotations: Annotation[]

    /** An identifer used for grouping annotations into the same cluster. */
    clusteringIdentifier: string

    /** A mode that determines the shape of the collision frame. */
    collisionMode: Annotation.CollisionMode

    /** Accessibility text for the annotation. */
    accessibilityLabel: string
}

export namespace Annotation
{
    /** Constant values used to provide a hint the map uses to prioritize displaying annotations. */
    export enum DisplayPriority
    {
        /** A low display priority, with a preset value of 250 out of 1000. */
        Low = 250,

        /** A high display priority, with a preset value of 750 out of 1000. */
        High = 750,

        /** The highest display priority, with a preset value of 1000 out of 1000. */
        Required = 1000
    }

    /** Constants indicating how to interpret the collision frame rectangle of an annotation view. */
    export enum CollisionMode
    {
        /** A constant indicating that a circle inscribed in the collision frame rectangle should be used to determine collisions. */
        Circle = 'Circle',

        /** A constant indicating that the full collision rectangle should be used for detecting collisions. */
        Rectangle = 'Rectangle'
    }
}

/** An object with URLs to images to be shown at standard, 2x, and 3x Retina screen types */
interface DisplayAsset
{
    /** A URL to an image shown at standard screen densities. The dimensions should be 20 x 20 pixels. */
    1: string,

    /** An optional URL to be shown at 2x screen densities. The dimensions should be 40 x 40 pixels. */
    2?: string,

    /** An optional URL to be shown at 3x screen densities. The dimensions should be 60 x 60 pixels. */
    3?: string,
}

/** An annotation that displays a balloon-shaped marker at the designated location. */
export class MarkerAnnotation extends Annotation
{
    /** Creates a marker annotation at the coordinate location with provided options. */
    constructor(coordinate: Coordinate, options?: MarkerAnnotationConstructorOptions)

    /** The fill color of the marker. */
    color: string

    /** The fill color of the glyph. */
    glyphColor: string

    /** The images to display in the marker. */
    glyphImage: DisplayAsset

    /** The text to display in the marker. */
    glyphText: string

    /** The images to display in the balloon when the user selects the annotation. */
    selectedGlyphImage: DisplayAsset

    /** A value that determines when the subtitle is visible. */
    subtitleVisibility: FeatureVisibility

    /** A value that determines when the title is visible. */
    titleVisibility: FeatureVisibility
}

/** An object containing the options that initialize a marker annotation. */
export interface MarkerAnnotationConstructorOptions extends AnnotationConstructorOptions
{
    /** The fill color of the marker. */
    color?: string

    /** The fill color of the glyph. */
    glyphColor?: string

    /** The images to display in the marker. */
    glyphImage?: DisplayAsset

    /** The text to display in the marker. */
    glyphText?: string

    /** The images to display in the balloon when the user selects the annotation. */
    selectedGlyphImage?: DisplayAsset

    /** A value that determines when the subtitle is visible. */
    subtitleVisibility?: FeatureVisibility

    /** A value that determines when the title is visible. */
    titleVisibility?: FeatureVisibility
}

/** A customized annotation with image resources that you provide. */
export class ImageAnnotation extends Annotation
{
    /** Initializes an image annotation with a URL to its image and a coordinate. */
    constructor(coordinate: Coordinate, options?: ImageAnnotationConstructorOptions)

    /** An object containing URLs for the image assets in multiple resolutions. */
    url: DisplayAsset
}

/** An object containing options for initializing an image annotation. */
export interface ImageAnnotationConstructorOptions extends AnnotationConstructorOptions
{
    /** An object containing URLs for the image assets in multiple resolutions. */
    url: DisplayAsset
}

/** Constants indicating the visibility of different adaptive map features. */
export enum FeatureVisibility
{
    /** Indicates that a map feature adapts to the current map state. */
    Adaptive = 'Adaptive',

    /** Indicates that a map feature is always hidden */
    Hidden = 'Hidden',

    /** Indicates that a map feature is always visible. */
    Visible = 'Visible'
}

export interface AnnotationCalloutDelegate
{
    /** Returns a point determining the callout's anchor offset. */
    calloutAnchorOffsetForAnnotation(annotation: Annotation, size: {width: number, height: number}): DOMPoint

    /** Determines whether the callout should appear for an annotation. */
    calloutShouldAppearForAnnotation(annotation: Annotation): boolean

    /** Determines whether the callout should animate. */
    calloutShouldAnimateForAnnotation(annotation: Annotation): boolean

    /** Returns a CSS animation used when the callout appears. */
    calloutAppearanceAnimationForAnnotation(annotation: Annotation): string

    /** Returns custom content for the callout bubble. */
    calloutContentForAnnotation(annotation: Annotation): HTMLElement

    /** Returns an element representing a custom callout. */
    calloutElementForAnnotation(annotation: Annotation): HTMLElement

    /** Returns an element used as a custom accessory on the left side of the callout content area. */
    calloutLeftAccessoryForAnnotation(annotation: Annotation): HTMLElement

    /** Returns an element used as a custom accessory on the right side of the callout content area. */
    calloutRightAccessoryForAnnotation(annotation: Annotation): HTMLElement
}

declare enum FillOpacityRule
{
    NonZero = "nonzero",
    EvenOdd = "evenodd"
}

declare enum LineCapStyle
{
    Butt = "butt",
    Round = "round",
    Square = "square"
}

declare enum LineJoinStyle
{
    Miter = "miter",
    Round = "round",
    Bevel = "bevel"
}

/** Initial values of options for applying style to overlays. */
export interface StyleConstructorOptions
{
    /** The fill color of a shape. */
    fillColor?: string | null

    /** The opacity of the fill color. */
    fillOpacity?: number

    /** A rule for determining whether a point is inside or outside a polygon. */
    fillRule?: FillOpacityRule

    /** The style to use when drawing line endings. */
    lineCap?: LineCapStyle

    /** An array of line and gap lengths, used to create a dashed line. */
    lineDash?: number[]

    /** The number of CSS pixels to offset drawing of a line's dash pattern. */
    lineDashOffset?: number

    /** The style to use when drawing joins between line segments. */
    lineJoin?: LineJoinStyle

    /** The width of a line's stroke, in CSS pixels. */
    lineWidth?: number

    /** The stroke color of a line. */
    strokeColor?: number

    /** The opacity of the stroke color. */
    strokeOpacity?: number
}

/** A set of observable attributes for overlays, including color and opacity of stroke and fill, and line styles. */
export class Style
{
    /** Creates and initializes a style object. */
    constructor(options?: StyleConstructorOptions)

    /** The fill color of a shape. */
    fillColor: string | null

    /** The opacity of the fill color. */
    fillOpacity: number

    /** A rule for determining whether a point is inside or outside a polygon. */
    fillRule: FillOpacityRule

    /** The style to use when drawing line endings. */
    lineCap: LineCapStyle

    /** An array of line and gap lengths, used to create a dashed line. */
    lineDash: number[]

    /** The number of CSS pixels to offset drawing of a line's dash pattern. */
    lineDashOffset: number

    /** The style to use when drawing joins between line segments. */
    lineJoin: LineJoinStyle

    /** The width of a line's stroke, in CSS pixels. */
    lineWidth: number

    /** The stroke color of a line. */
    strokeColor: number

    /** The opacity of the stroke color. */
    strokeOpacity: number
}

interface OverlayEventWithoutSelectTypes {}

interface OverlayEventTypes extends SelectEventTypes, OverlayEventWithoutSelectTypes
{
    "select": OverlayEvent
    "deselect": OverlayEvent
}

/** An abstract base object that defines the methods and attributes for map overlays. */
export abstract class Overlay extends MapKitEvented<OverlayEventTypes>
{
    /** Custom data to associate with this overlay. */
    data: any

    /** A Boolean value that determines if an overlay is visible. */
    visible: boolean

    /** A Boolean value that determines whether the overlay responds to user interaction. */
    enabled: boolean

    /** A Boolean value that indicates whether the overlay is selected. */
    selected: boolean

    /** Style properties to apply to the overlay. */
    style: Style

    /** The map to which the overlay is added. */
    map: Map
}

/** A dictionary of options that determine an overlay's data and if it is visible, enabled, and selected. */
export interface OverlayOptions
{
    /** Custom data to associate with this overlay. */
    data?: any

    /** A Boolean value that determines whether the overlay responds to user interaction. */
    enabled?: boolean

    /** A Boolean value that indicates whether the overlay is selected. */
    selected?: boolean

    /** A Boolean value that determines if an overlay is visible. */
    visible?: boolean

    /*
     * The style property isn't mentioned in Apple's docs, but *is* mentioned in
     * their examples when actually creating Overlay objects. Go figure.
     */
    /** Style properties to apply to the overlay. */
    style?: Style
}

/** A circular overlay with a configurable radius, centered on a specific geographic coordinate. */
export class CircleOverlay extends Overlay
{
    /** Creates a circle overlay with a center coordinate, radius, and style options. */
    constructor(coordinate: Coordinate, radius: number, options?: OverlayOptions)

    /** The coordinate of the circle overlay's center. */
    coordinate: Coordinate

    /** The circle overlay's radius in meters. */
    radius: number
}

/** An overlay made up of connected line segments that do not form a closed shape. */
export class PolylineOverlay extends Overlay
{
    /** Creates a polyline overlay with coordinate points and style options. */
    constructor(points: Coordinate[], options?: OverlayOptions)

    /** An array of coordinate points that define the polyline overlay's shape. */
    points: Coordinate[]
}

/** An overlay made up of one or more points, forming a closed shape. */
export class PolygonOverlay extends Overlay
{
    /** Creates a polygon overlay with an array of points and style options. */
    constructor(points: Coordinate[], options?: OverlayOptions)
    constructor(points: Coordinate[][], options?: OverlayOptions)

    /**
     * One or more arrays of coordinates that define the polygon overlay shape.
     * When accessing, an array of array of Coordinate objects is returned. If
     * an array of Coordinates is set as the a new value, the array is wrapped
     * in another array automatically.
     */
    points: Coordinate[][] | Coordinate[]
}

/** Attributes used when initializing a tile overlay, including minimum and maximum zoom, opacity, and custom data. */
export interface TileOverlayConstructorOptions
{
    /** Custom data used to populate the URL template. */
    data: any

    /** Maximum zoom level of the overlay. */
    maximumZ: number

    /** Minimum zoom level of the overlay. */
    minimumZ: number

    /** Opacity level of the overlay. */
    opacity: number
}

interface TileOverlayErrorEvent
{
    /** The tile overlay containing the failing tile. */
    tileOverlay: TileOverlay

    /** The specific tile URL that failed. */
    tileUrl: string
}

interface TileOverlayEventTypes
{
    "tile-error": TileOverlayErrorEvent
}

/** An overlay that covers an area of the map with bitmap tiles. */
export class TileOverlay extends MapKitEvented<TileOverlayEventTypes>
{
    /** Creates a tile overlay with a URL template and style options. */
    constructor(urlTemplate: string, options?: TileOverlayConstructorOptions)
    constructor(urlTemplate: (x: number, y: number, z: number, scale: number, data: any) => string, options?: TileOverlayConstructorOptions)
    
    /** A string, or callback function that returns a string, with a URL that provides the requested tile. */
    urlTemplate: (x: number, y: number, z: number, scale: number, data: any) => string | string

    /** A dictionary of custom properties used with the URL template. */
    data: any

    /** Reloads the tile overlay for the displayed map region with the latest data values. */
    reload(): void

    /** A number from 0 to 1 indicating a tile's opacity. */
    opacity: number

    /** The maximum zoom level for a tile overlay. */
    maximumZ: number | null

    /** The minimum zoom level for a tile overlay. */
    minimumZ: number | null
}

/** Initialization options for geocoder objects. */
export interface GeocoderConstructorOptions
{
    /** An initial Boolean value that indicates whether the geocoder should return results near the user's current location. */
    getsUserLocation?: boolean

    /** An initial value for the language ID, which determines the language used for displaying addresses. */
    language?: string
}

/** The response from a geocoder lookup or reverse lookup. */
export interface GeocodeResponse
{
    /** An array of places returned from a geocoder lookup or reverse lookup. */
    results: Place[]
}

/** Options that constrain geocoder lookup results to a specific area or set a language for results. */
export interface GeocoderLookupOptions
{
    /** Coordinates used to constrain the lookup results. */
    coordinate?: Coordinate

    /** The language in which to display the lookup results. */
    language?: string

    /** Tell the geocoder to return results within a list of countries. Countries in the list are specified with two-letter country codes. For example, constrain the geocoder to return results in Australia and New Zealand with { limitToCountries: "AU, NZ" }. */
    limitToCountries?: string

    /** A region in which to constrain lookup results. */
    region?: CoordinateRegion
}

/** An option that constrains reverse lookup results to a specific language. */
export interface GeocoderReverseLookupOptions
{
    /** The language in which to display the reverse lookup results. */
    language?: string
}

/** A place object returned from a geocoder lookup or reverse lookup. */
export interface Place
{
    /** The name of this place. */
    name: string

    /** The address of this place, formatted to the conventions of the place's country. */
    formattedAddress: string

    /** The country associated with this place, denoted by the standard abbreviation used to refer to the country. For example, if the place was was Apple Park, the value for this property would be the string “US”. */
    countryCode: string

    /** The latitude and longitude for this place. */
    coordinate: Coordinate

    /** The geographic region associated with the place. */
    region: CoordinateRegion
}

/** A geocoder that converts human-readable addresses to geographic coordinates and vice versa. */
export class Geocoder
{
    /** Initialize a geocoder object and set optional language and user location properties. */
    constructor(options?: GeocoderConstructorOptions)

    /* A Boolean value that indicates whether the geocoder should return results near the user's current location. */
    getsUserLocation: boolean

    /** A language ID that determines the language used for displaying addresses. */
    language: string

    /** Converts an address to geographic coordinates. */
    lookup(place: string, callback: (error: MapKitError, data: GeocodeResponse) => void, options?: GeocoderLookupOptions): number

    /** Converts a geographic coordinate to an address. */
    reverseLookup(coordinate: Coordinate, callback: (error: MapKitError, data: GeocodeResponse) => void, options?: GeocoderReverseLookupOptions): number

    /** Cancels the pending lookup or reverse lookup specified by its request ID. */
    cancel(id: number): boolean
}

/** Options that you may provide when creating a search object. */
export interface SearchConstructorOptions
{
    /** A map coordinate that provides a hint for the geographic area to search. */
    coordinate?: Coordinate

    /** A Boolean value that indicates whether to limit the search results to the user's current location, as determined by the web browser. */
    getsUserLocation?: boolean

    /** A language ID that determines the language for the search result text. */
    language?: string

    /** A map region that provides a hint for the geographic area to search. In a map application, this is typically the region displayed in the map. */
    region?: CoordinateRegion
}

/** The result of a search, including the original search query, the bounding region, and a list of places that match the query. */
export interface SearchResponse
{
    /**
     * A list of places that match the search query.
     * The places array is empty if there is no match.
     * */
    places: Place[]

    /**
     * The query string used to perform the search.
     * This property is empty when you use a SearchAutocompleteResult object to perform the search.
    */
    query: string

    /** The region that encloses the places included in the search results. This property is not present if there are no results. */
    boundingRegion?: CoordinateRegion
}

/** Options you can provide when performing a search. */
export interface SearchOptions
{
    /** A map coordinate that provides a hint for the geographic area to search. This overrides the coordinate provided to the mapkit.Search constructor.  */
    coordinate?: Coordinate

    /** A language ID that determines the language for the search result text. This overrides the language provided to the mapkit.Search constructor. */
    language?: string

    /** A map region that provides a hint for the geographic area to search.  This overrides the region provided to the mapkit.Search constructor. */
    region?: CoordinateRegion
}

/** The result of an autocomplete query, including display lines and a coordinate. */
export interface SearchAutocompleteResult
{
    /** The coordinate of the result, provided when it corresponds to a single place. */
    coordinate?: Coordinate

    /** Lines of text to display to the user in an autocomplete menu. */
    displayLines: string[] 
}

/** An object containing the response from an autocomplete request. */
export interface SearchAutocompleteResponse
{
    /** The query string used to perform the autocomplete request. */
    query: string

    /** The results from an autocomplete request. */
    results: SearchAutocompleteResult[]
}

/** An object or callback function you provide that is called when performing a search or autocomplete request. */
export interface SearchDelegate
{
    /** Tells the delegate that the autocomplete request completed. */
    autocompleteDidComplete?(data: SearchAutocompleteResponse): void

    /** Tells the delegate that the autocomplete request failed due to an error. */
    autocompleteDidError?(error: MapKitError): void

    /** Tells the delegate that the search completed. */
    searchDidComplete?(data: SearchResponse): void

    /** Tells the delegate that the search failed due to an error. */
    searchDidError?(error: MapKitError): void
}

/**  A geocoding request can be cancelled by ID. */
export class Search
{
    /** Creates a search object with optional initial values that you provide. */
    constructor(options?: SearchConstructorOptions)

    /** Retrieves the results of a search query. */
    search(query: string | SearchAutocompleteResult, callback: SearchDelegate | ((error: MapKitError, data: SearchResponse) => void), options?: SearchOptions): number

    /** Retrieves a list of autocomplete results for the specified search query. */
    autocomplete(query: string, callback: SearchDelegate | ((error: MapKitError, data: SearchAutocompleteResponse) => void), options?: SearchOptions): number

    /** Cancels a search request using its request ID. */
    cancel(id: number): boolean
}

/** Options that you may provide when creating a directions object. */
export interface DirectionsConstructorOptions
{
    /** A language ID that determines the language for route information. */
    language?: string
}

/** The requested start and end points for a route, as well as the planned mode of transportation. */
export interface DirectionsRequest
{
    /** The start point for routing directions. */
    origin: string | Coordinate | Place

    /** The end point for routing directions. */
    destination: string | Coordinate | Place

    /** A Boolean value that indicates whether the server should return multiple routes when they are available. */
    requestsAlternateRoutes: boolean

    /** The mode of transportation to which directions should apply. */
    transportType: Directions.Transport
}

/** A single route between a requested start and end point. */
export interface RouteStep
{
    /** An array of coordinate objects representing the path of the route segment. */
    path: Coordinate[]

    /** The written instructions for following the path represented by the step. */
    instructions: string

    /** The step distance in meters. */
    distance: number

    /** The transport type of the step. */
    transportType: Directions.Transport
}

/** Information about a route, including step-by-step instructions, distance, and estimated travel time. */
export interface Route
{
    /** An instance of a polyline overlay that represents the path of a route. */
    polyline: PolylineOverlay

    /**
     * An array of coordinate objects representing the path of the route.
     * @deprecated Use polyline instead of path.
     */
    path: Coordinate[][]

    /** An array of steps that comprise the overall route. */
    steps: RouteStep[]

    /** The name assigned to the route. */
    name: string

    /** The route distance in meters. */
    distance: number

    /** The expected travel time in seconds. */
    expectedTravelTime: number

    /** The overall route transport type. */
    transportType: Directions.Transport
}

/** The directions and estimated travel time returned for a route. */
export interface DirectionsResponse
{
    /** The request object associated with this response. */
    request: DirectionsRequest

    /** An array of route objects. */
    routes: Route[]
}

/** An object that provides directions and estimated travel time based on the route you provide. */
export class Directions
{
    /** Creates a directions object with options that you may provide. */
    constructor(options?: DirectionsConstructorOptions)

    /** Retrieves directions and estimated travel time for the specified start and end points. */
    route(request: DirectionsRequest, callback: (error?: Error, data?: DirectionsResponse) => void): number

    /** Cancels a previous request for route directions. */
    cancel(id: number): boolean
}

export namespace Directions
{
    /** The modes of transportation. */
    export enum Transport
    {
        /** A constant identifying the mode of transportation as driving. */
        Automobile = 'Automobile',

        /** A constant identifying the mode of transportation as walking. */
        Walking = 'Walking'
    }
}

/** A tree structure containing annotations, overlays, and nested item collection objects. */
export interface ItemCollection
{
    /** The raw GeoJSON data. */
    data: object

    /** A flattened array of items that include annotations or overlays. */
    getFlattenedItemList: (Annotation | Overlay)[]

    /** A nested list of annotations, overlays, or other item collections. */
    items: (Annotation | Overlay | ItemCollection)[]
}

/** A delegate object that controls a GeoJSON import in order to override default behavior and provide custom style. */
export interface GeoJSONDelegate
{
    /** Overrides a feature. */
    itemForFeature?: (item: Annotation | Overlay | null, geoJSON: object) => Annotation | Overlay | Annotation[] | Overlay[]

    /** Overrides a feature collection. */
    itemForFeatureCollection?: (itemCollection: ItemCollection, geoJSON: object) => Annotation | Overlay | Annotation[] | Overlay[]

    /** Overrides a line string. */
    itemForLineString?: (overlay: PolylineOverlay, geoJSON: object) => Annotation | Overlay | Annotation[] | Overlay[]

    /** Overrides a multiline string. */
    itemForMultiLineString?: (itemCollection: ItemCollection, geoJSON: object) => Annotation | Overlay | Annotation[] | Overlay[]

    /** Overrides a point. */
    itemForPoint?: (overlay: Coordinate, geoJSON: object) => Annotation | Overlay | Annotation[] | Overlay[]

    /** Overrides a multipoint object. */
    itemForMultiPoint?: (itemCollection: ItemCollection, geoJSON: object) => Annotation | Overlay | Annotation[] | Overlay[]

    /** Overrides a polygon. */
    itemForPolygon?: (overlay: PolygonOverlay, geoJSON: object) => Annotation | Overlay | Annotation[] | Overlay[]

    /** Overrides a multipolygon. */
    itemForMultiPolygon?: (itemCollection: ItemCollection, geoJSON: object) => Annotation | Overlay | Annotation[] | Overlay[]

    /** Overrides the style of overlays. */
    styleForOverlay?: (overlay: Overlay, geoJSON: object) => Style

    /** Completes the GeoJSON import. */
    geoJSONDidComplete?: (result: ItemCollection, geoJSON: object) => void

    /** Indicates the GeoJSON import failed. */
    geoJSONDidError?: (error: Error, geoJSON: object) => void
}

/** Converts imported GeoJSON data to MapKit JS items. */
export function importGeoJSON(data: string | object, callback: GeoJSONDelegate | ((error: MapKitError, result: ItemCollection) => void)): Error | ItemCollection

// Is this actually WebKitPoint? confusing
export class DOMPoint
{
    constructor(x: number, y: number)

    w: number
    x: number
    y: number
    z: number

}