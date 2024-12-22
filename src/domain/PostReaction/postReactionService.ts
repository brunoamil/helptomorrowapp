import { Page } from "@types";
import { PostReaction, PostReactionBase, PostReactionType } from "./postReactionsType";
import { postReactionApi } from "./postReactionApi";
import { apiAdapter } from "@api";
import { postReactionAdapter } from "./postReactionAdapter";

const PER_PAGE = 10;
async function getMyReactions(reactionType: PostReactionType, page: number): Promise<Page<PostReaction>>{
    const postReactionsApiPage = await postReactionApi.getMyReact({
        page,
        per_page: PER_PAGE,
        reaction_type: reactionType
    });

    return apiAdapter.toPageModel(postReactionsApiPage, postReactionAdapter.toPostReaction)
}

async function reactToPost(postId: number, reactionType: PostReactionType): Promise<PostReactionBase> {
    const postReactionBaseAPI = await postReactionApi.createOrUpdateReaction(postId, reactionType);
    return postReactionAdapter.toPostReactionBase(postReactionBaseAPI)
}

function hasReactedToPost(postReactions: Pick<PostReaction, 'emojiType'>[], postReactionType: PostReactionType): boolean{
    return postReactions.some(reaction => reaction.emojiType === postReactionType)
}

export const postReactionService  = {
    getMyReactions,
    reactToPost,
    hasReactedToPost
}