import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Entrada } from 'src/entities/entrada.entity';
import { Repository, UpdateResult, createQueryBuilder } from 'typeorm';
import { CreateEntradaDto } from './dto/createEntrada.dto';
import { UpdateEntradaDto } from './dto/updateEntrada.dto';
import { Producto } from 'src/entities/producto.entity';

@Injectable()
export class EntradaService {
    constructor(
        @InjectRepository(Entrada)
        private readonly entradaRepository: Repository<Entrada>,
        @InjectRepository(Producto)
        private readonly productoRepository: Repository<Producto>
      ) {}
    
      async create(createentradasDto: CreateEntradaDto){
       // return await this.entradaRepository.save(createentradasDto);
      const nuevaEntrada =  await this.entradaRepository.save(createentradasDto)
      console.log("aqui estan mis datos???" ,createentradasDto)
      const idProducto =String(createentradasDto.idproducto);
      const cantidad=Number(createentradasDto.cantidad);
      //const productoId = createEntradasDto.productoId; // Suponiendo que tienes el ID del producto en el DTO
     const updateProducto= await this.productoRepository
          .createQueryBuilder()
          .update(Producto)
          .set({ stock: () => `"stock" + ${cantidad}` }) //esto aumenta la cantidad 
          .where({ idproducto: idProducto })
          .execute();
          console.log(typeof createentradasDto.identrada);
          console.log("esta entrando o no??",updateProducto, "mi idproducto",idProducto, cantidad)
          return updateProducto
      //return nuevaEntrada;
     
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
  
  async update(idcentralizadormes:string,entradaDto:UpdateEntradaDto): Promise<UpdateResult>{  //EL PROMISE ERA LA CLAVE PARA QUE DE TODOO
    
   
    return await this.entradaRepository.update(idcentralizadormes, entradaDto)

  }


  async remove(identrada:string){
   return await this.entradaRepository.softDelete(identrada);
  }

}
