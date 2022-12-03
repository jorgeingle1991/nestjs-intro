import { Productos } from './products.entity'

export const productosProvider = [
    {
        provide: 'PRODUCTOS_REPOSITORY',
        useValue: Productos
    }
];