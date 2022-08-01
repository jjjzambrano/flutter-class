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
import { CatalogueEntity } from '@core/entities';

@Entity('information_teachers', { schema: 'core' })
export class InformationTeacherEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
  })
  deletedAt: Date;

  @ManyToOne(() => CatalogueEntity, { nullable: true })
  @JoinColumn({ name: 'country_higher_education_id' })
  countryHigherEducation: CatalogueEntity;

  @ManyToOne(() => CatalogueEntity, { nullable: true })
  @JoinColumn({ name: 'dedication_time_id' })
  dedicationTime: CatalogueEntity;

  @ManyToOne(() => CatalogueEntity, { nullable: true })
  @JoinColumn({ name: 'financing_type_id' })
  financingType: CatalogueEntity;

  @ManyToOne(() => CatalogueEntity, { nullable: true })
  @JoinColumn({ name: 'higher_education_id' })
  higherEducation: CatalogueEntity;

  @ManyToOne(() => CatalogueEntity, { nullable: true })
  @JoinColumn({ name: 'scholarship_id' })
  scholarship: CatalogueEntity;

  @ManyToOne(() => CatalogueEntity, { nullable: true })
  @JoinColumn({ name: 'scholarship_type_id' })
  scholarshipType: CatalogueEntity;

  @ManyToOne(() => CatalogueEntity, { nullable: true })
  @JoinColumn({ name: 'teaching_ladder_id' })
  teachingLadder: CatalogueEntity;

  @ManyToOne(() => CatalogueEntity, { nullable: true })
  @JoinColumn({ name: 'username_id' })
  username: CatalogueEntity;

  @Column('varchar', {
    name: 'academic_unit',
    length: 255,
    comment: 'Nombre de la unidad academica',
  })
  academicUnit: string;

  @Column('float', {
    name: 'administrative_hours',
    unsigned: true,
    comment: 'Horas dedicadas a la administracion al mes',
  })
  administrativeHours: number;

  @Column('float', {
    name: 'class_hours',
    unsigned: true,
    comment: 'Total de horas de clase dadas',
  })
  classHours: number;

  @Column('float', {
    name: 'community_hours',
    unsigned: true,
    comment: 'Horas dedicadas a labores comunitarios',
  })
  communityHours: number;

  @Column('varchar', {
    name: 'degree_higher_education',
    length: 255,
    comment: 'Que grado de educación superior tiene el usuario',
  })
  degreeHigherEducation: string;

  @Column('float', {
    name: 'hours_worked',
    unsigned: true,
    comment: 'Total de las horas trabajadas al mes',
  })
  hoursWorked: number;

  @Column('date', {
    nullable: true,
    name: 'holidays',
    comment: 'Fecha de los dias festivos.',
  })
  holidays: Date;

  @Column('date', {
    nullable: true,
    name: 'home_vacation',
    comment: 'Fecha para las vacacines',
  })
  homeVacation: Date;

  @Column('varchar', {
    name: 'institution_higher_education',
    length: 255,
    comment: 'Nombre de la institución de educación superior',
  })
  institutionHigherEducation: string;

  @Column('float', {
    name: 'investigation_hours',
    unsigned: true,
    comment: 'Horas de investigacion al mes',
  })
  investigationHours: number;

  @Column('varchar', {
    name: 'other_hours',
    length: 255,
    comment: 'Horas dedicadas a otras actividades',
  })
  otherHours: string;

  @Column('float', {
    name: 'publications',
    unsigned: true,
    comment: 'Revisar publicacion',
  })
  publications: number;

  @Column('float', {
    name: 'scholarship_amount',
    unsigned: true,
    comment: 'Precio de la beca a pagar',
  })
  scholarshipAmount: number;

  @Column('float', {
    name: 'total_subjects',
    unsigned: true,
    comment: 'Total de personas en la academia',
  })
  totalSubjects: number;

  @Column('varchar', {
    name: 'technical',
    length: 255,
    comment: 'nombre de la tecnica a usar',
  })
  technical: string;

  @Column('varchar', {
    name: 'technology',
    length: 255,
    comment: 'nombres de las salas de tecnologia',
  })
  technology: string;

  @Column('float', {
    name: 'total_publications',
    unsigned: true,
    comment: 'Total de las publicaciones realizadas sata el momento',
  })
  totalPublications: number;
}
