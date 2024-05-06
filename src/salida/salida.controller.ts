import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { SalidaService } from './salida.service';
import { CreateSalidaDto } from './dto/createSalida.dto';

@Controller('salida')
export class SalidaController {

    
    constructor(private readonly salidaService: SalidaService){}


    @Get('/:idsalida')
    findAllByEntrada(@Param('idsalida') idsalida: string) {
       return   this.salidaService.findAllBySalida(idsalida);
    }

    @Get()
    
    findAll() {
    
      return   this.salidaService.findAllSalida();
   }

 
    @Post()
     create( @Body() salidaDto: CreateSalidaDto) {
        // console.log("entra a post");
         return this.salidaService.create( salidaDto); 
     }
 
    @Patch('/:idsalida/:nuevacantidad')
     update(@Param('idsalida') idsalida: string,@Param('nuevacantidad') nuevacantidad:number, @Body() updatesalidaDto: CreateSalidaDto) {
      console.log("entra a patch",idsalida);
          return this.salidaService.update(idsalida, updatesalidaDto,nuevacantidad);
      }
 
 
      @Delete('/:idsalida/:idproducto/:cantidad')
      remove(@Param('idsalida') idsalida: string,@Param('idproducto') idproducto: string,@Param('cantidad') cantidad: number){
        // console.log("aqui esta",idobservaciones);
         return this.salidaService.remove(idsalida,idproducto,cantidad);
      }  
 












}
