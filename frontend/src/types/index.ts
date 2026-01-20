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

export interface LocationState {
    startingPoint: string;
    destination: string;
    selectedPlaces: Place[];
    sortedSelectedPlaces?: Place[];
    distance: string;
    travelTime: string;
    noOfDays: number;
    coordinates: {
        lat: number;
        lng: number;
    };
}

export interface UserState {
    userId: string | null;
    name?: string;
    email?: string;
    token?: string;
}

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
