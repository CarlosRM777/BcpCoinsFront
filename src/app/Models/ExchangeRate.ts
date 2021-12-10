export interface ExchangeRate {
    tipoCambio: number;
	monedaOrigen: string;
	monedaDestino: string;
}

export interface ExchangeRateReq {
    monto: number;
	monedaOrigen: string;
	monedaDestino: string;
}

export interface ExchangeRateResponse {
    montoInicial: number;
    montoCambiado: number;
	monedaOrigen: string;
	monedaDestino: string;
    tipoCambio: number;
}

export interface ExchangeRateUpdResponse {
    montoInicial: number;
    montoCambiado: number;
	monedaOrigen: string;
	monedaDestino: string;
    tipoCambio: number;
}