import { Module } from '@nestjs/common';
import { SalidaController } from './salida.controller';
import { SalidaService } from './salida.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Salida } from 'src/entities/salida.entity';
import { Producto } from 'src/entities/producto.entity';
import { ProductoService } from 'src/producto/producto.service';
import { Proforma } from 'src/entities/proforma.entity';
import { ProformaService } from 'src/proforma/proforma.service';

@Module({
  controllers: [SalidaController],
  providers: [SalidaService,ProductoService,ProformaService],
  imports:[TypeOrmModule.forFeature([Salida,Producto,Proforma])],
  exports:[SalidaService]
})
export class SalidaModule {}
