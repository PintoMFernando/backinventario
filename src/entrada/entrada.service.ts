import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Entrada } from 'src/entities/entrada.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateEntradaDto } from './dto/createEntrada.dto';
import { UpdateEntradaDto } from './dto/updateEntrada.dto';

@Injectable()
export class EntradaService {
    constructor(
        @InjectRepository(Entrada)
        private readonly entradaRepository: Repository<Entrada>
      ) {}
    
      async create(createentradasDto: CreateEntradaDto){
        return await this.entradaRepository.save(createentradasDto);
      }
      
    
      async findAllEntrada() {
        return await this.entradaRepository.find({ relations: ['identradas'] });
    }
    
       
      async findAllByEntrada(idcentralizadormes: string) {
        return await this.entradaRepository.createQueryBuilder('observaciones')
          .where('observaciones.idmescentralizador = :idcentralizadormes', { idcentralizadormes })
          .leftJoin('pproducto', 'cu', 'cu.iduser = :iduser', { iduser: '1' })
          .select(['observaciones.*', 'cu.*']) 
          .getRawMany();
      }
  
  async update(idcentralizadormes:string,observacionessDto:UpdateEntradaDto): Promise<UpdateResult>{  //EL PROMISE ERA LA CLAVE PARA QUE DE TODOO
    
   
    return await this.entradaRepository.update(idcentralizadormes, observacionessDto)

  }


  async remove(idobservaciones:string){
   return await this.entradaRepository.softDelete(idobservaciones);
  }

}
