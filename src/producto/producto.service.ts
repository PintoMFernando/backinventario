import { Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/createProducto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from 'src/entities/producto.entity';
import { Repository, UpdateResult } from 'typeorm';
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
    
    console.log("ENTRA MI ID",idproducto )
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


 


      
}
