import { Global, Module } from '@nestjs/common';
import {
  CareersController,
  CataloguesController,
  CurriculaController,
  InformationStudentsController,
  InstitutionsController,
  StudentsController,
  SubjectsController,
  InformationTeachersController,
} from '@core/controllers';
import {
  CareersService,
  CataloguesService,
  CurriculaService,
  InformationStudentsService,
  InstitutionsService,
  StudentsService,
  SubjectsService,
  InformationTeachersService,
} from '@core/services';
import { DatabaseModule } from '@database';
import { coreProviders } from '@core/providers';

@Global()
@Module({
  imports: [DatabaseModule],
  controllers: [
    CareersController,
    CataloguesController,
    CurriculaController,
    InformationStudentsController,
    InformationTeachersController,
    InstitutionsController,
    StudentsController,
    SubjectsController,
  ],
  providers: [
    ...coreProviders,
    CareersService,
    CataloguesService,
    CurriculaService,
    InformationStudentsService,
    InformationTeachersService,
    InstitutionsService,
    StudentsService,
    SubjectsService,
  ],
  exports: [
    ...coreProviders,
    CareersService,
    CataloguesService,
    CurriculaService,
    InformationStudentsService,
    InformationTeachersService,
    InstitutionsService,
    StudentsService,
    SubjectsService,
  ],
})
export class CoreModule {}
