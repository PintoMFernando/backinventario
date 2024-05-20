import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proforma } from 'src/entities/proforma.entity';
import { Salida } from 'src/entities/salida.entity';
import { ProformaController } from './proforma.controller';
import { ProformaService } from './proforma.service';

@Module({
    imports:[TypeOrmModule.forFeature([Proforma])],
    controllers:[ProformaController],
    providers: [ProformaService],
    exports:[ProformaService]
})
export class ProformaModule {}
