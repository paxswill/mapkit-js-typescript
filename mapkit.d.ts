// Type definitions for MapKit JS 5.13.0
// Definitions by: Jon Nermut <asdeqlabs.com>, Will Ross <paxswill.com>

export as namespace mapkit

/** Initialize a mapkit object by providing an authorization callback and language. */
function init(options: MapKitInitOptions): void;

/** Subscribes a listener function to an event type. */
function addEventListener(type: string, listener: (Event) => void, thisObject?: any)

/** Unsubscribes a listener function from an event type. */
function removeEventListener(type: string, listener: (Event) => void, thisObject?: any)

type maps = [Map]

interface MapKitInitOptions
{
    /**
     * The callback function MapKit JS will invoke to asynchronously obtain an authorization token.
     * authorizationCallback will be invoked by MapKit JS throughout a session and should be prepared to obtain a new token and pass it to the done function, which will be provided my MapKit JS as the sole argument each time the authorizationCallback function is called.
     */
    authorizationCallback: (done: (jwt: (string)) => void) => void;

    language?: string
}

class Coordinate
{
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

interface MapConstructorOptions
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
    annotationForCluster?: Annotation

    /** An array of all the annotations on the map. */
    annotations?: Annotation[]

    /** The annotation on the map that is selected. */
    selectedAnnotation?: Annotation|null

    /** An array of all of the map's overlays. */
    overlays?: Overlay[]

    /** The overlay on the map that is selected. */
    selectedOverlay?: Overlay|null

    /** A Boolean value that determines whether the map displays points of interest. */
    showsPointsOfInterest?: boolean

    /** A Boolean value that determines whether to show the user's location on the map. */
    showsUserLocation?: boolean

    /** A Boolean value that determines whether to center the map on the user's location. */
    tracksUserLocation?: boolean

    /** A Boolean value that determines whether the user location control is visible. */
    showsUserLocationControl?: boolean

}

/** An embeddable interactive map that you add to a webpage. */
class Map
{
    constructor(parent?: string|Element, options?: MapConstructorOptions)

    /** Adds an event listener to handle events triggered by user interactions and the framework. */
    addEventListener(type:string, listener: (Map) => void, thisObject?: any);

    /** Removes an event listener. */
    removeEventListener(type:string, listener: (Map) => void, thisObject?: any);

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
    setCenterAnimated(coordinate: Coordinate, animate?: boolean): Map;

    /** The area currently displayed by the map. */
    region: CoordinateRegion

    /** Changes the map's region to the region provided, with optional animation. */
    setRegionAnimated(egion: CoordinateRegion, animate?: boolean): Map;

    /** The map's rotation, in degrees. */
    rotation: number

    /** Changes the map's rotation setting to the number of degrees specified. */
    setRotationAnimated(degrees: number, animate?: boolean): Map;

    /** The visible area of the map defined in map units. */
    visibleMapRect: MapRect

    /** Changes the map's visible map rectangle to the specified map rectangle. */
    setVisibleMapRectAnimated(mapRect: MapRect, animate?: boolean): Map;

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
    showItems(items: (Annotation|Overlay)[], options?: MapShowItemsOptions );

    /** A delegate method for modifying cluster annotations. */
    annotationForCluster?: Annotation

    /** An array of all the annotations on the map. */
    annotations?: Annotation[]

    /** The annotation on the map that is selected. */
    selectedAnnotation?: Annotation|null

    /** Returns the list of annotation objects located in the specified map rectangle. */
    annotationsInMapRect(mapRect: MapRect): Annotation[]

    /** Adds an annotation to the map. */
    addAnnotation(annotation: Annotation)

    /** Adds multiple annotations to the map. */
    addAnnotations(annotations: Annotation[])

    /** Removes an annotation from the map. */
    removeAnnotation(annotation: Annotation)

    /** Removes multiple annotations from the map. */
    removeAnnotations(annotations: Annotation[])

    /** An array of all of the map's overlays. */
    overlays: Overlay[]

    /** The overlay on the map that is selected. */
    selectedOverlay: Overlay|null

    /** Returns an array of overlays at a given point on the webpage. */
    overlaysAtPoint( point: DOMPoint ): Overlay[]

    /** Adds an overlay to the map. */
    addOverlay(overlay: Overlay);

    /** Adds multiple overlays to the map. */
    addOverlays(overlays: Overlay[]);

    /** Removes an overlay from the map. */
    removeOverlay(overlay: Overlay);

    /** Removes multiple overlays from the map. */
    removeOverlays(overlays: Overlay[]);

    /** Returns the topmost overlay at a given point on the webpage. */
    topOverlayAtPoint( point: DOMPoint ): Overlay

    /** An array of all of the map's tile overlays. */
    tileOverlays: TileOverlay[]

    /** Adds a tile overlay to the map. */
    addTileOverlay(overlay: TileOverlay);

    /** Adds an array of tile overlays to the map. */
    addTileOverlays(overlays: TileOverlay[]);

    /** Removes a tile overlay from the map. */
    removeTileOverlay(overlay: TileOverlay);

    /** Removes an array of tile overlays from the map. */
    removeTileOverlays(overlays: TileOverlay[]);

    /** A Boolean value that determines whether to show the user's location on the map. */
    showsUserLocation: boolean

    /** A Boolean value that determines whether to center the map on the user's location. */
    tracksUserLocation: boolean

    /** An annotation that indicates the user's location on the map. */
    userLocationAnnotation: Annotation|null

    /** Converts a coordinate on the map to a point in the page's coordinate system. */
    convertCoordinateToPointOnPage(coordinate: Coordinate): DOMPoint

    /** Converts a point in page coordinates to the corresponding map coordinate. */
    convertPointOnPageToCoordinate(point: DOMPoint): Coordinate

    /** Removes the map's element from the DOM and releases internal references to this map to free up memory. */
    destroy(): void

    /** The map's DOM element. */
    element: Element
}

namespace Map {
    enum MapTypes
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

    enum ColorSchemes
    {
        /** A constant indicating a light color scheme. */
        Light = 'Light',

        /** A constant indicating a dark color scheme. */
        Dark = 'Dark'
    }

    enum Distances
    {
        /** A constant indicating the measurement system is adaptive, and determined based on the map's language. */
        Adaptive = 'Adaptive',

        /** A constant indicating the measurement system is metric. */
        Metric = 'Metric',

        /** A constant indicating the measurement system is imperial. */
        Imperial = 'Imperial'
    }
}


interface MapShowItemsOptions
{
    /** A Boolean value that determines whether the map is animated as the map region changes to show the items. */
    animate?: boolean

    /** The minimum longitudinal and latitudinal span the map should display. */
    minimumSpan?: CoordinateSpan

    /** Spacing that is added around the computed map region when showing items. */
    padding: Padding

}

class MapPoint
{
    constructor(x: number, y: number)

    /** The location of the point along the x-axis of the map. */
    x: number

    /** The location of the point along the y-axis of the map. */
    y: number

    /** Returns a copy of a map point. */
    copy: MapPoint

    /** Indicates whether two map points are equal. */
    equals(other: MapPoint): boolean

    /** Returns a coorindate containing the latitude and longitude corresponding to a map point. */
    toCoordinate(): Coordinate

}

/** A pair of values in map units that define the width and height of a projected coordinate span. */
class MapSize
{
    constructor(width: number, height: number)

    width: number
    height: number
}

/** A rectangular area on a two-dimensional map projection. */
class MapRect
{
    constructor(x: number, y: number, width: number, height: number);

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

    scale(scaleFactor: number, scaleCenter: MapPoint);

    /**  Returns the region that corresponds to a map rectangle. */
    toCoordinateRegion(): CoordinateRegion

}

/** A rectangular area on a map defined by a center coordinate and a span, expressed in degrees of latitude and longitude. */
class CoordinateRegion
{
    constructor(center: Coordinate, span: CoordinateSpan);

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
class CoordinateSpan
{
    constructor( latitudeDelta: number, longitudeDelta: number);

    /** The amount of north-to-south distance (measured in degrees) to display on the map. */
    latitudeDelta: number

    /** The amount of east-to-west distance (measured in degrees) to display for the map region. */
    longitudeDelta: number

    copy(): CoordinateSpan

    equals(other: CoordinateSpan): boolean
}

/** A rectangular area on a map, defined by coordinates of the rectangle's northeast and southwest corners. */
class BoundingRegion
{
    constructor( northLatitude: number,  eastLongitude: number, southLatitude: number, westLongitude: number);

    northLatitude: number
    eastLongitude: number
    southLatitude: number
    westLongitude: number

    copy(): BoundingRegion

    toCoordinateRegion(): CoordinateRegion
}

interface PaddingConstructorOptions
{
    bottom: number
    left: number
    right: number
    top: number
}

class Padding
{
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

interface AnnotationConstructorOptions
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


    clusteringIdentifier?: string

    collisionMode?: Annotation.CollisionMode

    accessibilityLabel?: string
}

/**
 * The base object for annotations, used when creating custom annotations.
 */
class Annotation
{
    constructor(coordinate: Coordinate, factory: Function, options?: AnnotationConstructorOptions );

    addEventListener(type:string, listener: (Annotation) => void, thisObject?: any);

    /** Removes an event listener. */
    removeEventListener(type:string, listener: (Annotation) => void, thisObject?: any);

    /** The annotation's coordinate. */
    coordinate: Coordinate

    /** Data that you define that is assigned to the annotation. */
    data: any

    /** The text to display in the annotation's callout. */
    title: string

    /** The text to display as a subtitle, on the second line of an annotation's callout. */
    subtitle: string


    anchorOffset: DOMPoint
    appearanceAnimation: string
    displayPriority: number

    size: { height: number, width: number }

    visible: boolean

    animates: boolean
    draggable: boolean
    selected: boolean
    enabled: boolean

    map: Map

    /** The annotation's element in the DOM. */
    element: Element

    /** The callout delegate is an optional object that implements methods used to customize the appearance, content and animations of the callout appearing when the annotation is selected. */
    callout: AnnotationCalloutDelegate

    calloutEnabled: boolean
    calloutOffset: DOMPoint

    memberAnnotations: Annotation[]
    clusteringIdentifier: string
    collisionMode: Annotation.CollisionMode

    accessibilityLabel: string
}

declare namespace Annotation {
    /** Constant values used to provide a hint the map uses to prioritize displaying annotations. */
    enum DisplayPriority
    {
        /** A low display priority, with a preset value of 250 out of 1000. */
        Low = 250,

        /** A high display priority, with a preset value of 750 out of 1000. */
        High = 750,

        /** The highest display priority, with a preset value of 1000 out of 1000. */
        Required = 1000
    }

    /** Constants indicating how to interpret the collision frame rectangle of an annotation view. */
    enum CollisionMode
    {
        /** A constant indicating that a circle inscribed in the collision frame rectangle should be used to determine collisions. */
        Circle = 'Circle',

        /** A constant indicating that the full collision rectangle should be used for detecting collisions. */
        Rectangle = 'Rectangle'
    }
}

/** An object with URLs to images to be shown at standard, 2x, and 3x Retina screen types */
interface _DisplayAsset
{
    /** A URL to an image shown at standard screen densities. The dimensions should be 20 x 20 pixels. */
    1: string,

    /** An optional URL to be shown at 2x screen densities. The dimensions should be 40 x 40 pixels. */
    2?: string,

    /** An optional URL to be shown at 3x screen densities. The dimensions should be 60 x 60 pixels. */
    3?: string,
}

class MarkerAnnotation extends Annotation
{
    constructor(coordinate: Coordinate, options?: MarkerAnnotationConstructorOptions)

    /** The fill color of the marker. */
    color: string

    /** The fill color of the glyph. */
    glyphColor: string

    /** The images to display in the marker. */
    glyphImage: _DisplayAsset

    /** The text to display in the marker. */
    glyphText: string

    /** The images to display in the balloon when the user selects the annotation. */
    selectedGlyphImage: _DisplayAsset

    /** A value that determines when the subtitle is visible. */
    subtitleVisibility: FeatureVisibility

    /** A value that determines when the title is visible. */
    titleVisibility: FeatureVisibility
}

interface MarkerAnnotationConstructorOptions extends AnnotationConstructorOptions
{
    /** The fill color of the marker. */
    color?: string

    /** The fill color of the glyph. */
    glyphColor?: string

    /** The images to display in the marker. */
    glyphImage?: _DisplayAsset

    /** The text to display in the marker. */
    glyphText?: string

    /** The images to display in the balloon when the user selects the annotation. */
    selectedGlyphImage?: _DisplayAsset

    /** A value that determines when the subtitle is visible. */
    subtitleVisibility?: FeatureVisibility

    /** A value that determines when the title is visible. */
    titleVisibility?: FeatureVisibility

}

/** A customized annotation with image resources that you provide. */
class ImageAnnotation extends Annotation
{
    constructor(coordinate: Coordinate, options?: ImageAnnotationConstructorOptions)

    /** An object containing URLs for the image assets in multiple resolutions. 
     * eg:
     *     url: {
     *          1: "foo.png",
     *          2: "foo_2x.png",
     *          3: "foo_3x.png"
     *     }
    */
    url: _DisplayAsset
}

interface ImageAnnotationConstructorOptions extends AnnotationConstructorOptions
{
    /** An object containing URLs for the image assets in multiple resolutions. 
     * eg:
     *     url: {
     *          1: "foo.png",
     *          2: "foo_2x.png",
     *          3: "foo_3x.png"
     *     }
    */
    url: _DisplayAsset
}

enum FeatureVisibility
{
    /** Indicates that a map feature adapts to the current map state. */
    Adaptive = 'Adaptive',

    /** Indicates that a map feature is always hidden */
    Hidden = 'Hidden',

    /** Indicates that a map feature is always visible.n */
    Visible = 'Visible'

}

interface AnnotationCalloutDelegate
{
    // TODO: 
    /*
    Customizing Callout Appearance
calloutAnchorOffsetForAnnotation
calloutShouldAppearForAnnotation
calloutShouldAnimateForAnnotation
calloutAppearanceAnimationForAnnotation
Providing Elements
calloutContentForAnnotation
calloutElementForAnnotation
calloutLeftAccessoryForAnnotation
calloutRightAccessoryForAnnotation
*/
}

class Overlay
{
    // TODO
}

class CircleOverlay extends Overlay
{
    // TODO
}

class PolylineOverlay extends Overlay
{
    // TODO
}

class PolygonOverlay extends Overlay
{
    // TODO
}

class TileOverlay
{
    // TODO
}

interface GeocoderConstructorOptions
{
    getsUserLocation?: boolean
    language?: string
}

interface GeocodeResponse
{
    results: Place[]
}

interface GeocoderLookupOptions
{
    coordinate?: Coordinate
    language?: string

    /** Tell the geocoder to return results within a list of countries. Countries in the list are specified with two-letter country codes. For example, constrain the geocoder to return results in Australia and New Zealand with { limitToCountries: "AU, NZ" }. */
    limitToCountries?: string
    region?: CoordinateRegion
}

interface GeocoderReverseLookupOptions
{
    language?: string
}

interface Place
{
    /** The name of this place. */
    name: string

    /** The address of this place, formatted to the conventions of the place's country. */
    formattedAddress: string

    /** The country associated with this place, denoted by the standard abbreviation used to refer to the country. For example, if the place was was Apple Park, the value for this property would be the string “US”. */
    countryCode

    /** The latitude and longitude for this place. */
    coordinate: Coordinate

    /** The geographic region associated with the place. */
    region: CoordinateRegion
}

class Geocoder
{
    constructor( options?: GeocoderConstructorOptions );

    getsUserLocation: boolean
    language: string

    lookup ( place: string, callback: (error, data: GeocodeResponse) => void, options?: GeocoderLookupOptions ): number;

    reverseLookup (coordinate: Coordinate, callback: (error, data: GeocodeResponse) => void, options?: GeocoderReverseLookupOptions );

    /**  A geocoding request can be cancelled by ID. */
    cancel (id: number);
}

interface SearchConstructorOptions 
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

interface SearchResponse
{
    /** A list of places that match the search query. */
    places: Place[]

    /** The query string used to perform the search. */
    query?: string

    /** The region that encloses the places included in the search results. This property is not present if there are no results. */
    boundingRegion?: CoordinateRegion
}

interface SearchOptions

{
    coordinate?: Coordinate
    language?: string

    /** A map region that provides a hint for the geographic area to search. */
    region?: CoordinateRegion
}

interface SearchAutocompleteResult
{
    /** The coordinate of the result, provided when it corresponds to a single place. */
    coordinate?: Coordinate

    /** Lines of text to display to the user in an autocomplete menu. */
    displayLines: string[] 
}

interface SearchAutocompleteResponse
{
    query: string
    results: SearchAutocompleteResult[]
}

/** An object or callback function you provide that is called when performing a search or autocomplete request. */
interface SearchDelegate
{
    /** Tells the delegate that the autocomplete request completed. */
    autocompleteDidComplete?(data: SearchAutocompleteResponse );

    /** Tells the delegate that the autocomplete request failed due to an error. */
    autocompleteDidError?(error: Error);

    /** Tells the delegate that the search completed. */
    searchDidComplete?(data: SearchResponse );

    /** Tells the delegate that the search failed due to an error. */
    searchDidError?(error: Error);

}

/**  A geocoding request can be cancelled by ID. */
class Search
{
    constructor(options?: SearchConstructorOptions)

    /** Retrieves the results of a search query. */
    search (query: string|SearchAutocompleteResult, callback: SearchDelegate|((error, data: SearchResponse) => void), options?: SearchOptions );

    autocomplete (query: string, callback: SearchDelegate|((error, data: SearchAutocompleteResponse) => void), options?: SearchOptions );
}

// Is this actually WebKitPoint? confusing
export class DOMPoint
{
    constructor(x: number, y: number)

    w: number
    x: number
    y: number
    z: number

}