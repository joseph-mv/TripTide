export interface TouristLocation {
    _id?: string;
    name?: string;
    siteLabel?: string;
    location: {
        type: string;
        coordinates: number[];
    };
    typeLabel?: string[];
    [key: string]: any;
}

export interface Coordinates {
    latitude: number;
    longitude: number;
}
