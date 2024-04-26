import { Module } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from 'src/entities/producto.entity';
import { ProductoController } from './producto.controller';

@Module({
  imports:[TypeOrmModule.forFeature([Producto])],
  controllers:[ProductoController],
  providers: [ProductoService],
  exports:[ProductoService]
})
export class ProductoModule {}
