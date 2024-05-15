import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDto } from './dto/createProducto.dto';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { renameFile ,fileFilter} from './archivo.helper';
import { Response } from 'express';
import * as path from 'path';

import 'multer';
import { UpdateProductoDto } from './dto/updateProducto.dto';




@Controller('producto')
export class ProductoController {

    constructor(private readonly productoService: ProductoService){}


    @Get()
    
    findAll() {
    
      return   this.productoService.findAllProducto();
   }


    @Post()
   
    @UseInterceptors(FileInterceptor('image',{
            storage: diskStorage({
            destination: './upload',
            filename: renameFile
           }),
           fileFilter: fileFilter
      
    }))


    async uploadFile(@UploadedFile() file:  Express.Multer.File, @Body() uploadDto: CreateProductoDto) {
        console.log("ENTRA  MI SERVICIOOOOOOOOOO232323", file,uploadDto)
      try {
         if (file) {
           
             uploadDto.image = file.filename;
             return await this.productoService.create(uploadDto);
         }
         else{
            return await this.productoService.create(uploadDto);
         }
     } catch (error) {
        console.log("ENTRA  MI SERVICIOOOOOOOOOO")
         console.error("Error en el controlador:", error);
         throw error;
     }
    }



    @Patch('/:idproducto')
     update(@Param('idproducto') idproducto: string, @Body() updateproductoDto: UpdateProductoDto) {
          return this.productoService.update(idproducto, updateproductoDto);
      }
 
 
      @Delete('/:idproducto')
      remove(@Param('idproducto') idproducto: string){
         console.log("aqui esta",idproducto);
         return this.productoService.remove(idproducto);
      }  



      @Get('unproducto/:idproducto')
    
      findOne(@Param('idproducto') idproducto: string,) {
      
        return   this.productoService.findOneProducto(idproducto);
     }


     @Get('/conteoproducto')
    
    findOneconteo() {
    
      return   this.productoService.findOneconteo();
   }




   @Get('reportefecha/:fechainicio/:fechafinal/:tiporeporte')
   findAllByEntrada(@Param('fechainicio') fechainicio: string,@Param('fechafinal') fechafinal: string,@Param('tiporeporte') tiporeporte: string,) {
      return   this.productoService.findAllByReporteFecha(fechainicio,fechafinal,tiporeporte);
   }







   @Get('reportefechaaniomesentrada/:anio/:mes')
   findAllByEntradamesanioentrada(@Param('anio') anio: number,@Param('mes') mes: number) {
      return   this.productoService.findAllByReporteFechaentrada(anio,mes);
   }


    @Get('reportefechaaniomesalida/:anio/:mes')
   findAllByEntradamesaniosalida(@Param('anio') anio: number,@Param('mes') mes: number) {
      return   this.productoService.findAllByReporteFechasalida(anio,mes);
   }




   @Get('reportediaentrada/:fecha')
   findAllByEntradadia(@Param('fecha') fecha: string) {
      return   this.productoService.findAllByReporteDiaentrada(fecha);
   }


    @Get('reportediasalida/:fecha')
   findAllBySalidadia(@Param('fecha') fecha: string) {
      return   this.productoService.findAllByReporteDiasalida(fecha);
   }




      



}
