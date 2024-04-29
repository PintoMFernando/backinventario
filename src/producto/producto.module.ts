import { Module } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from 'src/entities/producto.entity';
import { ProductoController } from './producto.controller';
import { EntradaController } from 'src/entrada/entrada.controller';
import { EntradaService } from 'src/entrada/entrada.service';
import { Entrada } from 'src/entities/entrada.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Producto,Entrada])],
  controllers:[ProductoController],
  providers: [ProductoService,EntradaService],
  exports:[ProductoService]
})
export class ProductoModule {}
