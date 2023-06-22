export interface IProduct {
    _id: string,
    name: string,
    price: number,
    images: string[],
    description: string,
    categoryId: string,
    __v?: string,
}