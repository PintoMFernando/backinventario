import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReporteService } from './reporte.service';

@Controller('reporte')
export class ReporteController {

    constructor(private readonly reporteService: ReporteService){}


    @Get('/:fechainicio/:fechafinal')
    findAllByEntrada(@Param('fechainicio') fechainicio: string,@Param('fechafinal') fechafinal: string,) {
       return   this.reporteService.findAllByReporteFecha(fechainicio,fechafinal);
    }

   
 
    



}
