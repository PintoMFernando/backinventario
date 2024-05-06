import { Module } from '@nestjs/common';
import { SalidaController } from './salida.controller';
import { SalidaService } from './salida.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Salida } from 'src/entities/salida.entity';
import { Producto } from 'src/entities/producto.entity';
import { ProductoService } from 'src/producto/producto.service';

@Module({
  controllers: [SalidaController],
  providers: [SalidaService,ProductoService],
  imports:[TypeOrmModule.forFeature([Salida,Producto])],
  exports:[SalidaService]
})
export class SalidaModule {}
