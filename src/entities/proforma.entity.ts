import { Column,CreateDateColumn,DeleteDateColumn,Entity,  JoinColumn,  ManyToOne,  OneToMany,  OneToOne,  PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import { Producto } from "./producto.entity";
import { Salida } from "./salida.entity";


@Entity({ name:'proforma'})
export class Proforma {

   
    @Column({primary:true,type:'uuid'})
    idproforma: string;
     
   
    @Column({ nullable: true })
    nombre?:string ;

    @Column({ nullable: true })
    ci?:string ;

    @Column({ nullable: true })
    telefono?:number ;

    @Column({ nullable: true })
    estado?: number;

    @Column({ nullable: true })
    tipo?: number;


    @Column(({ nullable: false }))
    idsalida?:string;
  

    @DeleteDateColumn()
    deleteproforma:Date;
   
     
    
    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;
   
    @OneToOne( () => Salida, (salida) => salida.proformas, { cascade: true })
    @JoinColumn({ name: 'idsalida' }) 
    salidas: Salida;
    

}