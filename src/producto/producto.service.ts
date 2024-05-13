import { Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/createProducto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from 'src/entities/producto.entity';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository, UpdateResult } from 'typeorm';
import { UpdateProductoDto } from './dto/updateProducto.dto';

@Injectable()
export class ProductoService {
    
    
    constructor(
        @InjectRepository(Producto)
        public  productoRepository: Repository<Producto>
      ) {}


      async findAllProducto(){
        return await this.productoRepository.find();
      }


     async create(createProductoDto: CreateProductoDto) {
        console.log("ENTRA  MI SERVICIOOOOOOOOOO para cerar")
         return await this.productoRepository.save(createProductoDto);
        }


         
  async update(idproducto:string,productoDto:UpdateProductoDto): Promise<UpdateResult>{  //EL PROMISE ERA LA CLAVE PARA QUE DE TODOO
    
   
    return await this.productoRepository.update(idproducto, productoDto)

  }

  async remove(idproducto:string){
    return await this.productoRepository.delete(idproducto);
  }


  async findOneProducto(idproducto:string){


    return await this.productoRepository.find({
      where: {
        idproducto: idproducto, 

        },
    
    });


    
    
  }

  async findOneconteo(){
    return await this.productoRepository.count();
  }


  async findAllByReporteFecha(fechainicio:string,fechafinal:string,tiporeporte:string){

    const startDate = new Date(fechainicio);
    const endDate = new Date(fechafinal);

    endDate.setDate(endDate.getDate() + 1);
    
  /*  return await this.productoRepository.find({
        where: {
          created_at: Between(startDate, endDate),
        },
    });
*/
if(tiporeporte == "entrada"){
  const productosConEntradasYSalidas = await this.productoRepository
        .createQueryBuilder('producto')
        .leftJoinAndSelect('producto.entradas', 'entrada')
        .addSelect('producto.idproducto')
        .addSelect('producto.nombre')
        .addSelect('SUM(cantidad)', 'cantidadTotal')
        .addSelect('SUM(precioentrada)', 'precioTotal')
        .where('entrada.created_at BETWEEN :start AND :end', { start: startDate, end: endDate })
        .groupBy('producto.idproducto,entrada.identrada')
        
        .getRawMany();
  console.log("asdas",productosConEntradasYSalidas)
    return productosConEntradasYSalidas;

}
else{
  const productosConEntradasYSalidas = await this.productoRepository
  .createQueryBuilder('producto')
  .leftJoin('producto.salidas', 'salida')
  .addSelect('producto.idproducto')
  .addSelect('producto.nombre')
  .addSelect('SUM(salida.cantidad)', 'cantidadTotal')
  .addSelect('SUM(salida.preciototal)', 'precioTotal')
  .where('salida.created_at BETWEEN :start AND :end', { start: startDate, end: endDate })
  .groupBy('producto.idproducto')
  .getRawMany();
  

return productosConEntradasYSalidas;

}


  }

 


      
}


