import React from 'react';

import {server} from '@test';
import {fireEvent, renderScreen, screen} from 'test-utils';

import {PostCommentScreen} from '../../PostCommentScreen';

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('integration: PostCommentScreen', () => {
  test('When adding a comment the list is automatically updated', async () => {
    renderScreen(
      <PostCommentScreen
        navigation={{} as any}
        route={{
          name: 'PostCommentScreen',
          key: 'PostCommentScreen',
          params: {
            postId: 1,
            postAuthorId: 1,
          },
        }}
      />,
    );

    const comment = await screen.findByText(/comentário aleatório/);

    expect(comment).toBeTruthy();

    //achar o campo de input
    const inputText = screen.getByPlaceholderText(/Adicione um comentário/i);
    //digitar a mensagem
    fireEvent.changeText(inputText, 'novo comentário');
    //clicar em enviar
    fireEvent.press(screen.getByText(/enviar/i));
    //espera: lista atualiza com o novo comentario
    const newComment = await screen.findByText(/novo comentário/);

    expect(newComment).toBeTruthy();

    const comments = await screen.findAllByTestId('post-comment-id');

    expect(comments.length).toBe(2);
  });
});
