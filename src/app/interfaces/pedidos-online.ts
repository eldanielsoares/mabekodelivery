export interface PedidosOnline {
    pedido?: string[],
    delivery?: boolean,
    endereco?:string,
    idCliente?: string,
    idVendedor?: string,
    timestamp?: number,
    preco?: number,
    observacao?:string,
    nomeCliente?:string,
    nomeVendedor?:string,
    telefoneCliente?:string,
    telefoneVendedor?:string,
    formaPagamento?:string,
    desconto?:number,
    docId?: string,
    status?: number,
    troco?: string,
    mesa?: string,
    entregaTaxa?: number


}
