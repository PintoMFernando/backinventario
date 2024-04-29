import { Column,Entity,  PrimaryGeneratedColumn} from "typeorm";


@Entity({ name:'user'})
export class User {

   
    @PrimaryGeneratedColumn()
    iduser: number;
  
    @Column({ unique: true })
    username: string;
  
    @Column()
    password: string;
  
    @Column({ unique: true })
    email: string;

    @Column({nullable:true})
    tipo: number;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @Column({length:100, nullable:true})
    authkey:string;

    

}