import {setupServer} from 'msw/node';

import {postCommentHandlers} from './postComment/postCommentHandlers';

export const server = setupServer(...postCommentHandlers);
