import {stringUtils} from '@utils';
import {z} from 'zod';

const userNameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/gim;

const username = z
  .string()
  .min(4, 'username muito curto.')
  .regex(userNameRegex, 'Username inválido')
  .toLowerCase();

const name = z
  .string()
  .min(5, 'nome muito curto')
  .max(50, 'nome muito longo')
  .transform(stringUtils.capitalizeFirstLetter);

const email = z.string().email('e-mail inválido');

const password = z.string().min(4, 'senha deve ter no minimo 8 caracteres');
export const schemaTypes = {
  username,
  name,
  email,
  password,
};
