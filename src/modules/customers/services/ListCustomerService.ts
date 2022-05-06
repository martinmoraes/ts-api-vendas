import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IPaginateCustomer {
  from: number;
  to: number;
  per_page?: number | null | undefined;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  data: Customer[];
}
class ListCustomerService {
  public async execute(): Promise<IPaginateCustomer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    // const customer = await customersRepository.find();
    const customer = await customersRepository.createQueryBuilder('customers')
      .paginate;
    return customer as IPaginateCustomer;
  }
}

export default ListCustomerService;
