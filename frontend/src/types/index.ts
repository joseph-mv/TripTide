export interface Place {
    name: string;
    lat?: number;
    lng?: number;
    address?: string;
    rating?: number;
    user_ratings_total?: number;
    [key: string]: any; // Allow loose typing for now as place objects can be complex from maps APIs
}

export interface DayItinerary {
    date: string;
    startingPoint?: string;
    places?: Place[];
    // Add other properties as we find them
    [key: string]: any;
}

export interface Itinerary {
    [key: string]: DayItinerary; // Keys are like "Day1", "Day2"
}

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
    lat: number;
    lng: number;
}

export interface SelectedPlace {
    place: any;
    index: number;
    distFromStart: number;
}

export interface LocationState {
    destination: Coords | {};
    startingPoint: Coords | {};
    coordinates: Coords[];
    distance: string;
    travelTime: string;
    routeGeometry: any[];
    selectedPlaces: { [key: string]: SelectedPlace };
    destinations: any[];
    noOfDays: number | "";
    sortedSelectedPlaces: any[];
}

export type LocationAction =
    | { type: "SET_DESTINATION"; payload: Coords }
    | { type: "SET_STARTING_POINT"; payload: Coords }
    | { type: "COORDINATES"; payload: Coords[] }
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
    | { type: "RESET_ LOCATION" };

export interface UserState {
    userId: string;
    userName: string;
    email: string;
    image: string;
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
