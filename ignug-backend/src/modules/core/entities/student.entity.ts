import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '@auth/entities';
import { InformationStudentEntity } from '@core/entities';

@Entity('students', { schema: 'core' })
export class StudentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // @OneToOne(() => InformationStudentEntity)
  // @JoinColumn({ name: 'student' })
  // student: InformationStudentEntity;

  @Column('varchar', { name: 'name', comment: 'Nombre del estudiante' })
  name: string;

  @OneToOne(() => UserEntity, (user) => user.student)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
