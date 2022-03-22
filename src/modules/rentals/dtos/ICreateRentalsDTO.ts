export interface ICreateRentalDTO {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
  id?: string; // Não obrigatório pq se eu passar ele atualiza
  end_date?: Date;
  total?: number;
}
