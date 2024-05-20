import { Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/createProducto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from 'src/entities/producto.entity';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository, UpdateResult } from 'typeorm';
import { UpdateProductoDto } from './dto/updateProducto.dto';
import { Salida } from 'src/entities/salida.entity';

@Injectable()
export class ProductoService {
    
    
    constructor(
        @InjectRepository(Producto)
        public  productoRepository: Repository<Producto>,
        //public  salidaRepository: Repository<Salida>
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
  .addSelect('SUM(salida.descuento)', 'descuentoTotal')
  .where('salida.created_at BETWEEN :start AND :end', { start: startDate, end: endDate })
  .groupBy('producto.idproducto')
  .getRawMany();
  

return productosConEntradasYSalidas;

}


  }



  async findAllByReporteFechaentrada(anio:number,mes:number){

   
const startDate = new Date(anio, mes - 1, 1); // Fecha de inicio del mes
const endDate = new Date(anio, mes, 0); // Fecha de fin del mes

const productosConEntradasYSalidas = await this.productoRepository
    .createQueryBuilder('producto')
    .leftJoinAndSelect('producto.entradas', 'entrada')
    .addSelect('producto.idproducto')
    .addSelect('producto.nombre')
    .addSelect('SUM(entrada.cantidad)', 'cantidadTotal')
    .addSelect('SUM(entrada.precioentrada)', 'precioTotal')
    .where("entrada.created_at BETWEEN :startDate AND :endDate", { startDate, endDate })
    .groupBy('producto.idproducto,entrada.identrada')
    .getRawMany();


    return productosConEntradasYSalidas;




  }




  
  async findAllByReporteFechasalida(anio:number,mes:number){

    const startDate = new Date(anio, mes - 1, 1); // Fecha de inicio del mes
    const endDate = new Date(anio, mes, 0); // Fecha de fin del mes
    
    const productosConEntradasYSalidas = await this.productoRepository
        .createQueryBuilder('producto')
        .leftJoin('producto.salidas', 'salida')
        .addSelect('producto.idproducto')
        .addSelect('producto.nombre')
        .addSelect('SUM(salida.cantidad)', 'cantidadTotal')
        .addSelect('SUM(salida.preciototal)', 'precioTotal')
        .addSelect('SUM(salida.descuento)', 'descuentoTotal')
        .where("salida.created_at BETWEEN :startDate AND :endDate", { startDate, endDate })
        .groupBy('producto.idproducto')
        .getRawMany();
    
    
        return productosConEntradasYSalidas;
 
 
 
   }

   //reporte dia


   async findAllByReporteDiaentrada(fecha:string){

   
    const fechaDate = new Date(fecha);
    
console.log("fechaDate que es esto??",fechaDate)
   // endDate.setDate(endDate.getDate() + 1);
    
    

    

    const productosConEntradasYSalidas = await this.productoRepository
        .createQueryBuilder('producto')
        .leftJoinAndSelect('producto.entradas', 'entrada')
        .addSelect('SUM(entrada.cantidad)', 'cantidadTotal')
    .addSelect('SUM(entrada.precioentrada)', 'precioTotal')
        //.leftJoinAndSelect('producto.salidas', 'salida')
        .where("DATE(entrada.created_at) = :fecha", { fecha: fechaDate.toISOString().split('T')[0] }) 
        .groupBy('producto.idproducto,entrada.identrada')
    .getRawMany();
  console.log("asdas",productosConEntradasYSalidas)
    return productosConEntradasYSalidas;


return productosConEntradasYSalidas;

    
    
    
      }
    
    
    
    
      
      async findAllByReporteDiasalida(fecha:string){
    
        const fechaDate = new Date(fecha);
        
        const productosConEntradasYSalidas = await this.productoRepository
            .createQueryBuilder('producto')
            .leftJoinAndSelect('producto.salidas', 'salida')
            .addSelect('producto.idproducto')
            .addSelect('producto.nombre')
            .addSelect('SUM(salida.cantidad)', 'cantidadTotal')
            .addSelect('SUM(salida.preciototal)', 'precioTotal')
            .addSelect('SUM(salida.descuento)', 'descuentoTotal')
            .where("DATE(salida.created_at) = :fecha", { fecha: fechaDate.toISOString().split('T')[0] }) 
            .groupBy('producto.idproducto,salida.idsalida')
            .getRawMany();

           
        
       

        
        
            return productosConEntradasYSalidas;
     
     
     
       }




       async findAllByInicio(fecha:string){
    
        const fechaDate = new Date(fecha);
        
       
        const cantidadProductos = await this.productoRepository
        .createQueryBuilder('producto')
        .select('COUNT(DISTINCT producto.idproducto)', 'cantidadProductos')
        .getRawOne();

        const cantidadEntradas = await this.productoRepository
        .createQueryBuilder('producto')
        .select('SUM(entrada.cantidad)', 'cantidadEntradas')
        .leftJoin('producto.entradas', 'entrada')
        .where('DATE(entrada.created_at) = :fecha', { fecha: fechaDate.toISOString().split('T')[0]  }) // Filtra las entradas por fecha
        .getRawOne();


        const cantidadSalidas = await this.productoRepository
        .createQueryBuilder('producto')
        .select('SUM(salida.cantidad)', 'cantidadSalidas')
        .leftJoin('producto.salidas', 'salida')
        .where('DATE(salida.created_at) = :fecha', { fecha: fechaDate.toISOString().split('T')[0] }) // Filtra las salidas por fecha
        .getRawOne();

        const ultimosTresProductos = await this.productoRepository
        .createQueryBuilder('producto')
        .orderBy('producto.created_at', 'DESC') // Ordena por fecha de creación descendente
        .take(4) // Limita el resultado a tres registros
        .getMany();

        const ultimasTresSalidas = await this.productoRepository
        .createQueryBuilder('producto')
        .leftJoinAndSelect('producto.salidas', 'salida')
        .where('DATE(salida.created_at) = :fecha', { fecha: fecha }) // Filtra por fecha
        .orderBy('salida.created_at', 'DESC') // Ordena por fecha de creación descendente
        .take(4) // Limita el resultado a tres registros
        .getMany();

        const ultimasTresEntradas = await this.productoRepository
        .createQueryBuilder('producto')
        .leftJoinAndSelect('producto.entradas', 'entrada')
        .where('DATE(entrada.created_at) = :fecha', { fecha: fecha }) // Filtra por fecha
        .orderBy('entrada.created_at', 'DESC') // Ordena por fecha de creación descendente
        .take(4) // Limita el resultado a tres registros
        .getMany();
   
        const todosmisDatos={
          cantidadProductos:cantidadProductos,
          cantidadEntradas:cantidadEntradas,
          cantidadSalidas:cantidadSalidas,
          ultimosTresProductos:ultimosTresProductos,
          ultimasTresSalidas:ultimasTresSalidas,
          ultimasTresEntradas:ultimasTresEntradas
        }

    return todosmisDatos;

            
     
     
     
       }



       async findAllByadmFechaentrada(anio:number,mes:number){

   
        const startDate = new Date(anio, mes - 1, 1); // Fecha de inicio del mes
        const endDate = new Date(anio, mes, 0); // Fecha de fin del mes
        
        const productosConEntradasYSalidas = await this.productoRepository
            .createQueryBuilder('producto')
            .leftJoinAndSelect('producto.entradas', 'entrada')
            .addSelect('producto.idproducto')
            .addSelect('producto.nombre')
            .addSelect('SUM(entrada.cantidad)', 'cantidadTotal')
            .addSelect('SUM(entrada.precioentrada)', 'precioTotal')
            .where("entrada.created_at BETWEEN :startDate AND :endDate", { startDate, endDate })
            .groupBy('producto.idproducto,entrada.identrada')
            .getRawMany();
        
        
            return productosConEntradasYSalidas;
        
        
        
        
          }

          
    
 


      
}


