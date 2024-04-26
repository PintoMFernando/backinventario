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
    

   


  ],
  controllers: [AppController, ProductoController, UserController],
  providers: [AppService],

})
export class AppModule {}
