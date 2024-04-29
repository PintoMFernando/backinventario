import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entrada } from 'src/entities/entrada.entity';
import { EntradaController } from './entrada.controller';
import { EntradaService } from './entrada.service';
import { ProductoController } from 'src/producto/producto.controller';
import { ProductoService } from 'src/producto/producto.service';
import { Producto } from 'src/entities/producto.entity';

@Module({
    
        imports:[TypeOrmModule.forFeature([Entrada,Producto])],
        controllers:[EntradaController],
        providers: [EntradaService,ProductoService],
        exports:[EntradaService]
      
})
export class EntradaModule {}
