import { inject, injectable } from 'tsyringe';

@injectable()
class SendForgotPasswordMailUseCase {
    constructor(
        @inject()
        private
    ) {}

    async execute(email: string) {}
}

export { SendForgotPasswordMailUseCase };
