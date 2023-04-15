import posTypes from '../types/PostTypes';
const initialState={
    posts:[],
    userPosts:[]
}
 const postReducer=(state=initialState,action)=>{
    switch (action.type) {
        case posTypes.GET_ALL:
        return {
            ...state,
            posts:action.payload,
        }
        case posTypes.USER_POSTS:
            return {
                ...state,
                userPosts:action.payload,
            }
            case posTypes.ADD_POST:
                return {
                    ...state,
                    posts:[action.payload,...state.posts],
                }
        case posTypes.REMOVE_POST:
                const updatePosts=state.posts.filter((post)=>post._id!==action.payload._id);
                const updateUserPosts=state.userPosts.filter((post)=>
               {
                if(post.postedBy._id!==action.userId){
                    return post._id!==action.payload._id
                }
               }
                )
                return {
                    ...state,
                    posts:updatePosts,
                    userPosts:updateUserPosts,
                }
        case posTypes.LIKE_UNLIKE_POST:
            const updatedPosts=state.posts.filter((post)=>
            {
                if(post._id===action.payload._id){
                    post.likes=action.payload.likes;
                    return state.posts;
                }
                return state.posts;
            }
            )
            const newUserupdatedPosts=state.userPosts.filter((post)=>
            {
                    post.likes=action.payload.likes;
                    return state.userPosts;
            })
            return {
                ...state,
                posts:updatedPosts,
                userPosts:newUserupdatedPosts,
            }
            case posTypes.ADD_DELETE_COMMENT:
                const afterUpdateCommentPosts=state.posts.filter((post)=>
                {
                    if(post._id===action.payload._id){
                        post.comments=action.payload.comments;
                        return state.posts;
                    }
                    return state.posts;
                }
                )
                const afterUpdateUserCommentPosts=state.userPosts.filter((post)=>
                {
                        post.comments=action.payload.comments;
                        return state.userPosts;
                }
                )
                return {
                    ...state,
                    posts:afterUpdateCommentPosts,
                    userPosts:afterUpdateUserCommentPosts,
                }
            default:
                return state;
        }
}
export default postReducer;