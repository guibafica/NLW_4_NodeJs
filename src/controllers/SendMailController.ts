/* eslint-disable camelcase */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import { UsersRepository } from '../repositories/UsersRepository';
import { SurveysRepository } from '../repositories/SurveysRepository';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';

import SendMailService from '../services/SendMailService';

class SendMailController {
  async execute(request: Request, response: Response) {
    const { email, survey_id } = request.body;

    const usersRepository = getCustomRepository(UsersRepository);
    const surveysRepository = getCustomRepository(SurveysRepository);
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const usersAlreadyExists = await usersRepository.findOne({ email });

    if (!usersAlreadyExists) {
      return response.status(400).json({ error: 'User dos not exists' });
    }

    const survey = await surveysRepository.findOne({ id: survey_id });

    if (!survey) {
      return response.status(400).json({ error: 'Survey dos not exists' });
    }

    const surveyUser = surveysUsersRepository.create({
      user_id: usersAlreadyExists.id,
      survey_id,
    });

    await surveysUsersRepository.save(surveyUser);

    await SendMailService.execute(email, survey.title, survey.description);

    return response.status(201).json(surveyUser);
  }
}

export { SendMailController };
