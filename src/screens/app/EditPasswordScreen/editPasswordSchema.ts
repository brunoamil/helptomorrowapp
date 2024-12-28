import {schemaTypes} from '@form';
import {z} from 'zod';

export const editPasswordSchema = z
  .object({
    currentPassword: z.string(),
    newPassword: schemaTypes.password,
    confirmPassword: schemaTypes.password,
  })
  .refine(data => data.confirmPassword === data.newPassword, {
    message: 'As senhas não são iguais',
    path: ['confirmPassword'],
  });

export type EditPasswordSchema = z.infer<typeof editPasswordSchema>;
