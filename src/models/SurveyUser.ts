/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import {
  Entity, PrimaryColumn, Column, CreateDateColumn, ManyToOne, JoinColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { User } from './User';
import { Survey } from './Survey';

@Entity('surveys_users')
class SurveyUser {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  survey_id: string;

  @ManyToOne(() => Survey)
  @JoinColumn({ name: 'survey_id' })
  survey: Survey;

  @Column()
  value: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { SurveyUser };
