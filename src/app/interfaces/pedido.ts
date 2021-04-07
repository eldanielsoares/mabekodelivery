export interface Pedido {
    pedido: string,
    preco: number,
    quantidade:number,
    delivery?: boolean,
    endereco?: string,
    id: string,
    sabor?: string[],
    multiSabor?: boolean,
    categoria?: string

}
