import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CareerEntity, CatalogueEntity } from '@core/entities';

@Entity('curricula', { schema: 'core' })
export class CurriculumEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    name: 'ended_At',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creacion de la carrera',
  })
  endedAt: Date;

  @CreateDateColumn({
    name: 'started_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creacion de la carrera',
  })
  startedAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAT: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
  })
  deletedAT: Date;

  @ManyToOne(() => CareerEntity, { nullable: false })
  career: CareerEntity;

  @ManyToOne(() => CatalogueEntity, { nullable: false })
  state: CatalogueEntity;

  @Column('varchar', {
    name: 'code',
    length: 255,
    default: 'SN',
    comment: 'Nombre del producto',
  })
  code: string;

  @Column('varchar', {
    name: 'name',
    length: 255,
    default: 'SN',
    comment: 'Nombre del producto',
  })
  name: string;

  @Column('varchar', {
    name: 'description',
    length: 255,
    default: 'SN',
    comment: 'Nombre del producto',
  })
  description: string;

  @Column('varchar', {
    name: 'resolution_Number',
    length: 255,
    default: 'SN',
    comment: 'Numero de resolucion',
  })
  resolutionNumber: string;

  @Column('float', {
    name: 'periodic_Academic_Number',
    comment: 'numero de periodo academmico',
  })
  periodicAcademicNumber: number;

  @Column('float', {
    name: 'weeks_Number',
    comment: 'Numeros de semanas',
  })
  weeksNumber: number;
}
