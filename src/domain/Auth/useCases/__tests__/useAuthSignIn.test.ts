import {waitFor, renderHook} from 'test-utils';

import {authService} from '../../authService';
import {useAuthSignIn} from '../useAuthSignIn';

import {mockedAuthCredentials} from './mockedData/mocks';

const mockedSaveCredentials = jest.fn();
jest.mock('@services', () => {
  const originalModule = jest.requireActual('@services');

  return {
    ...originalModule,
    useAuthCredentials: () => ({
      saveCredentials: mockedSaveCredentials,
    }),
  };
});
describe('useAuthSignIn', () => {
  it('saves credentials if the sign-in successfully', async () => {
    jest
      .spyOn(authService, 'signIn')
      .mockResolvedValueOnce(mockedAuthCredentials);

    const mockedOnSucess = jest.fn();
    const {result} = renderHook(() =>
      useAuthSignIn({
        onSuccess: mockedOnSucess,
      }),
    );

    result.current.signIn({
      email: 'mariajulia@coffstack.com',
      password: 'supersecret',
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockedSaveCredentials).toHaveBeenCalledWith(mockedAuthCredentials);
    expect(mockedOnSucess).toHaveBeenCalledWith(mockedAuthCredentials);
  });
  it('calls the onError function with a message if sig-in fails', async () => {
    jest
      .spyOn(authService, 'signIn')
      .mockRejectedValue(new Error('invalid error'));

    const mockedError = jest.fn();
    const {result} = renderHook(() =>
      useAuthSignIn({
        onError: mockedError,
      }),
    );

    result.current.signIn({email: 'lucas@coffstack.com', password: '123'});

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(mockedError).toHaveBeenCalledWith('invalid error');
  });
});
