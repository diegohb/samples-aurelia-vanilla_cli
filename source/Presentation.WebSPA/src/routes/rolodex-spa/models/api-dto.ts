export type ResponseDTO<TDataType> = {
    data: Array<TDataType>;
    limit: number;
    offset: number;
    page: number;
    total: number;
};

export type PersonDTO =
{
    id: string;
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    picture: string; //uri
    gender?: string;
    dateOfBirth?: string;
    phone?: string;
    location?: LocationDTO;
};

export type LocationDTO = {
    street: string;
    city: string;
    state: string;
    country: string;
    timezone: string;
};