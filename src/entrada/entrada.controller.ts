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
 
    @Patch('/:identrada')
     update(@Param('identrada') identrada: string, @Body() updateentradaDto: UpdateEntradaDto) {
      console.log("entra a patch",identrada);
          return this.entradaService.update(identrada, updateentradaDto);
      }
 
 
      @Delete('/:identrada')
      remove(@Param('identrada') identrada: string){
        // console.log("aqui esta",idobservaciones);
         return this.entradaService.remove(identrada);
      }  
 





}
