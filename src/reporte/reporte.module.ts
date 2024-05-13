import { Module } from '@nestjs/common';
import { ReporteController } from './reporte.controller';
import { ReporteService } from './reporte.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ReporteController],
  providers: [ReporteService],
  //imports:[TypeOrmModule.forFeature([Reporte])],
})
export class ReporteModule {}
