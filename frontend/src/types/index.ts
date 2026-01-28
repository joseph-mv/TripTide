export interface Place {
    name: string;
    lat?: number;
    lng?: number;
    address?: string;
    rating?: number;
    user_ratings_total?: number;
    [key: string]: any; // Allow loose typing for now as place objects can be complex from maps APIs
}

export interface ToDoItem {
    time: string;
    activity: string;
    isChecked: boolean;
}

export interface DayItinerary {
    day: number;
    date: string;
    startingPoint: string;
    endPoint: string;
    todo: ToDoItem[];
    notes: string;
    [key: string]: any;
}

export type Itinerary = Record<string, DayItinerary>

export interface FormDataState {
    startDate: string;
    endDate: string;
    budget: number | string;
    numPeople: number | string;
    transportation: string;
    destination: string;
    currency: string;
    activities: {
        sightseeing: boolean;
        adventure: boolean;
        shopping: boolean;
        relaxation: boolean;
        cultural: boolean;
        others: boolean;
        [key: string]: boolean;
    };
    notes: string;
    startingPoint: string;
}

export interface Coords {
    latitude: number;
    longitude: number;
}

export interface SelectedPlace {
    place: Destination;
    index: number;
    distFromStart: number;
}

export interface Destination {
    _id: string;
    siteLabel: string;
    typeLabel: string;
    location: {
        type?: string
        coordinates: [number, number]; // [lng, lat]
    };
    site?: string;
    [key: string]: any;
}

export interface LocationState {
    destination: Coords;
    startingPoint: Coords;
    coordinates: [number, number][];
    distance: string;
    travelTime: string;
    routeGeometry: [number, number][];
    selectedPlaces: Record<string, SelectedPlace>;
    destinations: Destination[];
    noOfDays: number;
    sortedSelectedPlaces: SelectedPlace[];
}

export type LocationAction =
    | { type: "SET_DESTINATION"; payload: Coords }
    | { type: "SET_STARTING_POINT"; payload: Coords }
    | { type: "COORDINATES"; payload: [number, number][] }
    | { type: "DISTANCE"; payload: string }
    | { type: "TRAVELTIME"; payload: string }
    | { type: "ROUTE_GEOMETRY"; payload: any[] }
    | { type: "NOOFDAYS"; payload: number }
    | { type: "INC_NO_OF_DAYS" }
    | { type: "DEC_NO_OF_DAYS" }
    | { type: "DELETE_PLACE"; payload: string }
    | { type: "ADD_PLACE"; payload: SelectedPlace; id: string }
    | { type: "SET_PLACES"; payload: { [key: string]: SelectedPlace } }
    | { type: "RESET_ PLACE" }
    | { type: "ADD_DESTINATIONS"; payload: any[] }
    | { type: "REMOVE_DESTINATIONS" }
    | { type: "SET_SORTED"; payload: any[] }
    | { type: "RESET_LOCATION" };

export interface UserState {
    userId: string;
    userName: string;
    email: string;
    image: string | null;
}

export type UserAction =
    | { type: "SETUSER"; payload: { userId: string; userName: string; email: string; image: string; token: string; refreshToken: string } }
    | { type: "CHANGEIMAGE"; payload: string }
    | { type: "REMOVEUSER" };

export interface AuthResponse {
    status: boolean;
    msg: string;
    token?: string;
    user?: any;
    error?: string;
}

export interface WikiPlace {
    name: string;
    description: string;
    extract: string;
    image: {
        source: string;
        width: number;
        height: number;
    };
    coordinates: {
        lat: number;
        lon: number;
    };
    [key: string]: any;
}

export interface Trip {
    _id: string;
    name: string;
    details: {
        startDate: string;
        endDate: string;
    };
}

export interface OngoingTrip {
    _id: string;
    name: string;
    noOfDays: number;
    distance: number | string;
    travelTime: string;
    details: {
        startDate: string;
        endDate: string;
        startingPoint: string;
        destination: string;
        transportation: string;
        numPeople: number | string;
        budget: number | string;
        currency: string;
        notes: string;
    };
}