import { Column,CreateDateColumn,Entity,  JoinTable,  OneToMany,  PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import { Entrada } from "./entrada.entity";
import { Salida } from "./salida.entity";


@Entity({ name:'producto'})
export class Producto {

   
    @Column({primary:true,type:'uuid'})
    idproducto: string;
     
   
    @Column({ nullable: true })
     nombre?:string ;
  

    @Column({ nullable: true })
    descripcion:string | null;
      
      
    @Column({default:0, type: 'numeric', precision: 18, scale: 3})
    precio:number;

    @Column()
    codigo:string;

    @Column()
    stock:number;

    @Column({ nullable: true })
    image?:string ;
 

    
    
    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;

    @OneToMany(() => Entrada, (entrada) => entrada.identradas) 
    @JoinTable()
    entradas: Entrada[];

    @OneToMany(() => Salida, (salida) => salida.idsalidas) 
    @JoinTable()
    salidas: Salida[];
   
    

}