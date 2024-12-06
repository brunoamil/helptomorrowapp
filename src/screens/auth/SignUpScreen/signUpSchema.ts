import {stringUtils} from '@utils';
import {z} from 'zod';

const userNameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/gim;

export const signUpSchema = z.object({
  username: z
    .string()
    .min(4, 'username muito curto.')
    .regex(userNameRegex, 'Username inválido')
    .toLowerCase(),
  firstName: z
    .string()
    .min(5, 'nome muito curto')
    .max(50, 'nome muito longo')
    .transform(stringUtils.capitalizeFirstLetter),
  lastName: z
    .string()
    .min(5, 'nome muito curto')
    .max(50, 'nome muito longo')
    .transform(stringUtils.capitalizeFirstLetter),
  email: z.string().email('e-mail inválido'),
  password: z.string().min(4, 'senha deve ter no minimo 8 caracteres'),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
