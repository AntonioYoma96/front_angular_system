import { Colaborador } from 'src/app/models/colaborador';

interface UserCredentials {
  access: string;
  refresh: string;
  user_email: string;
  colaborador: Colaborador;
}

export { UserCredentials };
