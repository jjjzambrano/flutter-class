import { CatalogueEntity } from '@core/entities';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('institutions', { schema: 'core' })
export class InstitutionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamptz',
  })
  createAt: Date;

  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamptz',
  })
  updateAt: Date;

  @DeleteDateColumn({
    name: 'delete_at',
    type: 'timestamptz',
  })
  deleteAt: Date;

  @OneToOne(() => CatalogueEntity)
  @JoinColumn({ name: 'address_id' })
  address: CatalogueEntity;

  @ManyToOne(() => CatalogueEntity)
  @JoinColumn({ name: 'state_id' })
  state: CatalogueEntity;

  @Column('varchar', {
    name: 'acronym',
    length: 50,
    default: 'none',
    nullable: false,
    unique: false,
    comment: 'abreviatura del nombre del instituto',
  })
  acronym: string;

  @Column('varchar', {
    name: 'cellphone',
    nullable: true,
    length: 50,
    comment: 'teléfono móvil directo de contacto con el instituto',
  })
  cellphone: string;

  @Column('varchar', {
    name: 'code',
    length: 50,
    comment: 'código único para identificar al instituto',
  })
  code: string;

  @Column('varchar', {
    name: 'code_sniese',
    length: 50,
    comment: 'code_sniese designado al instituto',
  })
  codeSniese: string;

  @Column('varchar', {
    name: 'denomination',
    length: 255,
    comment: 'denomination para referirse al instituto',
  })
  denomination: string;

  @Column('varchar', {
    name: 'email',
    nullable: true,
    comment: 'email para contactar al instituto',
  })
  email: string;

  @Column('varchar', {
    name: 'logo',
    nullable: true,
    comment: 'logo que identifica al instituto',
  })
  logo: string;

  @Column('varchar', {
    name: 'name',
    length: 255,
    comment: 'nombre designado para el instituto',
  })
  name: string;

  @Column('varchar', {
    name: 'phone',
    nullable: true,
    length: 20,
    comment: 'teléfono directo de contacto con el instituto',
  })
  phone: string;

  @Column('varchar', {
    name: 'short_name',
    length: 255,
    comment: 'nombre corto designado para el instituto',
  })
  shortName: string;

  @Column('varchar', {
    name: 'slogan',
    nullable: true,
    length: 1000,
    comment: 'slogan que describe al instituto',
  })
  slogan: string;

  @Column('varchar', {
    name: 'web',
    nullable: true,
    comment: 'web donde localizar al instituto',
  })
  web: string;
}
