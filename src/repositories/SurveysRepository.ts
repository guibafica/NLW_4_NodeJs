/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */
import { EntityRepository, Repository } from 'typeorm';

import { Survey } from '../models/Survey';

@EntityRepository(Survey)
class SurveysRepository extends Repository<Survey> {}

export { SurveysRepository };
