import { Injectable } from '@nestjs/common';
import { CreateProformaDto } from './dto/createProforma.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Proforma } from 'src/entities/proforma.entity';
import { Repository } from 'typeorm';
import { UpdateProformaDto } from './dto/updateProforma.dto';

@Injectable()
export class ProformaService {
   
    constructor(
       
        @InjectRepository(Proforma)
        private readonly proformaRepository: Repository<Proforma>
      ) {}
    
      async create(createProformaDto: CreateProformaDto) {
        console.log("ENTRA  MI SERVICIOOOOOOOOOO para cerar")
         return await this.proformaRepository.save(createProformaDto);
        }

        async findAllProducto(){
            return await this.proformaRepository.find();
          }


     /*   async findOneProforma(idproforma:string){
            const salida = await this.proformaRepository.findOne({ where: { idproforma },relations: ['idsalidas'], });
          return salida
        }*/
}
