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
  
  async update(identrada:string,entradaDto:UpdateEntradaDto,nuevacantidad:number): Promise<UpdateResult>{  //EL PROMISE ERA LA CLAVE PARA QUE DE TODOO

    
     
    // const nuevaEntrada =  await this.entradaRepository.save(entradaDto)
     console.log("aqui estan mis datos???" ,entradaDto,nuevacantidad)
     const idProducto =String(entradaDto.idproducto);
     const cantidad=Number(entradaDto.cantidad);
    
     if(nuevacantidad> 0){ //tipo1 aumenta
      const updateProducto= await this.productoRepository
         .createQueryBuilder()
         .update(Producto)
         .set({ stock: () => `"stock" + ${nuevacantidad}` }) //esto aumenta la cantidad 
         .where({ idproducto: idProducto })
         .execute();
       //  return await this.entradaRepository.update(identrada, entradaDto)
     }
     if(nuevacantidad <0){ //tyipo2 disminuye
      const updateProducto= await this.productoRepository
         .createQueryBuilder()
         .update(Producto)
         .set({ stock: () => `"stock" - ${-nuevacantidad}` }) //esto aumenta la cantidad 
         .where({ idproducto: idProducto })
         .execute();
         console.log(typeof entradaDto.identrada);
         console.log("esta entrando o no??",updateProducto, "mi idproducto",idProducto, cantidad)
         
     }
     return await this.entradaRepository.update(identrada, entradaDto)
         //return updateProducto
   
 //   return await this.entradaRepository.update(identrada, entradaDto)

  }


  async remove(identrada:string,idproducto:string,cantidad:number){
    const updateProducto= await this.productoRepository
         .createQueryBuilder()
         .update(Producto)
         .set({ stock: () => `"stock" - ${cantidad}` }) //esto aumenta la cantidad 
         .where({ idproducto: idproducto })
         .execute();


   return await this.entradaRepository.softDelete(identrada);
  }

}
