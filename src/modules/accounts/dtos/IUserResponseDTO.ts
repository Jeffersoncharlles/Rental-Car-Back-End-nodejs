interface IUserResponseDTO {
    email: string;
    id: string;
    name: string;
    avatar: string;
    driver_license: string;
    getAvatarUrl(): string;
}

export { IUserResponseDTO };
