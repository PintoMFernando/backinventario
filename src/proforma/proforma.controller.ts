import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProformaService } from './proforma.service';
import { CreateProformaDto } from './dto/createProforma.dto';
import { UpdateProformaDto } from './dto/updateProforma.dto';

@Controller('proforma')
export class ProformaController {

    constructor(private readonly proformaService: ProformaService){}


   /* @Get('/:idproforma')
    findOneProforma(@Param('idproforma') idproforma: string) {
       return   this.proformaService.findOneProforma(idproforma);
    }
*/

@Get()
    
    findAll() {
    
      return   this.proformaService.findAllProducto();
   }
  
 
    @Post()
     create( @Body() preoformaDto: CreateProformaDto) {
         console.log("entra a post",preoformaDto);
         return this.proformaService.create( preoformaDto); 
     }
 
  /*  @Patch('/:identrada/:nuevacantidad')
     update(@Param('identrada') identrada: string,@Param('nuevacantidad') nuevacantidad:number, @Body() updateentradaDto: UpdateProformaDto) {
      console.log("entra a patch",identrada);
          return this.proformaService.update(identrada, updateentradaDto,nuevacantidad);
      }
 */
 
  /*    @Delete('/:identrada/:idproducto/:cantidad')
      remove(@Param('identrada') identrada: string,@Param('idproducto') idproducto: string,@Param('cantidad') cantidad: number){
        // console.log("aqui esta",idobservaciones);
         return this.proformaService.remove(identrada,idproducto,cantidad);
      }  
*/




}
