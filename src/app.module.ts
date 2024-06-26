import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';


import { ProductoController } from './producto/producto.controller';
import { ProductoModule } from './producto/producto.module';
import { ProductoService } from './producto/producto.service';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { EntradaService } from './entrada/entrada.service';
import { EntradaController } from './entrada/entrada.controller';
import { EntradaModule } from './entrada/entrada.module';
import { SalidaModule } from './salida/salida.module';
import { ReporteModule } from './reporte/reporte.module';
import { ProformaService } from './proforma/proforma.service';
import { ProformaController } from './proforma/proforma.controller';
import { ProformaModule } from './proforma/proforma.module';

@Module({
  imports: [

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'upload'), // Ruta de tu carpeta de imágenes
      serveRoot: '/upload', // Ruta en la que se servirán los archivos
    }),
   


    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'inventario',
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      autoLoadEntities:true,
      synchronize: true,
      //logging:true,
    }),
   
    ProductoModule,
   
    UserModule,
   
    EntradaModule,
   
    SalidaModule,
   
    ReporteModule,
   
    ProformaModule,
    

   


  ],
  controllers: [AppController, ProductoController, UserController, EntradaController, ProformaController],
  providers: [AppService],

})
export class AppModule {}
