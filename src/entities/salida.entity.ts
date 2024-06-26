import { Column,CreateDateColumn,DeleteDateColumn,Entity,  JoinColumn,  ManyToOne,  OneToMany,  OneToOne,  PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import { Producto } from "./producto.entity";
import { Proforma } from "./proforma.entity";


@Entity({ name:'salida'})
export class Salida {

   
    @Column({primary:true,type:'uuid'})
    idsalida: string;
     
   
    @Column({ nullable: true })
    cantidad?:number ;

    @Column({ nullable: true })
    preciosalida?:number ;

    @Column({ nullable: true })
    preciototal?:number ;

    @Column({ nullable: true })
    descuento?:number ;


    @Column(({ nullable: false }))
    idproducto?:string;

    @Column(({ nullable: true }))
    proforma?:number ;

  

    @DeleteDateColumn()
    deletesalida:Date;
   
     
    
    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;
   
    @ManyToOne( () => Producto, (producto) => producto.salidas)
    @JoinColumn({ name: 'idproducto' }) 
    idsalidas: Producto[];
    

    @OneToOne( () => Proforma, (proforma) => proforma.salidas)
    
    proformas: Proforma;
    
    
}