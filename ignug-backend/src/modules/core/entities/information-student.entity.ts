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
import { CatalogueEntity, StudentEntity } from '@core/entities';

@Entity('information_students')
export class InformationStudentEntity {
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
  updateAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
  })
  deletedAt: Date;

  @OneToOne(() => StudentEntity)
  student: StudentEntity;

  @ManyToOne(() => CatalogueEntity, { nullable: true })
  @JoinColumn({ name: 'is_executed_practice' })
  isExecutedPractice: CatalogueEntity;

  @ManyToOne(() => CatalogueEntity, { nullable: true })
  @JoinColumn({ name: 'is_executed_community' })
  isExecutedCommunity: CatalogueEntity;

  @ManyToOne(() => CatalogueEntity, { nullable: true })
  @JoinColumn({ name: 'is_disability' })
  isDisability: CatalogueEntity;

  @ManyToOne(() => CatalogueEntity, { nullable: true })
  @JoinColumn({ name: 'is_lost_Gratuity' })
  isLostGratuity: CatalogueEntity;

  @ManyToOne(() => CatalogueEntity, { nullable: true })
  @JoinColumn({ name: 'is_subject_repeat' })
  isSubjectRepeat: CatalogueEntity;

  @Column('varchar', {
    name: 'address',
    length: 1000,
    comment: 'La direccion donde reside el estudiante',
  })
  address: string;

  @Column('integer', {
    name: 'community',
    comment:
      'Las horas realizadas por parte del estudiante en integracion con la sociedad',
  })
  community: number;

  @Column('varchar', {
    name: 'contact_emergency_name',
    length: 255,
    comment:
      'Nombre del contacto de emergencia para informar sobre el estudiante',
  })
  contactEmergencyName: string;

  @Column('varchar', {
    name: 'contact_emergency_kinship',
    length: 255,
    comment:
      'Nombre del contacto de emergencia de parentescos para informar sobre el estudiante',
  })
  contactEmergencyKinship: string;

  @Column('varchar', {
    name: 'contact_emergency_phone',
    length: 255,
    comment:
      'Numeros de contacto de emergencia para informar sobre el estudiante',
  })
  contactEmergencyPhone: string;

  @Column('integer', {
    name: 'disability_percentage',
    comment: 'El porcentaje de discapicidad que tiene el estudiante ',
  })
  disabilityPercentage: number;

  @Column('integer', {
    name: 'economic_amount',
    comment: 'El monto de ayuda economica que el estudiante recibe',
  })
  economicAmount: number;

  @Column('integer', {
    name: 'educational_amount',
    comment: 'El monto de credito que el estudiante tiene',
  })
  educationalAmount: number;

  @Column('integer', {
    name: 'family_income',
    comment: 'La direccion donde reside el estudiante',
  })
  familyIncome: number;

  @Column('varchar', {
    name: 'financing_scholarship_type',
    length: 180,
    comment: 'recibi el estudiante un financiamiento si =1, no = 2',
  })
  financingScholarshipType: string;

  @Column('integer', {
    name: 'members_house_number',
    comment: 'Numero de familiares con quien vive el estudiante',
  })
  membersHouseNumber: number;

  @Column('integer', {
    name: 'practice_hours',
    comment: 'Las horas realizadas por parte del estudiante en pasantias',
  })
  practiceHours: number;

  @Column('varchar', {
    name: 'postal_code',
    length: 100,
    comment: 'Codigo postal donde el estudiante reside',
  })
  postalCode: string;

  @Column('integer', {
    name: 'scholarship_amount',
    comment: 'El monto de beca que el estudiante obtuvo',
  })
  scholarshipAmount: number;

  @Column('integer', {
    name: 'tariff_scholarship_percentage',
    comment: 'El porcentaje de beca que cubre la institutcion el estudiante ',
  })
  tariffScholarshipPercentage: number;
}
