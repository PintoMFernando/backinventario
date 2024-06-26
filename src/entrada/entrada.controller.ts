import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { EntradaService } from './entrada.service';
import { CreateEntradaDto } from './dto/createEntrada.dto';
import { UpdateEntradaDto } from './dto/updateEntrada.dto';

@Controller('entrada')
export class EntradaController {

    constructor(private readonly entradaService: EntradaService){}


    @Get('/:identrada')
    findAllByEntrada(@Param('idcentralizadormes') idcentralizadormes: string) {
       return   this.entradaService.findAllByEntrada(idcentralizadormes);
    }

    @Get()
    
    findAll() {
    
      return   this.entradaService.findAllEntrada();
   }

 
    @Post()
     create( @Body() entradaDto: CreateEntradaDto) {
        // console.log("entra a post");
         return this.entradaService.create( entradaDto); 
     }
 
    @Patch('/:identrada/:nuevacantidad')
     update(@Param('identrada') identrada: string,@Param('nuevacantidad') nuevacantidad:number, @Body() updateentradaDto: UpdateEntradaDto) {
      console.log("entra a patch",identrada);
          return this.entradaService.update(identrada, updateentradaDto,nuevacantidad);
      }
 
 
      @Delete('/:identrada/:idproducto/:cantidad')
      remove(@Param('identrada') identrada: string,@Param('idproducto') idproducto: string,@Param('cantidad') cantidad: number){
        // console.log("aqui esta",idobservaciones);
         return this.entradaService.remove(identrada,idproducto,cantidad);
      }  
 





}
