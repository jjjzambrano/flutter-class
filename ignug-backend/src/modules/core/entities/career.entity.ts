import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CatalogueEntity, InstitutionEntity } from '@core/entities';

@Entity('careers', { schema: 'core' })
export class CareerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creacion de la carrera',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de actualizacion de la carrera',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
    comment: 'Fecha de eliminacion de la carrera',
  })
  deletedAt: Date;

  @ManyToOne(() => InstitutionEntity, {
    nullable: true,
  })
  @JoinColumn({ name: 'institution_id' })
  institution: InstitutionEntity;

  @ManyToOne(() => CatalogueEntity, {
    nullable: true,
  })
  @JoinColumn({ name: 'modality_id' })
  modality: CatalogueEntity;

  @ManyToOne(() => CatalogueEntity, {
    nullable: true,
  })
  @JoinColumn({ name: 'state_id' })
  state: CatalogueEntity;

  @ManyToOne(() => CatalogueEntity, {
    nullable: true,
  })
  @JoinColumn({ name: 'type_id' })
  type: CatalogueEntity;

  @Column('varchar', {
    name: 'acronym',
    comment: 'Acronimo de la carrera Ej. DS, MKT, GN',
  })
  acronym: string;

  @Column('varchar', {
    name: 'code',
    comment: 'Codigo de la carrera',
  })
  code: string;

  @Column('varchar', {
    comment: 'Codigo sniese de la carrera',
    name: 'code_sniese',
  })
  codeSniese: string;

  @Column('varchar', {
    name: 'degree',
    comment: 'Titulo que otorga la carrera',
  })
  degree: string;

  @Column('varchar', {
    name: 'logo',
    nullable: true,
    comment: 'Logo de la carrera',
  })
  logo: string;

  @Column('varchar', {
    name: 'name',
    comment: 'Nombre de la carrera',
  })
  name: string;

  @Column('float', {
    comment: 'Numero de resolucion de la carrera',
    name: 'resolution_number',
  })
  resolutionNumber: string;

  @Column('varchar', {
    name: 'short_name',
    comment: 'Nombre corto de la carrera',
  })
  shortName: string;
}
