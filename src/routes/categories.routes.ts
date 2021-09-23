import { Router } from 'express';

import { Category } from '../model/Category';

const categoriesRoutes = Router();

const categories: Category[] = [];
// categoria e um array de category modal

categoriesRoutes.post('/', (request, response) => {
    const { name, description } = request.body;

    const category = new Category();

    Object.assign(category, {
        name,
        description,
        created_at: new Date(),
    });
    // isso e mesma coisa de eu da um category.name

    // category.name = name;
    // category.description = description;
    // category.created_at = new Date();

    categories.push(category);

    return response.status(201).json();
});

export { categoriesRoutes };
