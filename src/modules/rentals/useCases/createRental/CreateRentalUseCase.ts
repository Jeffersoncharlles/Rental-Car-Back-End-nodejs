import { inject, injectable } from 'tsyringe';

import { IRentalsRepository } from '../../repository/IRentalsRepository';

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

// @injectable()
class CreateRentalUseCase {
    constructor(
        // @inject("RentalsRepository")
        private rentalRepository: IRentalsRepository
    ) {}
    async execute({
        user_id,
        car_id,
        expected_return_date,
    }: IRequest): Promise<void> {}
}

export { CreateRentalUseCase };
