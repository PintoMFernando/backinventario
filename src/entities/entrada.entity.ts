import { Column,CreateDateColumn,Entity,  JoinColumn,  ManyToOne,  OneToMany,  PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import { Producto } from "./producto.entity";


@Entity({ name:'entrada'})
export class Entrada {

   
    @Column({primary:true,type:'uuid'})
    identrada: string;
     
   
    @Column({ nullable: true })
     cantidad?:number ;

     @Column(({ nullable: false }))
    idproducto?:string;
  

    
     
    
    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;
   
    @ManyToOne( () => Producto, (producto) => producto.entradas)
    @JoinColumn({ name: 'idproducto' }) 
    identradas: Producto[];
    

}