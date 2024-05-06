import { Injectable } from '@nestjs/common';
import { CreateSalidaDto } from './dto/createSalida.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Salida } from 'src/entities/salida.entity';
import { Producto } from 'src/entities/producto.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class SalidaService {
    constructor(
        @InjectRepository(Salida)
        private readonly entradaRepository: Repository<Salida>,
        @InjectRepository(Producto)
        private readonly productoRepository: Repository<Producto>
      ) {}
    
      async create(createsalidasDto: CreateSalidaDto){
       // return await this.entradaRepository.save(createentradasDto);
      const nuevaSalida =  await this.entradaRepository.save(createsalidasDto)
      console.log("aqui estan mis datos???" ,createsalidasDto)
      const idProducto =String(createsalidasDto.idproducto);
      const cantidad=Number(createsalidasDto.cantidad);
      //const productoId = createEntradasDto.productoId; // Suponiendo que tienes el ID del producto en el DTO
     const updateProducto= await this.productoRepository
          .createQueryBuilder()
          .update(Producto)
          .set({ stock: () => `"stock" - ${cantidad}` }) //esto aumenta la cantidad 
          .where({ idproducto: idProducto })
          .execute();
          console.log(typeof createsalidasDto.idsalida);
          console.log("esta entrando o no??",updateProducto, "mi idproducto",idProducto, cantidad)
          return updateProducto
      //return nuevaEntrada;
     
      }



      
    
      async findAllSalida() {
        return await this.entradaRepository.find({ relations: ['idsalidas'] });
    }
    
       
      async findAllBySalida(idsalida: string) {
        return await this.entradaRepository.createQueryBuilder('observaciones')
          .where('observaciones.idmescentralizador = :idcentralizadormes', { idsalida })
          .leftJoin('pproducto', 'cu', 'cu.iduser = :iduser', { iduser: '1' })
          .select(['observaciones.*', 'cu.*']) 
          .getRawMany();
      }
  
  async update(idsalida:string,salidaDto:CreateSalidaDto,nuevacantidad:number): Promise<UpdateResult>{  //EL PROMISE ERA LA CLAVE PARA QUE DE TODOO
    
    console.log("aqui estan mis datos???" ,salidaDto,nuevacantidad,idsalida)
    const idProducto =String(salidaDto.idproducto);
    const cantidad=Number(salidaDto.cantidad);
   
    if(nuevacantidad> 0){ //tipo1 aumenta
     const updateProducto= await this.productoRepository
        .createQueryBuilder()
        .update(Producto)
        .set({ stock: () => `"stock" - ${nuevacantidad}` }) //esto aumenta la cantidad 
        .where({ idproducto: idProducto })
        .execute();
        //return await this.entradaRepository.update(idsalida, salidaDto)
    }
    if(nuevacantidad <0){ //tyipo2 disminuye
     const updateProducto= await this.productoRepository
        .createQueryBuilder()
        .update(Producto)
        .set({ stock: () => `"stock" + ${nuevacantidad}` }) //esto aumenta la cantidad 
        .where({ idproducto: idProducto })
        .execute();
        console.log(typeof salidaDto.idsalida);
        console.log("esta entrando o no??",updateProducto, "mi idproducto",idProducto, cantidad)
       
    }
   
    return await this.entradaRepository.update(idsalida, salidaDto)
    

  }


  async remove(idsalida:string,idproducto:string,cantidad:number){
    const updateProducto= await this.productoRepository
    .createQueryBuilder()
    .update(Producto)
    .set({ stock: () => `"stock" + ${cantidad}` }) //esto aumenta la cantidad 
    .where({ idproducto: idproducto })
    .execute();

   return await this.entradaRepository.softDelete(idsalida);
  }

}
